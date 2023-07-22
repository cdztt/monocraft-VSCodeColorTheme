import vscode from 'vscode';
import addColor, { Color } from './actions/addColor';
import appendPunc from './actions/appendPunc';
import { Lang } from './actions/fetchTranslated';
import tranAllHandler from './handlers/tranAllHandler';
import tranSeleHandler from './handlers/tranSeleHandler';

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

  const tranSele = vscode.commands.registerCommand(
    'tran.sele',
    tranSeleHandler.bind(null, Lang.zh)
  );

  const tranSeleToEn = vscode.commands.registerCommand(
    'tran.seleToEn',
    tranSeleHandler.bind(null, Lang.en)
  );

  const tranAll = vscode.commands.registerCommand('tran.all', tranAllHandler);

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
  context.subscriptions.push(tranSele, tranSeleToEn, tranAll);
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
