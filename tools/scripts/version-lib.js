const path = require('path');
const fs = require('fs');
const copyfiles = require('copyfiles');

const UPDATE_PKG_PROPS = ['version', 'dependencies', 'peerDependencies'];

/**
 * Update package versions and changelog
 * after lerna did it's versions updates
 *
 * _NOTE:_ It must be executed from the lib directory (via `lerna exec`)
 */
async function main() {
  await updatePackageVersions();
  await updateChangelog();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

async function updatePackageVersions() {
  const cwd = process.cwd();
  const packagePath = path.resolve(cwd, 'package.json');
  const packageDistPath = path.resolve(cwd, 'dist/package.json');

  console.log(`Updating package versions`);

  if (!isFileExists(packageDistPath)) {
    console.log(`No package.json in dist folder found! Skipping...`);
    return;
  }

  const package = require(packagePath);
  const packageDist = require(packageDistPath);

  UPDATE_PKG_PROPS.forEach(prop => (packageDist[prop] = package[prop]));

  fs.writeFileSync(packageDistPath, JSON.stringify(packageDist, null, 2));
}

async function updateChangelog() {
  const changelogPath = 'CHANGELOG.md';
  const distFolder = 'dist';

  console.log(`Updating package ${changelogPath}`);

  if (!isFileExists(changelogPath)) {
    console.log(`No CHANGELOG.md in lib folder found! Skipping...`);
    return;
  }

  copyfiles([changelogPath, distFolder], err => {
    if (err) {
      throw new Error(`Failed to copy CHANGELOG.md into dist folder: ${err}`);
    }
  });
}

function isFileExists(filePath) {
  try {
    fs.statSync(filePath);
    return true;
  } catch (e) {
    return false;
  }
}
