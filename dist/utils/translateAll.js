"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
const promises_2 = require("node:stream/promises");
const fetchTranslated_1 = __importStar(require("./fetchTranslated"));
let EOL = '\n';
/**
 * The maximum number of words used in a single request by the translation interface is about 100，
 * The target English document has about 6 words per line，
 * So the number of rows here is roughly set to 15
 */
const linesNumber = 15;
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
        const translated = await (0, fetchTranslated_1.default)(text, fetchTranslated_1.Lang.zh);
        const translatedArr = translated.split(EOL).slice(0, -1);
        yield translatedArr;
    }
}
async function* transform2(filePath, source) {
    const original = await (0, promises_1.readFile)(filePath, {
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
            if (flag > 0)
                result.push('');
            if (translatedArr.length === 0)
                break;
            while (originalArr.length > 0) {
                const originalLine = originalArr.shift();
                if (originalLine === '') {
                    if (flag > 0)
                        break;
                    continue;
                }
                result.push(originalLine);
                flag++;
            }
        }
        yield result.join(EOL) + (flag === 0 ? EOL : '');
    }
}
async function translateAll(filePath) {
    try {
        if (node_path_1.default.extname(filePath) !== '.txt')
            throw '不是txt文件';
        const fileHandle = await (0, promises_1.open)(filePath);
        const readable = fileHandle.createReadStream({
            encoding: 'utf8',
        });
        const translatedPath = node_path_1.default.resolve(filePath, '../translated_' + node_path_1.default.basename(filePath));
        const writable = (0, node_fs_1.createWriteStream)(translatedPath);
        await (0, promises_2.pipeline)(getMultiLines(readable, linesNumber), transform, transform2.bind(null, filePath), writable);
    }
    catch (err) {
        return JSON.stringify(err);
    }
}
exports.default = translateAll;
