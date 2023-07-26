import vscode from 'vscode';

async function insertBlock() {
  const editor = vscode.window.activeTextEditor;
  if (editor !== undefined) {
    const cursorPosition = editor.selection.active;
    const lineEndPosition = editor.document.lineAt(cursorPosition).range.end;
    await editor.edit((builder) => {
      builder.insert(lineEndPosition, '{}');
    });
    await vscode.commands.executeCommand('cursorEnd');
    await vscode.commands.executeCommand('cursorLeft');
    await vscode.commands.executeCommand('lineBreakInsert');
    await vscode.commands.executeCommand('cursorDown');
  }
}

export default insertBlock;
