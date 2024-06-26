// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

function generateAssignmentString(argString) {
    const argList = argString.split(',').map(arg => arg.trim());
    let result = '';
    for (const arg of argList) {
        result += `self.${arg} = ${arg}\n`;
    }
    return result.trim(); // Remove trailing newline
}



// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	vscode.window.showInformationMessage('Hello! Select class name and run your code');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('create-class-arguments.create-arguments', function () {
		// Gets selection and defines it as a variable
		const editor = vscode.window.activeTextEditor;
		const cursorSelection = editor.selection;
		if (cursorSelection && !cursorSelection.isEmpty) {
			const selectionRange = new vscode.Range(cursorSelection.start.line, cursorSelection.start.character, cursorSelection.end.line, cursorSelection.end.character);
			const highlightedWord = editor.document.getText(selectionRange);

			const classArguments = generateAssignmentString(highlightedWord)

			// Creates a button for that import's documentation link
			vscode.window.showInformationMessage("Click this to copy the arguments", 'Copy').then((action) => {
				if (action === 'Copy') {
					vscode.env.clipboard.writeText(classArguments); // Copy to clipboard
				}
			});
			
	}});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
