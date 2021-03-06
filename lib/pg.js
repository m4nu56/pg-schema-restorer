const Spinner = require('cli-spinner').Spinner
const exec = require('child_process').exec
const chalk = require('chalk')

module.exports = {
	validateConnection: async client => {
		try {
			await client.connect()
			await client.query('SELECT $1::text as message', ['Hello world!'])
		} catch (e) {
			console.error(`Error connecting to postgres... ${e.message}`);
			process.exit(1)
		}
	},

	dropSchema: async (client, schemaName) => {
		try {
			await client.query(`DROP SCHEMA IF EXISTS ${schemaName} CASCADE`);
			console.info(`Schema '${schemaName}' has been dropped...`);
		} catch (e) {
			console.error(`Error dropping the schema ${schemaName}... ${e.message}`, e);
			process.exit(1)
		}
	},

	restoreBackup: async (databaseCredentials, backupPath) => {
		const spinner = new Spinner(`%s Restoring backup '${backupPath}' on db '${databaseCredentials.database}'...`)
		try {
			spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏')
			spinner.start()
			await new Promise((resolve, reject) => {
				exec(`PGPASSWORD="${databaseCredentials.password}" pg_restore -d ${databaseCredentials.database} -U ${databaseCredentials.user} -C -w ${backupPath}`, async (error) => {
					if (error !== null) {
						console.error(`Error restoring the backup: ${error}`)
						reject()
						process.exit(1)
					}
					spinner.stop()
					console.info(chalk.yellow(`Backup '${backupPath}' has been restored...`))
					resolve()
				})
			})
		} catch (e) {
			console.error(`Error restoring backup '${backupPath}'... ${e.message}`, e)
			process.exit(1)
		} finally {
			spinner.stop()
		}
	},
}
