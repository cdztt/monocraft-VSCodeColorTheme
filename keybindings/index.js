const vscode = require('vscode')

function append(punctuation) {
    vscode.commands
        .executeCommand('editor.action.trimTrailingWhitespace')
        .then(() => {
            const editor = vscode.window.activeTextEditor
            const { line: lineIndex, character: characterIndex } = editor.selection.active
            const textLine = editor.document.lineAt(lineIndex)
            const lastCharacterIndex = textLine.range.end.character

            if (textLine.text.charAt(lastCharacterIndex - 1) !== punctuation) {
                editor.edit((builder) => {
                    builder.insert(textLine.range.end, punctuation)
                }).then(() => {
                    if (lastCharacterIndex === characterIndex) {//如果一开始光标就在行尾
                        const originalPosition = new vscode.Position(lineIndex, characterIndex)
                        editor.selection = new vscode.Selection(originalPosition, originalPosition)
                    }
                })
            }
        })
}

function activate(context) {
    const appendComma = vscode.commands.registerCommand(
        'editor.action.appendComma',
        () => {
            append(',')
        }
    )

    const appendSemicolon = vscode.commands.registerCommand(
        'editor.action.appendSemicolon',
        () => {
            append(';')
        }
    )

    context.subscriptions.push(appendComma, appendSemicolon)
}

module.exports = {
    activate,
}