const fs = require('fs');

const files = [
  ...fs.readdirSync('public').filter(f => f.endsWith('.html')).map(f => 'public/' + f),
  'src/App.jsx',
  'index.html'
];

function replaceBytes(buf, pattern, replacement) {
  const pat = Buffer.from(pattern);
  const rep = Buffer.isBuffer(replacement) ? replacement : Buffer.from(replacement, 'utf8');
  const chunks = [];
  let i = 0;
  while (i < buf.length) {
    if (i + pat.length <= buf.length) {
      let match = true;
      for (let j = 0; j < pat.length; j++) {
        if (buf[i + j] !== pat[j]) { match = false; break; }
      }
      if (match) { chunks.push(rep); i += pat.length; continue; }
    }
    chunks.push(buf.slice(i, i + 1));
    i++;
  }
  return Buffer.concat(chunks);
}

// Final remaining patterns
const finalFixes = [
  // Double-encoded right arrow → = E2 86 92
  // Double-encoded: C3 A2 E2 80 A0 = â€  (dagger) — corrupt arrow
  [[0xc3, 0xa2, 0xe2, 0x80, 0xa0], '->'],
  // Another double-encoded arrow variant: C3 A2 E2 86 92
  [[0xc3, 0xa2, 0xe2, 0x86, 0x92], '->'],

  // Emoji with ZWJ sequences (family emoji etc.) that are double-encoded
  // These contain e2 82 ac (€ sign bytes) as part of double-encoded 4-byte emoji
  // Zero-width joiner U+200D = E2 80 8D — keep as-is if valid emoji context
  // Double-encoded ZWJ: C3 A2 E2 82 AC C2 8D → strip/ignore
  [[0xc3, 0xa2, 0xe2, 0x82, 0xac, 0xc2, 0x8d], ''],

  // Double-encoded woman emoji component: C3 B0 C2 9F C2 91 C2 A9
  [[0xc3, 0xb0, 0xc2, 0x9f, 0xc2, 0x91, 0xc2, 0xa9], [0xf0, 0x9f, 0x91, 0xa9]],
  // Double-encoded man emoji: C3 B0 C2 9F C2 91 C2 A8
  [[0xc3, 0xb0, 0xc2, 0x9f, 0xc2, 0x91, 0xc2, 0xa8], [0xf0, 0x9f, 0x91, 0xa8]],
  // Double-encoded girl emoji: C3 B0 C2 9F C2 91 C2 A7
  [[0xc3, 0xb0, 0xc2, 0x9f, 0xc2, 0x91, 0xc2, 0xa7], [0xf0, 0x9f, 0x91, 0xa7]],
  // Generic remaining double-encoded 4-byte emoji: C3 B0 C2 9F ...
  [[0xc3, 0xb0, 0xc2, 0x9f], [0xf0, 0x9f]],

  // Any remaining C3 A2 E2 ... patterns (double-encoded) — replace with clean space
  // Only as last resort after specific patterns above handled
];

finalFixes.sort((a, b) => b[0].length - a[0].length);

let totalFixed = 0;
files.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let buf = fs.readFileSync(filePath);
  const orig = buf.toString('hex');
  for (const [p, r] of finalFixes) {
    buf = replaceBytes(buf, p, r);
  }
  if (buf.toString('hex') !== orig) {
    fs.writeFileSync(filePath, buf);
    console.log('Fixed: ' + filePath);
    totalFixed++;
  } else {
    console.log('Clean: ' + filePath);
  }
});
console.log('\nDone. Fixed ' + totalFixed + ' file(s).');
