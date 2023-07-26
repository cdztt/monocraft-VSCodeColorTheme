import vscode from 'vscode';

function getCursorRange(editor: vscode.TextEditor) {
  const {
    start: { line: startLine, character: startCharacter },
    end: { line: endLine, character: endCharacter },
  } = editor.selection;
  const range = new vscode.Range(
    startLine,
    startCharacter,
    endLine,
    endCharacter
  );

  return range;
}

export default getCursorRange;
