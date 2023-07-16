const vscode = require('vscode');
const fetchTranslated = require('./fetchTranslated.js');
const translateAll = require('./translateAll.js');

function append(punctuation) {
  vscode.commands
    .executeCommand('editor.action.trimTrailingWhitespace')
    .then(() => {
      const editor = vscode.window.activeTextEditor;
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
    });
}

function activate(context) {
  const appendComma = vscode.commands.registerCommand(
    'editor.action.appendComma',
    () => {
      append(',');
    }
  );

  const appendSemicolon = vscode.commands.registerCommand(
    'editor.action.appendSemicolon',
    () => {
      append(';');
    }
  );

  const tranSele = vscode.commands.registerCommand('tran.sele', async () => {
    const editor = vscode.window.activeTextEditor;
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

    let text = editor.document.getText(range);
    const regExpHanOrPunc = /[\p{Script=Han}+\p{P}+]/gu;
    const regExpEOLs = /(\r?\n)+/g;
    text = text.replace(regExpHanOrPunc, '').replace(regExpEOLs, ' ');

    const translated = await fetchTranslated(text);
    vscode.window.showInformationMessage(translated);
  });

  const tranAll = vscode.commands.registerCommand('tran.all', () => {
    const filePath = vscode.window.activeTextEditor.document.fileName;
    translateAll(filePath).then(() => {
      vscode.window.showInformationMessage('翻译完成！');
    });
  });

  context.subscriptions.push(appendComma, appendSemicolon);
  context.subscriptions.push(tranSele);
  context.subscriptions.push(tranAll);
}

module.exports = {
  activate,
};
