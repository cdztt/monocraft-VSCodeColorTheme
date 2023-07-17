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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importDefault(require("vscode"));
const fetchTranslated = import('./actions/fetchTranslated.mjs');
const translateAll = import('./actions/translateAll.mjs');
const appendPunc = require('./actions/appendPunc.js');
function activate(context) {
    const appendComma = vscode_1.default.commands.registerCommand('editor.action.appendComma', () => {
        appendPunc(',');
    });
    const appendSemicolon = vscode_1.default.commands.registerCommand('editor.action.appendSemicolon', () => {
        appendPunc(';');
    });
    const tranSele = vscode_1.default.commands.registerCommand('tran.sele', () => __awaiter(this, void 0, void 0, function* () {
        const editor = vscode_1.default.window.activeTextEditor;
        if (editor !== undefined) {
            const { start: { line: startLine, character: startCharacter }, end: { line: endLine, character: endCharacter }, } = editor.selection;
            const range = new vscode_1.default.Range(startLine, startCharacter, endLine, endCharacter);
            let text = editor.document.getText(range);
            const regExpHanOrPunc = /[\p{Script=Han}+\p{P}+]/gu;
            const regExpEOLs = /(\r?\n)+/g;
            text = text.replace(regExpHanOrPunc, '').replace(regExpEOLs, ' ');
            const translated = yield fetchTranslated.then((m) => m.default(text));
            vscode_1.default.window.showInformationMessage(translated);
        }
    }));
    const tranAll = vscode_1.default.commands.registerCommand('tran.all', () => {
        const editor = vscode_1.default.window.activeTextEditor;
        if (editor !== undefined) {
            const filePath = editor.document.fileName;
            translateAll
                .then((m) => m.default(filePath))
                .then((err) => {
                if (err === undefined) {
                    vscode_1.default.window.showInformationMessage('翻译完成！');
                }
                else {
                    vscode_1.default.window.showErrorMessage('失败！！ ' + err);
                }
            });
        }
    });
    context.subscriptions.push(appendComma, appendSemicolon);
    context.subscriptions.push(tranSele);
    context.subscriptions.push(tranAll);
}
module.exports = {
    activate,
};
