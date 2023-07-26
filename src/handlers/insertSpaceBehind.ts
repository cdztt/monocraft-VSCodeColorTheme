import vscode from 'vscode';

async function insertSpaceBehind() {
  const editor = vscode.window.activeTextEditor;
  if (editor !== undefined) {
    const cursors = editor.selections;

    for (const cursor of cursors) {
      await editor.edit((builder) => {
        builder.insert(cursor.active, ' ');
      });
    }

    vscode.commands.executeCommand('cursorLeft');
  }
}

export default insertSpaceBehind;
