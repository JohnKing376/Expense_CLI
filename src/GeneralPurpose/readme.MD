# Expense-CLI
This is an application utilizing the power of the CLI to perform operations

## Installation
1. Clone the project by using `https://github.com/JohnKing376/Expense_CLI.git`
2. Run `pnpm install` to install dependencies
3. Run `pnpm build` to build the project
4. Link the project to your device by `pnpm link-cli`
5. Then use `expense-tracker` to perform the operations

Note: `expense-tracker` will not work if you don't link the file with your device

## Usage
1. You can use the help action build into `expense-tracker` to get a list of the commands available for use.
   
 ```shell
PS C:\Users\Kings\Projects\ExpenseTracker-CLI> expense-tracker --help
Usage: expense [options] [command]

This is a CLI that can be used to carry out CRUD operations.

Options:
  -V, --version      output the version number
  -h, --help         display help for command

Commands:
  add [options]      This gives you the ability to add an expense.
  update [options]   This gives you the ability to update an expense
  delete [options]   This gives you the ability to delete an expense on the record
  list               This gives you the ability to list all expenses
  summary [options]  This returns the total expenses amount
  help [command]     display help for command
```

2. You can also ask for more information about the command by using the `expense-tracker add --help` 
```shell
PS C:\Users\johno\Documents\ExpenseTracker-CLI> expense-tracker add --help
Usage: expense add [options]

Options:
  -d, --description <string>  This takes in the description of the expense
  -a, --amount <number>       This takes the amount of the expense
  -c, --category <string>     This takes in the category of the expense
  -h, --help                  display help for command
```

**That is all for now. Updating this soon**