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
const addColor_js_1 = __importStar(require("./actions/addColor.js"));
const appendPunc_js_1 = __importDefault(require("./actions/appendPunc.js"));
const getCursorRange_js_1 = __importDefault(require("./helpers/getCursorRange.js"));
const fetchTranslated = import('./actions/fetchTranslated.mjs');
const translateAll = import('./actions/translateAll.mjs');
function activate(context) {
    const appendComma = vscode_1.default.commands.registerCommand('editor.action.appendComma', () => {
        (0, appendPunc_js_1.default)(',');
    });
    const appendSemicolon = vscode_1.default.commands.registerCommand('editor.action.appendSemicolon', () => {
        (0, appendPunc_js_1.default)(';');
    });
    const tranSele = vscode_1.default.commands.registerCommand('tran.sele', () => __awaiter(this, void 0, void 0, function* () {
        const editor = vscode_1.default.window.activeTextEditor;
        if (editor !== undefined) {
            const range = (0, getCursorRange_js_1.default)(editor);
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
    const colorRed = vscode_1.default.commands.registerCommand('color.red', () => {
        (0, addColor_js_1.default)(addColor_js_1.Color.red);
    });
    const colorGreen = vscode_1.default.commands.registerCommand('color.green', () => {
        (0, addColor_js_1.default)(addColor_js_1.Color.green);
    });
    const colorBlue = vscode_1.default.commands.registerCommand('color.blue', () => {
        (0, addColor_js_1.default)(addColor_js_1.Color.blue);
    });
    const colorSlate = vscode_1.default.commands.registerCommand('color.slate', () => {
        (0, addColor_js_1.default)(addColor_js_1.Color.slate);
    });
    const colorAutoSlate = vscode_1.default.commands.registerCommand('color.auto.slate', () => {
        vscode_1.default.workspace.onDidChangeTextDocument(() => {
            vscode_1.default.commands.executeCommand('color.slate');
        });
    });
    function setAutoColor(color) {
        return vscode_1.default.commands.registerCommand(`color.auto.${color}`, () => {
            vscode_1.default.workspace.onDidChangeTextDocument(() => {
                vscode_1.default.commands.executeCommand(`color.${color}`);
            });
        });
    }
    context.subscriptions.push(appendComma, appendSemicolon);
    context.subscriptions.push(tranSele, tranAll);
    context.subscriptions.push(colorRed, colorGreen, colorBlue, colorSlate);
    context.subscriptions.push(colorAutoSlate);
}
module.exports = {
    activate,
};
