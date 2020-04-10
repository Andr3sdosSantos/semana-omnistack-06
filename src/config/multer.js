/**
 * Upload de arquivos
 */
import multer from 'multer'
import { resolve } from 'path'
import crypto from 'crypto'

export default {
  dest: resolve(__dirname, '..', '..', 'tmp'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'tmp'))
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err)

        file.key = `${hash.toString('HEX')}-${file.originalname}`

        cb(null, file.key)
      })
    }
  }) // Armazena os arquivos no disco
}

