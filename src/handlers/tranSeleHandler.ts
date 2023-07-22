import vscode from 'vscode';
import fetchTranslated, { Lang } from '../actions/fetchTranslated';
import getCursorRange from '../helpers/getCursorRange';

async function tranSeleHandler(toLang: Lang) {
  const editor = vscode.window.activeTextEditor;
  if (editor !== undefined) {
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

    const translated = await fetchTranslated(text, toLang);
    vscode.window.showInformationMessage(translated);
  }
}

export default tranSeleHandler;
