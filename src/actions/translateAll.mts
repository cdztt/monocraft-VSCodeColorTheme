import { ReadStream, createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import fetchTranslated from './fetchTranslated.mjs';

let EOL = '\n';

async function* getMultiLines(readable: ReadStream, num: number) {
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

async function* transform(source: AsyncIterable<string>) {
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

async function translateAll(filePath: string) {
  try {
    if (path.extname(filePath) !== '.txt') throw '不是txt文件';

    const readable = createReadStream(filePath, {
      encoding: 'utf8',
    });
    const translatedPath = path.resolve(
      filePath,
      '../translated_' + path.basename(filePath)
    );
    const writable = createWriteStream(translatedPath);
    await pipeline(getMultiLines(readable, 10), transform, writable);
  } catch (err) {
    return JSON.stringify(err);
  }
}

export default translateAll;
