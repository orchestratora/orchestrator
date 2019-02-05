export function stringify(val: any): string {
  return JSON.stringify(
    val,
    (_, v) => (typeof v === 'function' ? v.toString() : v),
    '    ',
  );
}

export function removeFnPad(fnStr: string): string {
  const fnLines = fnStr.split('\n');
  const linePadding = fnLines[fnLines.length - 1].match(/^(\s*)/)[1] || '';
  return fnLines.map(s => s.replace(linePadding, '')).join('\n');
}
