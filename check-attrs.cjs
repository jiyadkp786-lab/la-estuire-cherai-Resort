const fs = require('fs');
const src = fs.readFileSync('src/App.jsx', 'utf8');
const lines = src.split('\n');
let issues = 0;
lines.forEach((line, i) => {
  // Find lines where an attribute string appears to be broken
  // i.e. aria-label="..." something" or alt="..." text"
  const brokenAttr = line.match(/(aria-label|aria-description|alt)="[^"]*"\s+\w/);
  if (brokenAttr) {
    console.log('Possible broken attr at line ' + (i + 1) + ': ' + line.trim().substring(0, 120));
    issues++;
  }
});
console.log('Total issues found: ' + issues);
