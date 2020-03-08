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
  const cwd = process.cwd();

  await updatePackageVersions(cwd);
  await updateChangelog(cwd);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

async function updatePackageVersions(cwd) {
  const packagePath = path.resolve(cwd, 'package.json');
  const packageDistPath = path.resolve(cwd, 'dist/package.json');

  console.log(`Updating package versions`);

  if (!isFileExists(packageDist)) {
    console.log(`No package.json in dist folder found! Skipping...`);
    return;
  }

  const package = require(packagePath);
  const packageDist = require(packageDistPath);

  UPDATE_PKG_PROPS.forEach(prop => (packageDist[prop] = package[prop]));

  fs.writeFileSync(packageDistPath, JSON.stringify(packageDist, null, 2));
}

async function updateChangelog(cwd) {
  const changelogPath = path.resolve(cwd, 'CHANGELOG.md');
  const changelogDistFolder = 'dist';

  console.log(`Updating package CHANGELOG.md`);

  if (!isFileExists(changelogPath)) {
    console.log(`No CHANGELOG.md in lib folder found! Skipping...`);
    return;
  }

  copyfiles([changelogPath, changelogDistFolder], err => {
    if (err) {
      throw new Error(`Failed to copy CHANGELOG.md into dist folder: ${err}`);
    }
  });
}

function isFileExists(filePath) {
  try {
    fs.statSync(packageDistPath);
    return true;
  } catch (e) {
    return false;
  }
}
