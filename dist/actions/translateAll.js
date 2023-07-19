"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
const promises_2 = require("node:stream/promises");
const fetchTranslated_js_1 = __importDefault(require("./fetchTranslated.js"));
let EOL = '\n';
function getMultiLines(readable, num) {
    return __asyncGenerator(this, arguments, function* getMultiLines_1() {
        var _a, e_1, _b, _c;
        let text = '';
        let currentLine = '';
        let counter = 0;
        let indexOfEOL = -1;
        let lenOfEOL = EOL.length;
        let hasGetEOL = false;
        try {
            for (var _d = true, readable_1 = __asyncValues(readable), readable_1_1; readable_1_1 = yield __await(readable_1.next()), _a = readable_1_1.done, !_a; _d = true) {
                _c = readable_1_1.value;
                _d = false;
                const chunk = _c;
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
                            yield yield __await(text);
                            text = '';
                            counter = 0;
                        }
                    }
                }
                if ((yield __await(readable[Symbol.asyncIterator]().next())).done) {
                    text += currentLine;
                    yield yield __await(text.endsWith(EOL) ? text : text + EOL);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = readable_1.return)) yield __await(_b.call(readable_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
function transform(source) {
    return __asyncGenerator(this, arguments, function* transform_1() {
        var _a, e_2, _b, _c;
        try {
            for (var _d = true, source_1 = __asyncValues(source), source_1_1; source_1_1 = yield __await(source_1.next()), _a = source_1_1.done, !_a; _d = true) {
                _c = source_1_1.value;
                _d = false;
                const text = _c;
                const translated = yield __await((0, fetchTranslated_js_1.default)(text));
                const translatedArr = translated.split(EOL).slice(0, -1);
                yield yield __await(translatedArr);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = source_1.return)) yield __await(_b.call(source_1));
            }
            finally { if (e_2) throw e_2.error; }
        }
    });
}
function transform2(filePath, source) {
    return __asyncGenerator(this, arguments, function* transform2_1() {
        var _a, e_3, _b, _c;
        const original = yield __await((0, promises_1.readFile)(filePath, {
            encoding: 'utf8',
        }));
        const regExpLeadingEOLs = new RegExp(`^(${EOL})+`);
        const regExpTrailingEOLs = new RegExp(`(${EOL})*$`);
        const originalArr = original
            .replace(regExpLeadingEOLs, '')
            .replace(regExpTrailingEOLs, EOL)
            .split(EOL);
        let flag = 0;
        let translatedLine = '';
        try {
            for (var _d = true, source_2 = __asyncValues(source), source_2_1; source_2_1 = yield __await(source_2.next()), _a = source_2_1.done, !_a; _d = true) {
                _c = source_2_1.value;
                _d = false;
                const translatedArr = _c;
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
                yield yield __await(result.join(EOL) + (flag === 0 ? EOL : ''));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = source_2.return)) yield __await(_b.call(source_2));
            }
            finally { if (e_3) throw e_3.error; }
        }
    });
}
function translateAll(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (node_path_1.default.extname(filePath) !== '.txt')
                throw '不是txt文件';
            const fileHandle = yield (0, promises_1.open)(filePath);
            const readable = fileHandle.createReadStream({
                encoding: 'utf8',
            });
            const translatedPath = node_path_1.default.resolve(filePath, '../translated_' + node_path_1.default.basename(filePath));
            const writable = (0, node_fs_1.createWriteStream)(translatedPath);
            yield (0, promises_2.pipeline)(getMultiLines(readable, 10), transform, transform2.bind(null, filePath), writable);
        }
        catch (err) {
            return JSON.stringify(err);
        }
    });
}
exports.default = translateAll;
