import fs from "fs"
export const deleteFile = async (filename: string) => {

  if (fs.existsSync(filename)) {
    await fs.promises.unlink(filename);
  }

}