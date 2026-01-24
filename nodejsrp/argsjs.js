console.log('Hello, argsjs!');
// to run this file with arguments, use: node argsjs.js arg1 arg2 arg3
console.log('Process arguments: ', process.argv);
const args = process.argv.slice(2);
args.forEach((val, index) => {
  console.log(`Argument ${index + 1}: ${val}`);
});