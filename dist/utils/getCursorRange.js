"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = __importDefault(require("vscode"));
function getCursorRange(editor) {
    const { start: { line: startLine, character: startCharacter }, end: { line: endLine, character: endCharacter }, } = editor.selection;
    const range = new vscode_1.default.Range(startLine, startCharacter, endLine, endCharacter);
    return range;
}
exports.default = getCursorRange;
