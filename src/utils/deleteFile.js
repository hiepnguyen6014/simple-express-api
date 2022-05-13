import fs from 'fs'
import path from 'path'

async function deleteFile(fileName) {
	const deletePath = path.join(__dirname, '..', '..', 'public', 'images', fileName)

	return await new Promise((resolve, reject) => {
		fs.unlink(deletePath, (err) => {
			if (err) {
				reject(false)
			} else {
				resolve(true)
			}
		})
	})
}

export default deleteFile
