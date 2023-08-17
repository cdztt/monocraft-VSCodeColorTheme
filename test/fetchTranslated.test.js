const { default: fetchTranslated } = require('../js/utils/fetchTranslated.js');

test('third party API of translation, to Chinese', () => {
  return expect(
    fetchTranslated('hello, how are you!', 'zh-Hans')
  ).resolves.toBe('喂，你好吗！');
}, 10000);
test('third party API of translation, to English', () => {
  return expect(fetchTranslated('今天天气真好。', 'en')).resolves.toBe(
    'The weather is so nice today.'
  );
}, 10000);
