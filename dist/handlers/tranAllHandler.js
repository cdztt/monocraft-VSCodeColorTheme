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
const translateAll_1 = __importDefault(require("../actions/translateAll"));
function wait(time = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
function tranAllHandler() {
    const editor = vscode_1.default.window.activeTextEditor;
    if (editor !== undefined) {
        const filePath = editor.document.fileName;
        vscode_1.default.window.withProgress({ location: vscode_1.default.ProgressLocation.Notification }, (progress) => __awaiter(this, void 0, void 0, function* () {
            const progressMsg = { increment: 5, message: '正在翻译...' };
            let resultText = '翻译完成！';
            let done = false;
            (0, translateAll_1.default)(filePath).then((err) => __awaiter(this, void 0, void 0, function* () {
                if (err === undefined) {
                    progress.report(Object.assign(Object.assign({}, progressMsg), { increment: 100 }));
                    yield wait();
                    vscode_1.default.window.showInformationMessage(resultText);
                }
                else {
                    resultText = '失败！！ ' + err;
                    vscode_1.default.window.showErrorMessage(resultText);
                }
                done = true;
            }));
            while (!done) {
                yield wait();
                if (!done) {
                    progress.report(progressMsg);
                }
            }
        }));
    }
}
exports.default = tranAllHandler;
