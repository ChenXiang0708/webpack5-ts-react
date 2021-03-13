const path = require('path');
function resolve(dir) {

  return path.join(__dirname, '..', dir);
}
module.exports = {
  '@': resolve('src'),
  // '@test': resolve('__tests__/mockjs'),
  // '@ant-design/icons/lib/dist$': resolve('src/style/icons.ts'),
  // '@api': resolve('src/api'),
  // '@utils': resolve('src/utils'),
  // '@img': resolve('src/assets/images'),
  // '@hooks': resolve('src/utils/hooks'),
  // '@components': resolve('src/components'),
  // '@style': resolve('src/style'),
  // '@redux': resolve('src/redux'),
};
