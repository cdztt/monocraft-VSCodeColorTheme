import vscode, { TextEditorCursorStyle } from 'vscode';

function changeCursorStyle() {
  const editor = vscode.window.activeTextEditor;
  if (editor !== undefined) {
    const cursorCount = editor.selections.length;

    if (cursorCount > 1) {
      editor.options.cursorStyle = TextEditorCursorStyle.BlockOutline;
    } else {
      if (editor.selection.isEmpty) {
        editor.options.cursorStyle = TextEditorCursorStyle.Line;
      } else {
        editor.options.cursorStyle = TextEditorCursorStyle.Underline;
      }
    }
  }
}

export default changeCursorStyle;
