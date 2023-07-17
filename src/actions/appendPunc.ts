import vscode from 'vscode';

function appendPunc(punctuation: string) {
  vscode.commands
    .executeCommand('editor.action.trimTrailingWhitespace')
    .then(() => {
      const editor = vscode.window.activeTextEditor;
      if (editor !== undefined) {
        const { line: lineIndex, character: characterIndex } =
          editor.selection.active;
        const textLine = editor.document.lineAt(lineIndex);
        const lastCharacterIndex = textLine.range.end.character;

        if (textLine.text.charAt(lastCharacterIndex - 1) !== punctuation) {
          editor
            .edit((builder) => {
              builder.insert(textLine.range.end, punctuation);
            })
            .then(() => {
              // 如果一开始光标就在行尾
              if (lastCharacterIndex === characterIndex) {
                const originalPosition = new vscode.Position(
                  lineIndex,
                  characterIndex
                );
                editor.selection = new vscode.Selection(
                  originalPosition,
                  originalPosition
                );
              }
            });
        }
      }
    });
}

module.exports = appendPunc;
