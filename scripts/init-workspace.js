const fs = require('fs');
const path = require('path');

const workspaceDir = path.join(__dirname, '..', 'workspace');

if (!fs.existsSync(workspaceDir)) {
  fs.mkdirSync(workspaceDir, { recursive: true });
  console.log('Created workspace directory.');
}

const defaultFiles = {
  'blueprint.json': '{}',
  'content.json': '{}',
  'design-system.json': '{}',
  'error-logs.json': '[]',
  'state.json': '{}'
};

let createdCount = 0;

for (const [filename, content] of Object.entries(defaultFiles)) {
  const filePath = path.join(workspaceDir, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created ${filename} in workspace/`);
    createdCount++;
  }
}

if (createdCount === 0) {
  console.log('Workspace is already initialized. All files exist.');
} else {
  console.log(`Workspace initialization complete. Created ${createdCount} files.`);
}
