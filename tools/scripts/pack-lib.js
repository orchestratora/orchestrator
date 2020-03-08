const copyfiles = require('copyfiles');
const path = require('path');

/**
 * Copies built library from `dist/libs/[name]` into `libs/[name]/dist`
 * so that lerna can publish it from sub directory.
 *
 * _NOTE:_ It must be executed from the lib directory (via `lerna exec`)
 */
async function main() {
  const cwd = process.cwd();
  const libName = path.basename(cwd);

  const parentDirs = `../../dist/libs/${libName}`;
  const source = `${parentDirs}/**/*`;
  const dest = `./dist`;
  const parentDirLevel = parentDirs.split('/').length;

  console.log(`Copying lib ${libName} from ${source} into ${dest}...`);

  copyfiles([source, dest], { up: parentDirLevel }, err => {
    if (err) {
      throw new Error(`Failed to copy lib ${libName}: ${err}`);
    }
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
