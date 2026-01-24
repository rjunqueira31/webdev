const dogs = require('./shelter');

dogs.forEach((dog, index) => {
  console.log(`Dog ${index + 1}:`);
  console.log(` Name: ${dog.name}`);
  console.log(` Color: ${dog.color}`);
  console.log(` Sound: ${dog.sound}`);
  console.log(` Size: ${dog.size}`);
  console.log('-------------------');
});