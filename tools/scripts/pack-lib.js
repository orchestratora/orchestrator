const copyfiles = require('copyfiles');
const { basename, resolve } = require('path');
const {
  promises: { rm, copyFile, stat, writeFile, readFile },
} = require('fs');
const { promisify } = require('util');

const copyfilesAsync = promisify(copyfiles);

const ROOT_DIR = resolve(__dirname, '../../');
const DIST_DIR = './dist';
const COPY_FILES = [
  { from: resolve('CHANGELOG.md'), to: resolve(DIST_DIR, 'CHANGELOG.md') },
  { from: resolve(ROOT_DIR, 'LICENSE'), to: resolve(DIST_DIR, 'LICENSE') },
];
const UPDATE_PKG_PROPS = ['version'];

/**
 * Copies built library from `dist/libs/[name]` into `libs/[name]/dist`
 * with extra files from COPY_FILES
 * so that lerna can publish it from sub directory.
 *
 * _NOTE:_ It must be executed from the lib directory (via `lerna exec`)
 */
async function main() {
  const blockingTasks = [clearDist, copyLib];
  const tasks = [copyFiles, updatePackageFile];

  await blockingTasks.reduce(async (prevPromise, task) => {
    await prevPromise;
    return task();
  }, Promise.resolve());

  await Promise.all(tasks.map((task) => task()));
}

async function clearDist(cwd = '.') {
  const dist = resolve(cwd, DIST_DIR);
  console.log(`Clearing dist directory ${dist}...`);
  try {
    await rm(dist, { recursive: true });
  } catch {}
}

async function copyLib() {
  const cwd = process.cwd();
  const libName = basename(cwd);
  const parentDirs = `../../dist/libs/${libName}`;
  const source = `${parentDirs}/**/*`;
  const dest = DIST_DIR;
  const parentDirLevel = parentDirs.split('/').length;

  console.log(`Copying lib ${libName} from ${source} into ${dest}...`);

  await copyfilesAsync([source, dest], { up: parentDirLevel });
  await clearDist(DIST_DIR);
}

async function copyFiles() {
  const files = COPY_FILES;

  console.log(
    `Copying files:
${files.map((file) => `- ${file.from} => ${file.to}`).join('\n')}`,
  );

  const promises = files.map(({ from, to }) => copyFile(from, to));

  await Promise.all(promises);
}

async function updatePackageFile() {
  const packagePath = resolve('package.json');
  const packageDistPath = resolve(DIST_DIR, 'package.json');

  console.log(`Updating package versions`);

  if (!(await isFileExists(packageDistPath))) {
    console.log(`No package.json in dist folder found! Skipping...`);
    return;
  }

  const package = JSON.parse(await readFile(packagePath, 'utf8'));
  const packageDist = JSON.parse(await readFile(packageDistPath, 'utf8'));

  UPDATE_PKG_PROPS.forEach((prop) => (packageDist[prop] = package[prop]));

  await writeFile(packageDistPath, JSON.stringify(packageDist, null, 2));
}

async function isFileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (e) {
    return false;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
