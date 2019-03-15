module.exports = {
  name: 'composer-example',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/composer-example/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
