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
const fetchTranslated_1 = __importDefault(require("../actions/fetchTranslated"));
const getCursorRange_1 = __importDefault(require("../helpers/getCursorRange"));
function tranSeleHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const editor = vscode_1.default.window.activeTextEditor;
        if (editor !== undefined) {
            const range = (0, getCursorRange_1.default)(editor);
            let text = editor.document.getText(range);
            const regExpHanOrPunc = /[\p{Script=Han}+\p{P}+]/gu;
            const regExpEOLs = /(\r?\n)+/g;
            text = text.replace(regExpHanOrPunc, '').replace(regExpEOLs, ' ');
            const translated = yield (0, fetchTranslated_1.default)(text);
            vscode_1.default.window.showInformationMessage(translated);
        }
    });
}
exports.default = tranSeleHandler;
