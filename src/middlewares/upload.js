import multer from 'multer'
import path from 'path'
import uniqueFilename from 'unique-filename'

export default multer({
	fileFilter: (req, file, next) => {
		const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
		if (!allowedTypes.includes(file.mimetype)) {
			next(new Error('Invalid file type'))
		} else {
			next(null, true)
		}
	},
	limits: {
		fileSize: 2000000,
	},
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join('public', 'images'))
		},
		filename: (req, file, cb) => {
			//make sure the file name is unique
			const uniqueName = uniqueFilename(path.join('public', 'images'))
			const newName = uniqueName.split('\\').pop() + path.extname(file.originalname)
			cb(null, newName)
		},
	}),
}).single('attendance')
