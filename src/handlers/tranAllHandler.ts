import vscode from 'vscode';
import translateAll from '../utils/translateAll';

function wait(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function tranAllHandler() {
  const editor = vscode.window.activeTextEditor;
  if (editor !== undefined) {
    const filePath = editor.document.fileName;

    vscode.window.withProgress(
      { location: vscode.ProgressLocation.Notification },
      async (progress) => {
        const progressMsg = { increment: 5, message: '正在翻译...' };
        let resultText = '翻译完成！';
        let done = false;

        translateAll(filePath).then(async (err) => {
          if (err === undefined) {
            progress.report({ ...progressMsg, increment: 100 });
            await wait();
            vscode.window.showInformationMessage(resultText);
          } else {
            resultText = '失败！！ ' + err;
            vscode.window.showErrorMessage(resultText);
          }
          done = true;
        });

        while (!done) {
          await wait();
          if (!done) {
            progress.report(progressMsg);
          }
        }
      }
    );
  }
}

export default tranAllHandler;
