import path from 'node:path';
import translateAll from '../dist/actions/translateAll.mjs';

(function test() {
  const filePath = path.resolve('test/test_article.txt');
  translateAll(path.resolve(filePath)).then((res) => {
    if (res === undefined) {
      console.log('TEST: translateAll: ', 'OK!');
    }
  });
  translateAll('').then((res) => {
    if (res !== undefined) {
      console.log('TEST: translateAll: ', 'OK!');
    }
  });
})();
