const fs = require('fs');
const path = require('path');

const distPath = path.join(process.cwd(), 'node_modules', 'mcp-remote', 'dist');

if (!fs.existsSync(distPath)) {
  console.log('mcp-remote dist folder not found. Skipping patch.');
  process.exit(0);
}

const files = fs.readdirSync(distPath);
const chunkFile = files.find(file => file.startsWith('chunk-') && file.endsWith('.js'));

if (!chunkFile) {
  console.log('mcp-remote chunk file not found. Patch failed.');
  process.exit(0);
}

const indexPath = path.join(distPath, 'index.js');
const exportStatement = `export * from "./${chunkFile}";\n`;

fs.writeFileSync(indexPath, exportStatement, 'utf8');
console.log(`Successfully patched mcp-remote: created index.js exporting ${chunkFile}`);
