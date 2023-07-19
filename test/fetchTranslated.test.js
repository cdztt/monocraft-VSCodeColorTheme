const {
  default: fetchTranslated,
} = require('../dist/actions/fetchTranslated.js');

test('third party API of translation', () => {
  return expect(fetchTranslated('hello, how are you!')).resolves.toBe(
    '喂，你好吗！'
  );
}, 10000);
