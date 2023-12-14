const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');
const parseArgs = require('minimist');
const path = require('path');
const lodash = require('lodash');

// const PROTO_FILE = './service_def.proto';
const PROTO_PATH = './route_guide.proto';
const COORD_FACTOR = 1e7;
let feature_list = [];

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const pkgDefs = protoLoader.loadSync(PROTO_PATH, options);

const protoDescriptor = grpc.loadPackageDefinition(pkgDefs);
const routeguide = protoDescriptor.routeguide;

// const server = new grpc.Server();

/**
 * Get a feature object at the given point, or creates one if it does not exist.
 * @param {point} point The point to check
 * @return {feature} The feature object at the point. Note that an empty name
 *     indicates no feature
 */
function checkFeature(point) {
  let feature;
  // Check if there is already a feature object for the given point
  for (let i = 0; i < feature_list.length; i++) {
    feature = feature_list[i];
    if (feature.location.latitude === point.latitude &&
        feature.location.longitude === point.longitude) {
      return feature;
    }
  }

  const name = '';

  feature = {
    name,
    location: point,
  };

  return feature;
}

/**
 * getFeature request handler. Gets a request with a point, and responds with a
 * feature object indicating whether there is a feature at that point.
 * @param {EventEmitter} call Call object for the handler to process
 * @param {function(Error, feature)} callback Response callback
 */
function getFeature(call, callback) {
  callback(null, checkFeature(call.request));
}

/**
 * listFeatures request handler. Gets a request with two points, and responds
 * with a stream of all features in the bounding box defined by those points.
 * @param {Writable} call Writable stream for responses with an additional
 *     request property for the request value.
 */
function listFeatures(call) {
  const lo = call.request.lo;
  const hi = call.request.hi;
  const left = lodash.min([lo.longitude, hi.longitude]);
  const right = lodash.max([lo.longitude, hi.longitude]);
  const top = lodash.max([lo.latitude, hi.latitude]);
  const bottom = lodash.min([lo.latitude, hi.latitude]);
  // For each feature, check if it is in the given bounding box
  console.log(feature_list);

  feature_list.forEach((feature) => {
    if (feature.name === '') {
      return;
    }
    if (feature.location.longitude >= left &&
        feature.location.longitude <= right &&
        feature.location.latitude >= bottom &&
        feature.location.latitude <= top) {
      call.write(feature);
    }
  });

  call.end();
}

/**
 * Calculate the distance between two points using the "haversine" formula.
 * The formula is based on http://mathforum.org/library/drmath/view/51879.html.
 * @param start The starting point
 * @param end The end point
 * @return The distance between the points in meters
 */
function getDistance(start, end) {
  function toRadians(num) {
    return num * Math.PI / 180;
  }

  const R = 6371000;  // earth radius in metres
  const lat1 = toRadians(start.latitude / COORD_FACTOR);
  const lat2 = toRadians(end.latitude / COORD_FACTOR);
  const lon1 = toRadians(start.longitude / COORD_FACTOR);
  const lon2 = toRadians(end.longitude / COORD_FACTOR);

  const deltalat = lat2-lat1;
  const deltalon = lon2-lon1;
  const a = Math.sin(deltalat/2) * Math.sin(deltalat/2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(deltalon/2) * Math.sin(deltalon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * recordRoute handler. Gets a stream of points, and responds with statistics
 * about the "trip": number of points, number of known features visited, total
 * distance traveled, and total time spent.
 * @param {Readable} call The request point stream.
 * @param {function(Error, routeSummary)} callback The callback to pass the
 *     response to
 */
function recordRoute(call, callback) {
  const point_count = 0;
  const feature_count = 0;
  const distance = 0;
  const previous = null;
  // Start a timer
  const start_time = process.hrtime();
  call.on('data', function(point) {
    point_count += 1;
    if (checkFeature(point).name !== '') {
      feature_count += 1;
    }
    /* For each point after the first, add the incremental distance from the
     * previous point to the total distance value */
    if (previous != null) {
      distance += getDistance(previous, point);
    }
    previous = point;
  });
  call.on('end', function() {
    callback(null, {
      point_count: point_count,
      feature_count: feature_count,
      // Cast the distance to an integer
      distance: distance|0,
      // End the timer
      elapsed_time: process.hrtime(start_time)[0]
    });
  });
}

let route_notes = {};

/**
 * Turn the point into a dictionary key.
 * @param {point} point The point to use
 * @return {string} The key for an object
 */
function pointKey(point) {
  return point.latitude + ' ' + point.longitude;
}

/**
 * routeChat handler. Receives a stream of message/location pairs, and responds
 * with a stream of all previous messages at each of those locations.
 * @param {Duplex} call The stream for incoming and outgoing messages
 */
function routeChat(call) {
  call.on('data', function(note) {
    const key = pointKey(note.location);
    /* For each note sent, respond with all previous notes that correspond to
     * the same point */
    if (route_notes.hasOwnProperty(key)) {
      route_notes[key].forEach((note) => {
        call.write(note);
      });
    } else {
      route_notes[key] = [];
    }
    // Then add the new note to the list
    route_notes[key].push(JSON.parse(JSON.stringify(note)));
  });
  call.on('end', function() {
    call.end();
  });
}

/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return {Server} The new server object
 */
function getServer() {
  const server = new grpc.Server();
  server.addService(routeguide.RouteGuide.service, {
    getFeature: getFeature,
    listFeatures: listFeatures,
    recordRoute: recordRoute,
    routeChat: routeChat
  });
  return server;
}

const routeServer = getServer();
routeServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  console.log(`Server is listening on port: ${port}`);
  const argv = parseArgs(process.argv, {
    string: 'db_path'
  });
  fs.readFile(path.resolve(argv.db_path), function(err, data) {
    if (err) throw err;
    feature_list = JSON.parse(data);
    routeServer.start();
  });
});
