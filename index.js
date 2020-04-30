#!/usr/bin/env node
const file = require('./lib/file')
const clear = require('clear')
const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('./lib/inquirer')
const { Client } = require('pg')
const Configstore = require('configstore')
const pg = require('./lib/pg')

const run = async () => {
	clear()
	console.log(
		chalk.yellow(
			figlet.textSync('PG Schema Restorer', { horizontalLayout: 'full' }),
		),
	)

	// select backup to restore
	const paths = file.findBackups()
	const { backupPath } = await inquirer.askBackupFile(paths)

	// choose schemaName
	const fileName = backupPath.split('/')[backupPath.split('/').length - 1]
	const impliedSchemaName = fileName.replace('.backup', '')
	const { schemaName } = await inquirer.askSchemaName(impliedSchemaName)

	// retrieve databaseCredentials
	const conf = new Configstore('schemaRestorer')
	if (!conf.get('databaseCredentials')) {
		conf.set('databaseCredentials', await inquirer.askDatabaseCredentials())
	} else {
		const db = conf.get('databaseCredentials')
		console.log(`Using these postgres credentials: ${db.host}:${db.port}/${db.database}?user=${db.user}&password=${db.password}`)
		const { confirmDbCredentials } = await inquirer.askConfirmDatabaseCredentials()
		if (confirmDbCredentials === false) {
			conf.set('databaseCredentials', await inquirer.askDatabaseCredentials())
		}
	}
	const databaseCredentials = conf.get('databaseCredentials')

	const client = new Client(databaseCredentials)
	try {
		await pg.validateConnection(client)
		await pg.dropSchema(client, schemaName)
		await pg.restoreBackup(databaseCredentials, backupPath)
	} finally {
		await client.end()
	}

	process.exit(0)

}

run()
