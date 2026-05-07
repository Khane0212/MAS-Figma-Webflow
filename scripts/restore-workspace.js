const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

const workspaceDir = path.join(__dirname, '../workspace');
const archivesDir = path.join(__dirname, '../archives');

async function restoreWorkspace() {
  const args = process.argv.slice(2);
  let archiveFile = args[0];

  if (!fs.existsSync(archivesDir)) {
    console.log('Archives directory does not exist.');
    return;
  }

  const files = fs.readdirSync(archivesDir).filter(f => f.endsWith('.zip'));
  
  if (files.length === 0) {
    console.log('No archives found in the archives directory.');
    return;
  }

  if (!archiveFile) {
    console.log('Available archives:');
    files.forEach((file, index) => console.log(`[${index}] ${file}`));
    console.log('\nPlease specify the archive filename or index. Example: node restore-workspace.js 0');
    return;
  }

  // Handle if user passed an index instead of filename
  if (!isNaN(parseInt(archiveFile)) && files[parseInt(archiveFile)]) {
    archiveFile = files[parseInt(archiveFile)];
  }

  const archivePath = path.join(archivesDir, archiveFile);

  if (!fs.existsSync(archivePath)) {
    console.error(`Archive not found: ${archivePath}`);
    return;
  }

  // Check if workspace is empty before restoring to avoid mixing
  if (fs.existsSync(workspaceDir)) {
    const existingFiles = fs.readdirSync(workspaceDir);
    if (existingFiles.length > 0) {
      console.warn('WARNING: The workspace directory is not empty. Please run archive-workspace.js first to avoid data mixing.');
      process.exit(1);
    }
  } else {
    fs.mkdirSync(workspaceDir, { recursive: true });
  }

  console.log(`Restoring archive: ${archiveFile}...`);

  fs.createReadStream(archivePath)
    .pipe(unzipper.Extract({ path: workspaceDir }))
    .on('close', () => {
      console.log('Workspace successfully restored!');
    })
    .on('error', (err) => {
      console.error('Error extracting archive:', err);
    });
}

restoreWorkspace();
