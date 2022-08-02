const vscode = require('vscode')

function activate(context) {
    const command = vscode.commands.registerCommand('editor.action.appendComma', () => {
        const editor = vscode.window.activeTextEditor
        const lineNumber = editor.selection.active.line
        const textLine = editor.document.lineAt(lineNumber)
        const lineLength = textLine.text.trimEnd().length

        if (textLine.text.charAt(lineLength - 1) !== ',') {
            editor.edit((builder) => {
                builder.insert(textLine.range.end, ',')
            })
        }
    })

    context.subscriptions.push(command)
}

module.exports = {
    activate,
}