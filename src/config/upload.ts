// Arquivo que irá armazenar as configs do upload de imagens ou arquivos da aplicação
import path from 'path'; // passar caminho para qualquer SO
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: tmpFolder, // saber onde os arquivos ficam

    storage: multer.diskStorage({
        destination: tmpFolder, // arquivos de upload vao para essa pasta
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }), // armazenar imgs q fizer upload dentro da estrutura do app
};
