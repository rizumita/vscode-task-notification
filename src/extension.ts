// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as notifier from 'node-notifier'
import * as vscode from 'vscode'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.tasks.onDidEndTask((event) => { 
		const style = vscode.workspace.getConfiguration('taskNotification').get('style')
		const message = createMessage(event)

		switch (style) {
			case 'system':
				const playSound = vscode.workspace.getConfiguration('taskNotification').get('playSound') as boolean
				notifier.notify({ title: 'Visual Studio Code', message: message, sound: playSound })
				break
			case 'vscode':
				vscode.window.showInformationMessage(message)
				break
		}
	})
	
	context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}

function createMessage(event: vscode.TaskEndEvent): string {
	const taskName = event.execution.task.name
	return `${taskName} finished`
}
