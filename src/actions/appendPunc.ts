import vscode from 'vscode';

async function appendPunc(punctuation: string) {
  const editor = vscode.window.activeTextEditor;
  if (editor !== undefined) {
    const cursors = editor.selections;

    for (const cursor of cursors) {
      const cursorPosition = cursor.active;
      const textLine = editor.document.lineAt(cursorPosition);
      const lineEndPosition = textLine.range.end;

      if (textLine.text.charAt(lineEndPosition.character - 1) !== punctuation) {
        await editor
          .edit((builder) => {
            builder.insert(lineEndPosition, punctuation);
          })
          .then(() => {
            // 如果一开始光标就在行尾
            if (lineEndPosition.character === cursorPosition.character) {
              vscode.commands.executeCommand('cursorLeft');
            }
          });
      }
    }
  }
}

export default appendPunc;
