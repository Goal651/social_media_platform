import { Response, Request } from "express";
import fs from "fs";
import crypto from "crypto";
import path from "path";
import mime from 'mime-types'

interface UserPayload {
    id: string;
    email: string;
}

interface FileData {
    filename: string;
    filesize: number;
    filetype: string;
    totalchunks: number;
    currentchunk: number;
}

const uploadMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const userPayload = res.locals.user as UserPayload;
        const { totalchunks, currentchunk, filename } = req.headers as unknown as FileData;
        const { chunk } = req.body;
        if (!chunk) {
            res.status(400).json({ message: "No chunk data received" });
            return
        }

        if (typeof chunk !== "string") {
            throw new Error("Invalid chunk format: Expected a Base64 string.");
        }

        const base64Data = chunk.split(",")[1];
        const fileChunk = Buffer.from(base64Data, "base64");

        const isFirstChunk = currentchunk === 0;
        const isLastChunk = currentchunk == (totalchunks - 1);

        const ext = filename.split(".").pop();
        const tempFileName: string = "temp_" + crypto.createHash("md5").update(filename).digest("hex") + "." + ext;
        const tempFilePath = path.join(__dirname, `../../uploads/`, tempFileName);
        if (isFirstChunk && fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);

        fs.appendFileSync(tempFilePath, fileChunk);

        if (isLastChunk) {
            const finalFileName = `${userPayload.id}_${crypto.createHash("md5").update(filename).digest("hex")}.${ext}`;
            const finalFilePath = path.join(__dirname, `../../uploads/`, finalFileName);

            fs.renameSync(tempFilePath, finalFilePath);
            res.status(200).json({ fileName: finalFilePath, message: "Upload complete" });
            return
        }

        res.status(200).json({ message: `Chunk ${currentchunk + 1}/${totalchunks} uploaded` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occurred" });
    }
};

const fetchFiles = async (filePaths: string[]): Promise<string[] | undefined> => {
    try {
        const files = filePaths.map((filePath: string) => {
            const fileBuffer = fs.readFileSync(filePath); // Read the file
            const mimeType = mime.lookup(filePath) || 'application/octet-stream'; // Get MIME type
            const base64String = fileBuffer.toString('base64'); // Convert to Base64
            return `data:${mimeType};base64,${base64String}`;
        });
        return files;
    } catch (error) {
        console.error('Error reading files:', error);
        return undefined;
    }
};
export default {
    uploadMedia,
    fetchFiles
};
