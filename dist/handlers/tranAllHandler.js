"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importDefault(require("vscode"));
const translateAll_1 = __importDefault(require("../utils/translateAll"));
function wait(time = 1000) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
function tranAllHandler() {
    const editor = vscode_1.default.window.activeTextEditor;
    if (editor !== undefined) {
        const filePath = editor.document.fileName;
        vscode_1.default.window.withProgress({ location: vscode_1.default.ProgressLocation.Notification }, async (progress) => {
            const progressMsg = { increment: 5, message: '正在翻译...' };
            let resultText = '翻译完成！';
            let done = false;
            (0, translateAll_1.default)(filePath).then(async (err) => {
                if (err === undefined) {
                    progress.report({ ...progressMsg, increment: 100 });
                    await wait();
                    vscode_1.default.window.showInformationMessage(resultText);
                }
                else {
                    resultText = '失败！！ ' + err;
                    vscode_1.default.window.showErrorMessage(resultText);
                }
                done = true;
            });
            while (!done) {
                await wait();
                if (!done) {
                    progress.report(progressMsg);
                }
            }
        });
    }
}
exports.default = tranAllHandler;
