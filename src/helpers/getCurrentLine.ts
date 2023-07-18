import vscode from 'vscode';

function getCurrentLine(editor: vscode.TextEditor) {
  const textLine = editor.document.lineAt(editor.selection.active.line);
  return textLine;
}

export default getCurrentLine;
