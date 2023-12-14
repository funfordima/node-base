const fs = require('fs');
const protos = require('./prices_pb');
const pricesData = require('./prices.json');

const prices = new protos.Prices();

for (const priceData of pricesData) {
  const price = new protos.Price();

  price.setDate(priceData.Date);
  price.setPrice(priceData.Price);
  price.setOpen(priceData.Open);
  price.setHigh(priceData.High);
  price.setChangepercentfromlastmonth(priceData.ChangePercentFromLastMonth);
  price.setVolume(priceData.Volume);

  prices.addPrices(price);
}

const serialized = prices.serializeBinary();

fs.writeFileSync('prices', serialized);
const pricesFromFile = fs.readFileSync('prices');
const pricesDeserialized = protos.Prices.deserializeBinary(serialized);

console.log(pricesDeserialized);

for (const price of pricesDeserialized.getPricesList()) {
  console.log(price.toObject());
}
