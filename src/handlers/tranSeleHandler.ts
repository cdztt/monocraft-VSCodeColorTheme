import vscode from 'vscode';
import fetchTranslated from '../actions/fetchTranslated';
import getCursorRange from '../helpers/getCursorRange';

async function tranSeleHandler() {
  const editor = vscode.window.activeTextEditor;
  if (editor !== undefined) {
    const range = getCursorRange(editor);
    let text = editor.document.getText(range);
    const regExpHanOrPunc = /[\p{Script=Han}+\p{P}+]/gu;
    const regExpEOLs = /(\r?\n)+/g;
    text = text.replace(regExpHanOrPunc, '').replace(regExpEOLs, ' ');

    const translated = await fetchTranslated(text);
    vscode.window.showInformationMessage(translated);
  }
}

export default tranSeleHandler;
