//file system
import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from "../models/IStorageProvider";

class DiskStorageProvider implements IStorageProvider{

    public async saveFile(file: string): Promise<string> {
        
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadsFolder, file)
        );
        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        
        //search the file
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try{
            //verify the existence of the file
            await fs.promises.stat(filePath)
        }catch{
            return;
        }

        // delete the file
        await fs.promises.unlink(filePath)

    }
}

export default DiskStorageProvider;