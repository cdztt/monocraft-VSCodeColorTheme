import vscode from 'vscode';
import addColor, { Color } from './handlers/addColor';
import appendPunc from './handlers/appendPunc';
import changeMultiCursorsStyle from './handlers/changeMultiCursorsStyle';
import insertBlock from './handlers/insertBlock';
import insertSpaceBehind from './handlers/insertSpaceBehind';
import tranAllHandler from './handlers/tranAllHandler';
import tranSeleHandler from './handlers/tranSeleHandler';
import { Lang } from './utils/fetchTranslated';

function activate(context: vscode.ExtensionContext) {
  vscode.window.onDidChangeTextEditorSelection(changeMultiCursorsStyle);

  const appendComma = vscode.commands.registerCommand(
    'edit.appendComma',
    appendPunc.bind(null, ',')
  );

  const appendSemicolon = vscode.commands.registerCommand(
    'edit.insertBlock',
    insertBlock
  );

  const insertSpace = vscode.commands.registerCommand(
    'edit.insertSpaceBehind',
    insertSpaceBehind
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
  const colorAutoCoral = setAutoColor('coral');

  context.subscriptions.push(appendComma, appendSemicolon, insertSpace);
  context.subscriptions.push(tranSele, tranSeleToEn, tranAll);
  context.subscriptions.push(colorRed, colorGreen, colorBlue, colorCoral);
  context.subscriptions.push(
    colorAutoRed,
    colorAutoGreen,
    colorAutoBlue,
    colorAutoCoral
  );
}

module.exports = {
  activate,
};
