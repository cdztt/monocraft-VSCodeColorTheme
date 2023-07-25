"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
const vscode_1 = __importDefault(require("vscode"));
const getCursorRange_1 = __importDefault(require("../helpers/getCursorRange"));
var Color;
(function (Color) {
    Color["red"] = "#a52a2a";
    Color["green"] = "#2e8b57";
    Color["blue"] = "#4169e1";
    Color["coral"] = "#ff7f50";
})(Color || (exports.Color = Color = {}));
function addColor(color) {
    const decoration = vscode_1.default.window.createTextEditorDecorationType({
        color,
    });
    const editor = vscode_1.default.window.activeTextEditor;
    if (editor !== undefined) {
        let range = (0, getCursorRange_1.default)(editor);
        if (range.isEmpty) {
            range = editor.document.lineAt(editor.selection.active).range;
        }
        editor.setDecorations(decoration, [range]);
    }
}
exports.default = addColor;
