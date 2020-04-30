const inquirer = require('inquirer');

module.exports = {
	askSchemaName: impliedSchemaName => {
		const questions = [
			{
				name: 'schemaName',
				type: 'input',
				message: 'Enter the name of the schema:',
				default: impliedSchemaName,
				validate: value => {
					if (value.length) {
						return true;
					} else {
						return `Please enter your the name of the postgres schema to restore. Ex: 'cg90'`;
					}
				}
			},
		];
		return inquirer.prompt(questions);
	},
	askConfirmDatabaseCredentials: () => {
		const questions = [
			{
				name: 'confirmDbCredentials',
				type: 'confirm',
				message: 'Database credentials are ok ?',
				default: true
			},
		];
		return inquirer.prompt(questions);
	},
	askDatabaseCredentials: () => {
		const questions = [
			{
				name: 'host',
				type: 'input',
				message: 'Enter the postgres hostname:',
				default: 'localhost',
				validate: value => {
					if (value.length) {
						return true;
					} else {
						return `Please enter the postgres hostname`;
					}
				}
			},
			{
				name: 'port',
				type: 'number',
				message: 'Enter the postgres port:',
				default: 5432,
				validate: value => {
					if (value > 0) {
						return true;
					} else {
						return `Please enter the postgres port`;
					}
				}
			},
			{
				name: 'database',
				type: 'input',
				message: 'Enter the database name:',
				validate: value => {
					if (value.length) {
						return true;
					} else {
						return `Please enter the database name`;
					}
				}
			},
			{
				name: 'user',
				type: 'input',
				message: 'Enter the postgres username:',
				default: 'postgres',
				validate: value => {
					if (value.length) {
						return true;
					} else {
						return `Please enter the postgres username`;
					}
				}
			},
			{
				name: 'password',
				type: 'input',
				message: 'Enter the postgres password:',
				default: 'postgres',
				validate: value => {
					if (value.length) {
						return true;
					} else {
						return `Please enter the postgres password`;
					}
				}
			},
		];
		return inquirer.prompt(questions);
	},
	askBackupFile: filelist => {
		const questions = [
			{
				type: 'list',
				name: 'backupPath',
				message: 'Select the backup you want to restore:',
				choices: filelist,
			}
		];
		return inquirer.prompt(questions);
	},

};
