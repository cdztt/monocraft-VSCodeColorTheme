const vscode = require('vscode')

function activate(context) {
    const command = vscode.commands.registerCommand('editor.action.appendComma', () => {
        vscode.commands.executeCommand('editor.action.trimTrailingWhitespace').then(() => {
            const editor = vscode.window.activeTextEditor
            const { line: lineIndex, character: characterIndex } = editor.selection.active
            const textLine = editor.document.lineAt(lineIndex)
            const lastCharacterIndex = textLine.range.end.character

            if (textLine.text.charAt(lastCharacterIndex - 1) !== ',') {
                editor.edit((builder) => {
                    builder.insert(textLine.range.end, ',')
                }).then(() => {
                    if (lastCharacterIndex === characterIndex) {//如果一开始光标就在行尾
                        const originalPosition = new vscode.Position(lineIndex, characterIndex)
                        editor.selection = new vscode.Selection(originalPosition, originalPosition)
                    }
                })
            }
        })
    })

    context.subscriptions.push(command)
}

module.exports = {
    activate,
}