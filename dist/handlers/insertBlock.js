"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importDefault(require("vscode"));
async function insertBlock() {
    const editor = vscode_1.default.window.activeTextEditor;
    if (editor !== undefined) {
        const cursorPosition = editor.selection.active;
        const lineEndPosition = editor.document.lineAt(cursorPosition).range.end;
        await editor.edit((builder) => {
            builder.insert(lineEndPosition, '{}');
        });
        await vscode_1.default.commands.executeCommand('cursorEnd');
        await vscode_1.default.commands.executeCommand('cursorLeft');
        await vscode_1.default.commands.executeCommand('lineBreakInsert');
        await vscode_1.default.commands.executeCommand('cursorDown');
    }
}
exports.default = insertBlock;
