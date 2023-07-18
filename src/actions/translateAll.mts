import { ReadStream, createReadStream, createWriteStream } from 'node:fs';
import { readFile } from 'node:fs/promises';
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
    const translatedArr = translated.split(EOL).slice(0, -1);
    yield translatedArr;
  }
}

async function* transform2(filePath: string, source: AsyncIterable<string[]>) {
  const original = await readFile(filePath, {
    encoding: 'utf8',
  });
  const regExpLeadingEOLs = new RegExp(`^(${EOL})+`);
  const regExpTrailingEOLs = new RegExp(`(${EOL})*$`);
  const originalArr = original
    .replace(regExpLeadingEOLs, '')
    .replace(regExpTrailingEOLs, EOL)
    .split(EOL);

  let flag = 0;
  let translatedLine = '';
  for await (const translatedArr of source) {
    const result = [];

    while (true) {
      while (flag > 0 && translatedArr.length > 0) {
        translatedLine += (translatedLine && ' ') + translatedArr.shift();
        flag--;
      }
      if (flag === 0 && translatedLine !== '') {
        result.push(translatedLine);
        translatedLine = '';
      }
      if (flag > 0) result.push('');
      if (translatedArr.length === 0) break;

      while (originalArr.length > 0) {
        const originalLine = originalArr.shift();
        if (originalLine === '') {
          if (flag > 0) break;
          continue;
        }
        result.push(originalLine);
        flag++;
      }
    }

    yield result.join(EOL) + (flag === 0 ? EOL : '');
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
    await pipeline(
      getMultiLines(readable, 10),
      transform,
      transform2.bind(null, filePath),
      writable
    );
  } catch (err) {
    return JSON.stringify(err);
  }
}

export default translateAll;
