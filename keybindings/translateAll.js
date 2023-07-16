const { createReadStream, createWriteStream } = require('node:fs');
const { pipeline } = require('node:stream/promises');
const path = require('node:path');
const fetchTranslated = require('./fetchTranslated.js');

let EOL = '\n';

async function* getMultiLines(readable, num) {
  let text = '';
  let currentLine = '';
  let counter = 0;
  let indexOfEOL = -1;
  let lenOfEOL = EOL.length;
  let hasGetEOL = false;

  for await (const chunk of readable) {
    currentLine += chunk;

    while ((indexOfEOL = currentLine.indexOf(EOL)) > -1) {
      if (!hasGetEOL) {
        if (currentLine[indexOfEOL - 1] === '\r') {
          EOL = '\r\n';
          lenOfEOL = EOL.length;
          indexOfEOL--;
        }
        hasGetEOL = true;
      }

      text +=
        currentLine.slice(0, indexOfEOL) &&
        currentLine.slice(0, indexOfEOL + lenOfEOL);

      currentLine = currentLine.slice(indexOfEOL + lenOfEOL);

      if (indexOfEOL > 0) {
        counter++;
        if (counter === num) {
          yield text;
          text = '';
          counter = 0;
        }
      }
    }

    if ((await readable[Symbol.asyncIterator]().next()).done) {
      text += currentLine;
      yield text.endsWith(EOL) ? text : text + EOL;
    }
  }
}

async function* transform(source) {
  for await (const text of source) {
    const translated = await fetchTranslated(text);
    const translatedArr = translated.split(EOL);
    const textArr = text.split(EOL);
    const merged = textArr.map((val, key) => {
      return val + EOL + translatedArr[key] + EOL;
    });
    const result = merged.slice(0, -1).join('');

    yield result;
  }
}

function translateAll(filePath) {
  const readable = createReadStream(filePath, {
    encoding: 'utf8',
  });
  const translatedPath = path.resolve(
    filePath,
    '../translated_' + path.basename(filePath)
  );
  const writable = createWriteStream(translatedPath);

  return pipeline(getMultiLines(readable, 10), transform, writable);
}

module.exports = translateAll;
