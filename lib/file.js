const fs = require('fs');
const homedir = require('os').homedir();
const klawSync = require('klaw-sync')
const path = require('path')

module.exports = {
	readFile: filePath => {
		return new Promise((resolve, reject) => {
			fs.readFile(filePath, (err, data) => {
				if (err || !data) {
					reject(err);
					return;
				}
				resolve(data.toString());
			})
		})
	},

	findBackups: () => {
		const documents = findBackupsInPath(`${homedir}/Documents`);
		const downloads = findBackupsInPath(`${homedir}/Downloads`);
		return [...documents, ...downloads];
	},
};

const findBackupsInPath = filePath => {
	return klawSync(filePath, {
		nodir: true,
		traverseAll: true,
		filter: filePath => {
			const basename = path.basename(filePath.path)
			return basename.match(/.*\.backup$/);
		}
	}).map(f => f.path)
}
