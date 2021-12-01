module.exports = {
  name: 'ui-web',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ui-web',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
