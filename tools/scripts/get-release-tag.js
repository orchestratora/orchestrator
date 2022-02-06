const BRANCH_PREFIXES = ['release/', 'refs/heads/release/'];
const TAG_ALIASES = {};

/**
 * @param {string[]} args
 */
function main([releaseBranch]) {
  const releaseName = BRANCH_PREFIXES.reduce(
    (tag, prefix) => tag.replace(prefix, ''),
    releaseBranch,
  );

  const releaseTag = Object.keys(TAG_ALIASES).reduce(
    (name, alias) => name.replace(alias, TAG_ALIASES[alias]),
    releaseName,
  );

  console.log(releaseTag);
}

main(process.argv.slice(2));
