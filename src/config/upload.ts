// Arquivo que irá armazenar as configs do upload de imagens ou arquivos da aplicação
import path from 'path'; // passar caminho para qualquer SO
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
    driver: 's3' | 'disk';

    tmpFolder: string;
    uploadsFolder: string;

    multer: {
        storage: StorageEngine;
    };

    config: {
        disk: {};
        aws: {
            bucket: string;
        };
    };
}

export default {
    driver: process.env.STORAGE_DRIVER,

    tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),

    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder, // arquivos de upload vao para essa pasta
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const fileName = `${fileHash}-${file.originalname}`;

                return callback(null, fileName);
            },
        }), // armazenar imgs q fizer upload dentro da estrutura do app
    },

    config: {
        disk: {},
        aws: {
            bucket: 'app-gobarber-bigarelli',
        },
    },
} as IUploadConfig;
