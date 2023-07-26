const path = require('path');
const { default: translateAll } = require('../dist/utils/translateAll');

test('translate a whole available txt file', () => {
  const filePath = path.resolve('test/test_article.txt');
  return expect(translateAll(filePath)).resolves.toBeUndefined();
}, 20000);

test('translate a file with wrong file extension', () => {
  const filePath = path.resolve('test/test_article.md');
  return expect(translateAll(filePath)).resolves.toBe('"不是txt文件"');
});

test('translate a file with wrong file path', () => {
  const filePath = path.resolve('test/notExist.txt');
  return expect(translateAll(filePath)).resolves.toMatch(/err/gi);
});
