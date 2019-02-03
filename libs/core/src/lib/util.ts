/**
 * @internal
 */
export function execRegex(regex: RegExp, val: string): string[] {
  const arr = [];
  let group: RegExpExecArray;

  while ((group = regex.exec(val)) !== null) {
    if (group.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    arr.push(...group);
  }

  return !arr.length ? null : arr;
}

/**
 * @internal
 */
export function parseFunction(fnStr: string) {
  const fnRegex = /^function\s*(?:[A-z0-9]+)?\s*\(([^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)\s*\{([\w\W]*)\}$/gm;
  const arrowFnRegex = /^\(?([^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)?\s*=>\s*\{([\w\W]*)\}$/gm;
  const returnArrowFnRegex = /^\(?([^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)?\s*=>\s*([^}{]*)$/gm;

  fnStr = fnStr.trim();

  const fnInfo =
    execRegex(fnRegex, fnStr) ||
    execRegex(arrowFnRegex, fnStr) ||
    execRegex(returnArrowFnRegex, fnStr);

  if (!fnInfo || fnInfo.length < 2) {
    return null;
  }

  const _args = fnInfo.length > 2 ? fnInfo[1] || '' : '';
  const args = _args
    .split(',')
    .map(arg => arg.trim())
    .filter(arg => !!arg);

  const isReturnFunction = returnArrowFnRegex.test(fnStr);
  const _body = fnInfo[fnInfo.length - 1];

  if (!_body && isReturnFunction) {
    return null;
  }

  const body = isReturnFunction ? `return ${_body}` : _body || '';

  return { args, body };
}
