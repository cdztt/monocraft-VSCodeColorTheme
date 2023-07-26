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
const vscode_1 = __importDefault(require("vscode"));
const fetchTranslated_1 = __importStar(require("../utils/fetchTranslated"));
const getCursorRange_1 = __importDefault(require("../utils/getCursorRange"));
async function tranSeleHandler(toLang) {
    const editor = vscode_1.default.window.activeTextEditor;
    if (editor !== undefined) {
        if (editor.selection.isEmpty) {
            await vscode_1.default.commands.executeCommand('editor.action.smartSelect.expand');
        }
        const range = (0, getCursorRange_1.default)(editor);
        let text = editor.document.getText(range);
        if (toLang === fetchTranslated_1.Lang.zh) {
            const regExpHanOrPunc = /[\p{Script=Han}+\p{P}+]/gu;
            const regExpEOLs = /(\r?\n)+/g;
            text = text.replace(regExpHanOrPunc, '').replace(regExpEOLs, ' ');
        }
        else if (toLang === fetchTranslated_1.Lang.en) {
            const regExpUseless = /\*+|\/+/g;
            text = text.replace(regExpUseless, '');
        }
        vscode_1.default.window.withProgress({ location: vscode_1.default.ProgressLocation.Notification }, async (progress) => {
            progress.report({ increment: 20, message: '正在翻译...' });
            const translated = await (0, fetchTranslated_1.default)(text, toLang);
            vscode_1.default.window.showInformationMessage(translated);
        });
    }
}
exports.default = tranSeleHandler;
