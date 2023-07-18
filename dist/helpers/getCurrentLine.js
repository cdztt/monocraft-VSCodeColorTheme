"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCurrentLine(editor) {
    const textLine = editor.document.lineAt(editor.selection.active.line);
    return textLine;
}
exports.default = getCurrentLine;
