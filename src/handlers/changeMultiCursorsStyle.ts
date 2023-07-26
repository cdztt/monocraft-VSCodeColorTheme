import vscode, { TextEditorCursorStyle } from 'vscode';

function changeMultiCursorsStyle() {
  const editor = vscode.window.activeTextEditor;
  if (editor !== undefined) {
    const cursorCount = editor.selections.length;

    if (cursorCount > 1) {
      editor.options.cursorStyle = TextEditorCursorStyle.Underline;
    } else {
      editor.options.cursorStyle = TextEditorCursorStyle.Line;
    }
  }
}

export default changeMultiCursorsStyle;
