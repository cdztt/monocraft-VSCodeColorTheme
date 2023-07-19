import vscode from 'vscode';
import translateAll from '../actions/translateAll';

function tranAllHandler() {
  const editor = vscode.window.activeTextEditor;
  if (editor !== undefined) {
    const filePath = editor.document.fileName;
    translateAll(filePath).then((err) => {
      if (err === undefined) {
        vscode.window.showInformationMessage('翻译完成！');
      } else {
        vscode.window.showErrorMessage('失败！！ ' + err);
      }
    });
  }
}

export default tranAllHandler;
