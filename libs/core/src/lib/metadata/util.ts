export function createMetadataGetSet<M = any>(key: string) {
  const k = Symbol(key);
  return {
    set: defineMetadata.bind(null, k) as <T>(value: M, target: T) => T,
    get: (type: any): M | undefined => type[k],
  };
}

export function defineMetadata<T>(
  key: string | number | symbol,
  value: any,
  target: T,
) {
  Object.defineProperty(target, key, {
    enumerable: false,
    configurable: false,
    writable: false,
    value,
  });
  return target;
}
