const fs = require('fs');

/* fs.mkdir('/tmp/personal/testnodefs', {recursive: true}, (err) => {
  if (err) throw err;
}); */

const folderPath = process.argv[2] || 'testnodefs';
const htmlfileName = process.argv[3] || 'index.html';
const cssFileName = process.argv[4] || 'styles.css';
const jsFileName = process.argv[5] || 'app.js';

try {
  fs.mkdirSync(folderPath);
  fs.writeFileSync(`${folderPath}/${htmlfileName}`, '');
  fs.writeFileSync(`${folderPath}/${jsFileName}`, '');
  fs.writeFileSync(`${folderPath}/${cssFileName}`, '');
} catch (e) {
  console.log('SOMETHING WENT WRONG!!!');
  console.log(e);
}