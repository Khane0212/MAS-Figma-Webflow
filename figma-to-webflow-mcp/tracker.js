const fs = require('fs');
const path = require('path');

// Build state per page
const getLogPath = (page) => path.join(process.cwd(), 'memory', `build_${page}.json`);

const defaultState = (page) => ({
  page,
  synced: false,
  sections: [],
  locked: false,
  updated: new Date().toISOString()
});

const read = (page) => {
  const p = getLogPath(page);
  if (!fs.existsSync(p)) return defaultState(page);
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return defaultState(page);
  }
};

const write = (page, data) => {
  const p = getLogPath(page);
  data.updated = new Date().toISOString();
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
};

// Public API
exports.status = (page) => read(page);

exports.isBuilt = (page, section) => {
  const s = read(page);
  return s.sections.some(x => x.name === section);
};

exports.record = (page, section, id = null) => {
  const s = read(page);
  if (s.sections.some(x => x.name === section)) return false;
  
  s.sections.push({
    name: section,
    element_id: id,
    at: new Date().toISOString()
  });
  write(page, s);
  return true;
};

exports.lock = (page) => {
  const s = read(page);
  s.locked = true;
  write(page, s);
};

exports.unlock = (page) => {
  const s = read(page);
  s.locked = false;
  write(page, s);
};

exports.reset = (page) => {
  write(page, defaultState(page));
};

// Update global component inventory in project.json
exports.updateInventory = (component, id) => {
  const projPath = path.join(process.cwd(), 'project.json');
  if (!fs.existsSync(projPath)) return false;
  
  try {
    const proj = JSON.parse(fs.readFileSync(projPath, 'utf8'));
    if (proj.inventory && proj.inventory[component]) {
      proj.inventory[component] = {
        id,
        built: true,
        verified: false,
        updated: new Date().toISOString()
      };
      fs.writeFileSync(projPath, JSON.stringify(proj, null, 2));
      return true;
    }
  } catch {
    return false;
  }
  return false;
};

// Mark component as verified after visual check
exports.verifyComponent = (component) => {
  const projPath = path.join(process.cwd(), 'project.json');
  if (!fs.existsSync(projPath)) return false;
  
  try {
    const proj = JSON.parse(fs.readFileSync(projPath, 'utf8'));
    if (proj.inventory && proj.inventory[component]) {
      proj.inventory[component].verified = true;
      proj.inventory[component].verifiedAt = new Date().toISOString();
      fs.writeFileSync(projPath, JSON.stringify(proj, null, 2));
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
