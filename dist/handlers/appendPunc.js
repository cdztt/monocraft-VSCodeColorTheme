"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importDefault(require("vscode"));
async function appendPunc(punctuation) {
    const editor = vscode_1.default.window.activeTextEditor;
    if (editor !== undefined) {
        const cursors = editor.selections;
        for (const cursor of cursors) {
            const cursorPosition = cursor.active;
            const textLine = editor.document.lineAt(cursorPosition);
            const lineEndPosition = textLine.range.end;
            if (textLine.text.charAt(lineEndPosition.character - 1) !== punctuation) {
                await editor
                    .edit((builder) => {
                    builder.insert(lineEndPosition, punctuation);
                })
                    .then(() => {
                    // 如果一开始光标就在行尾
                    if (lineEndPosition.character === cursorPosition.character) {
                        vscode_1.default.commands.executeCommand('cursorLeft');
                    }
                });
            }
        }
    }
}
exports.default = appendPunc;
