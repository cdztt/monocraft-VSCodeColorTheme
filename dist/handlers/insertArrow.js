"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importDefault(require("vscode"));
async function insertArrow() {
    const editor = vscode_1.default.window.activeTextEditor;
    if (editor !== undefined) {
        const cursorPosition = editor.selection.active;
        await editor.edit((builder) => {
            builder.insert(cursorPosition, '=>');
        });
    }
}
exports.default = insertArrow;
