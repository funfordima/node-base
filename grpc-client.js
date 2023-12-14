const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');
const { Transform } = require('stream');

const protoFileName = './prices.proto';

const packageDefinition = protoLoader.loadSync(
  protoFileName,
  { 
    includeDirs: [__dirname],
  },
);

const proto = grpc.loadPackageDefinition(packageDefinition);
const client = new proto.bitcoinPrices.HistoryData('127.0.0.1:8001', grpc.credentials.createInsecure());

// client.get({ Date: '12/01/2021' }, (err, response) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log(`Founded currencies from server: ${JSON.stringify(response)}`);
// });

// client.list(null, (err, response) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log(`Get all currencies from server: ${JSON.stringify(response)}`);
// });

const run  = async () => {
  for await (const price of client.listStream(null)) {
    console.log('Stream price', price);
  }

  console.log('Pipeline succeeded');
};

run();
