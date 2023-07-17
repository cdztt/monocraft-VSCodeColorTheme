import vscode from 'vscode';
const fetchTranslated = import('./actions/fetchTranslated.mjs');
const translateAll = import('./actions/translateAll.mjs');
const appendPunc = require('./actions/appendPunc.js');

function activate(context: vscode.ExtensionContext) {
  const appendComma = vscode.commands.registerCommand(
    'editor.action.appendComma',
    () => {
      appendPunc(',');
    }
  );

  const appendSemicolon = vscode.commands.registerCommand(
    'editor.action.appendSemicolon',
    () => {
      appendPunc(';');
    }
  );

  const tranSele = vscode.commands.registerCommand('tran.sele', async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor !== undefined) {
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

      const translated = await fetchTranslated.then((m) => m.default(text));
      vscode.window.showInformationMessage(translated);
    }
  });

  const tranAll = vscode.commands.registerCommand('tran.all', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor !== undefined) {
      const filePath = editor.document.fileName;
      translateAll
        .then((m) => m.default(filePath))
        .then((err) => {
          if (err === undefined) {
            vscode.window.showInformationMessage('翻译完成！');
          } else {
            vscode.window.showErrorMessage('失败！！ ' + err);
          }
        });
    }
  });

  context.subscriptions.push(appendComma, appendSemicolon);
  context.subscriptions.push(tranSele);
  context.subscriptions.push(tranAll);
}

module.exports = {
  activate,
};
