const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_FILE = './service_def.proto';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const pkgDefs = protoLoader.loadSync(PROTO_FILE, options);

const dogProto = grpc.loadPackageDefinition(pkgDefs);

const server = new grpc.Server();

server.addService(dogProto.DogService.service, {
  GetDog: (input, callback) => {
    try {
      callback(null, { name: 'Spot', age: 5 });
    } catch (error) {
      callback(error, null);
    }
  },
});

server.bindAsync('127.0.0.1:5000', grpc.ServerCredentials.createInsecure(), (err, port) => {
  console.log(`Listening on port: ${port}`);
  server.start();
});
