import sharp from "sharp";

export const compressImage = async (buffer: Buffer): Promise<Buffer> => {
  return await sharp(buffer)
    .resize({ width: 300, height: 300 })
    .toBuffer();
}