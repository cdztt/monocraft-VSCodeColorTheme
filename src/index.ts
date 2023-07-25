import vscode, { TextEditorCursorStyle } from 'vscode';
import addColor, { Color } from './actions/addColor';
import appendPunc from './actions/appendPunc';
import { Lang } from './actions/fetchTranslated';
import insertSpaceBehind from './actions/insertSpaceBehind';
import tranAllHandler from './handlers/tranAllHandler';
import tranSeleHandler from './handlers/tranSeleHandler';

function activate(context: vscode.ExtensionContext) {
  vscode.window.onDidChangeTextEditorSelection(() => {
    const editor = vscode.window.activeTextEditor;
    if (editor !== undefined) {
      const cursorCount = editor.selections.length;

      if (cursorCount > 1) {
        editor.options.cursorStyle = TextEditorCursorStyle.Underline;
      } else {
        editor.options.cursorStyle = TextEditorCursorStyle.Line;
      }
    }
  });

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

  const insertSpace = vscode.commands.registerCommand(
    'editor.action.insertSpaceBehind',
    () => {
      insertSpaceBehind();
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
