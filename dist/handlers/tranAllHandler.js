"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importDefault(require("vscode"));
const translateAll_1 = __importDefault(require("../actions/translateAll"));
function tranAllHandler() {
    const editor = vscode_1.default.window.activeTextEditor;
    if (editor !== undefined) {
        const filePath = editor.document.fileName;
        (0, translateAll_1.default)(filePath).then((err) => {
            if (err === undefined) {
                vscode_1.default.window.showInformationMessage('翻译完成！');
            }
            else {
                vscode_1.default.window.showErrorMessage('失败！！ ' + err);
            }
        });
    }
}
exports.default = tranAllHandler;
