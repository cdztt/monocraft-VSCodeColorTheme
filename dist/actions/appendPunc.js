"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importDefault(require("vscode"));
function appendPunc(punctuation) {
    vscode_1.default.commands
        .executeCommand('editor.action.trimTrailingWhitespace')
        .then(() => {
        const editor = vscode_1.default.window.activeTextEditor;
        if (editor !== undefined) {
            const { line: lineIndex, character: characterIndex } = editor.selection.active;
            const textLine = editor.document.lineAt(lineIndex);
            const lastCharacterIndex = textLine.range.end.character;
            if (textLine.text.charAt(lastCharacterIndex - 1) !== punctuation) {
                editor
                    .edit((builder) => {
                    builder.insert(textLine.range.end, punctuation);
                })
                    .then(() => {
                    // 如果一开始光标就在行尾
                    if (lastCharacterIndex === characterIndex) {
                        const originalPosition = new vscode_1.default.Position(lineIndex, characterIndex);
                        editor.selection = new vscode_1.default.Selection(originalPosition, originalPosition);
                    }
                });
            }
        }
    });
}
module.exports = appendPunc;
