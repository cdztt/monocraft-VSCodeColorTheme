import vscode from 'vscode';
import getCurrentLine from '../helpers/getCurrentLine';
import getCursorRange from '../helpers/getCursorRange';

export enum Color {
  red = '#a52a2a',
  green = '#2e8b57',
  blue = '#4169e1',
  slate = '#2f4f4f',
}
function addColor(color: Color) {
  const decoration = vscode.window.createTextEditorDecorationType({
    color,
  });
  const editor = vscode.window.activeTextEditor;
  if (editor !== undefined) {
    let range = getCursorRange(editor);
    if (range.isEmpty) range = getCurrentLine(editor).range;
    editor.setDecorations(decoration, [range]);
  }
}

export default addColor;
