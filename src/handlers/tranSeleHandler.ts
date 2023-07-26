import vscode from 'vscode';
import fetchTranslated, { Lang } from '../utils/fetchTranslated';
import getCursorRange from '../utils/getCursorRange';

async function tranSeleHandler(toLang: Lang) {
  const editor = vscode.window.activeTextEditor;
  if (editor !== undefined) {
    if (editor.selection.isEmpty) {
      await vscode.commands.executeCommand('editor.action.smartSelect.expand');
    }
    const range = getCursorRange(editor);
    let text = editor.document.getText(range);

    if (toLang === Lang.zh) {
      const regExpHanOrPunc = /[\p{Script=Han}+\p{P}+]/gu;
      const regExpEOLs = /(\r?\n)+/g;
      text = text.replace(regExpHanOrPunc, '').replace(regExpEOLs, ' ');
    } else if (toLang === Lang.en) {
      const regExpUseless = /\*+|\/+/g;
      text = text.replace(regExpUseless, '');
    }

    vscode.window.withProgress(
      { location: vscode.ProgressLocation.Notification },
      async (progress) => {
        progress.report({ increment: 20, message: '正在翻译...' });
        const translated = await fetchTranslated(text, toLang);
        vscode.window.showInformationMessage(translated);
      }
    );
  }
}

export default tranSeleHandler;
