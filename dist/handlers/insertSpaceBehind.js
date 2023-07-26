"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importDefault(require("vscode"));
async function insertSpaceBehind() {
    const editor = vscode_1.default.window.activeTextEditor;
    if (editor !== undefined) {
        const cursors = editor.selections;
        for (const cursor of cursors) {
            await editor.edit((builder) => {
                builder.insert(cursor.active, ' ');
            });
        }
        vscode_1.default.commands.executeCommand('cursorLeft');
    }
}
exports.default = insertSpaceBehind;
