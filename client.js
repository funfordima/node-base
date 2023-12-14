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

const DogService = grpc.loadPackageDefinition(pkgDefs).DogService;

const client = new DogService('localhost:5000', grpc.credentials.createInsecure());

client.GetDog({}, (error, dog) => {
  if (error) {
    console.log(error);
  } else {
    console.log(dog);
  }
})
