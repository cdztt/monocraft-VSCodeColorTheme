import vscode from 'vscode';

async function insertArrow() {
  const editor = vscode.window.activeTextEditor;
  if (editor !== undefined) {
    const cursorPosition = editor.selection.active;
    await editor.edit((builder) => {
      builder.insert(cursorPosition, '=>');
    });
  }
}

export default insertArrow;
