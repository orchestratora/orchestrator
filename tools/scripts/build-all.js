const { execSync } = require('child_process');

const IGNORE_TAGS = ['e2e'];
const projects = require('../../nx.json').projects;

/**
 * Spawns a command with all buildable projects from `nx.json`
 * that do not have tags specified in {@link IGNORE_TAGS}
 *
 * ```
 *  npx nx run-many --target build --with-deps --projects [...projects]
 * ```
 */
async function main() {
  /** @type {Record<string, boolean>} */
  const ignoreMap = IGNORE_TAGS.reduce(
    (acc, tag) => ({ ...acc, [tag]: true }),
    {},
  );

  const projectsToBuild = Object.entries(projects)
    .filter(([_, p]) => p.tags && p.tags.every(tag => !ignoreMap[tag]))
    .map(([name]) => name);

  console.log(`Building projects: ${projectsToBuild.join(', ')}...`);

  execSync(
    `npx nx run-many --target build --with-deps --projects ${projectsToBuild.join(
      ',',
    )}`,
    { stdio: 'inherit' },
  );
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
