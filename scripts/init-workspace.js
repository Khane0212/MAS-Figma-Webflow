const fs = require('fs');
const path = require('path');

const workspaceDir = path.join(__dirname, '../workspace');
const args = process.argv.slice(2);

let projectName = 'New Project';
let figmaUrl = '';

// Simple arg parsing
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--project' && args[i + 1]) {
    projectName = args[i + 1];
    i++;
  } else if (args[i] === '--figma' && args[i + 1]) {
    figmaUrl = args[i + 1];
    i++;
  }
}

function initWorkspace() {
  console.log('Initializing workspace...');

  // 1. Check if workspace has existing active data
  if (fs.existsSync(workspaceDir)) {
    const files = fs.readdirSync(workspaceDir);
    // If there are files and it's not just an empty directory
    if (files.length > 0 && files.some(f => f !== '.gitkeep')) {
      const metaPath = path.join(workspaceDir, 'meta.json');
      if (fs.existsSync(metaPath)) {
         const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
         console.warn(`\n[WARNING] Active project found: "${meta.projectName}".`);
      } else {
         console.warn(`\n[WARNING] Existing files found in workspace.`);
      }
      console.warn('Please run "node scripts/archive-workspace.js" to save and clear current data before initializing a new one.');
      process.exit(1);
    }
  } else {
    fs.mkdirSync(workspaceDir, { recursive: true });
  }

  // 2. Create subdirectories for chunking
  const dirsToCreate = ['blueprints', 'contents'];
  dirsToCreate.forEach(dir => {
    const dirPath = path.join(workspaceDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
      console.log(`Created directory: workspace/${dir}/`);
    }
  });

  // 3. Create initial empty tracking files
  const initialFiles = {
    'meta.json': {
      projectName: projectName,
      figmaUrl: figmaUrl,
      initializedAt: new Date().toISOString()
    },
    'state.json': [],
    'error-logs.json': [],
    'design-system.json': {
      colors: {},
      typography: {},
      spacing: {}
    }
  };

  for (const [filename, content] of Object.entries(initialFiles)) {
    const filePath = path.join(workspaceDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`Created file: workspace/${filename}`);
  }

  console.log('\n✅ Workspace initialization complete.');
  console.log(`Project: ${projectName}`);
}

initWorkspace();
