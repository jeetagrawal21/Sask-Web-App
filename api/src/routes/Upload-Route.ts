import { logger } from '@src/Server';
import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const upload = multer({ dest: '../data/uploads/' });

router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: 'No file received' });
        return;
    }

    const uploadedFilePath = path.join(__dirname, req.file.path);
    // console.log('File uploaded and saved at:', uploadedFilePath);
    logger.info('File uploaded and saved at:' + uploadedFilePath);
    res.json({ message: 'File uploaded successfully', filePath: req.file.path });
});

export default router;