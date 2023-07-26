import vscode from 'vscode';
import getCursorRange from '../utils/getCursorRange';

export enum Color {
  red = '#a52a2a',
  green = '#2e8b57',
  blue = '#4169e1',
  coral = '#ff7f50',
}
function addColor(color: Color) {
  const decoration = vscode.window.createTextEditorDecorationType({
    color,
  });
  const editor = vscode.window.activeTextEditor;
  if (editor !== undefined) {
    let range = getCursorRange(editor);
    if (range.isEmpty) {
      range = editor.document.lineAt(editor.selection.active).range;
    }
    editor.setDecorations(decoration, [range]);
  }
}

export default addColor;
