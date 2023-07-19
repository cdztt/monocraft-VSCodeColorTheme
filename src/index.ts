import vscode from 'vscode';
import addColor, { Color } from './actions/addColor.js';
import appendPunc from './actions/appendPunc.js';
import getCursorRange from './helpers/getCursorRange.js';
const fetchTranslated = import('./actions/fetchTranslated.mjs');
const translateAll = import('./actions/translateAll.mjs');

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
      const range = getCursorRange(editor);
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

  function setColor(color: keyof typeof Color) {
    return vscode.commands.registerCommand(`color.${color}`, () => {
      addColor(Color[color]);
    });
  }
  const colorRed = setColor('red');
  const colorGreen = setColor('green');
  const colorBlue = setColor('blue');
  const colorSlate = setColor('slate');
  const colorCoral = setColor('coral');

  function setAutoColor(color: keyof typeof Color) {
    return vscode.commands.registerCommand(`color.auto.${color}`, () => {
      vscode.workspace.onDidChangeTextDocument(() => {
        vscode.commands.executeCommand(`color.${color}`);
      });
    });
  }
  const colorAutoRed = setAutoColor('red');
  const colorAutoGreen = setAutoColor('green');
  const colorAutoBlue = setAutoColor('blue');
  const colorAutoSlate = setAutoColor('slate');
  const colorAutoCoral = setAutoColor('coral');

  context.subscriptions.push(appendComma, appendSemicolon);
  context.subscriptions.push(tranSele, tranAll);
  context.subscriptions.push(
    colorRed,
    colorGreen,
    colorBlue,
    colorSlate,
    colorCoral
  );
  context.subscriptions.push(
    colorAutoRed,
    colorAutoGreen,
    colorAutoBlue,
    colorAutoSlate,
    colorAutoCoral
  );
}

module.exports = {
  activate,
};
