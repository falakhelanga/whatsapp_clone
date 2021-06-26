import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";

const s3 = new S3({
  region: "us-east-2",
  accessKeyId: "AKIAVTQHTHQSLZVCYXEP",
  secretAccessKey: "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",
});

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
};

export const getFileStream = (fileKey) => {
  const downLoadParams = {
    Key: fileKey,
    Bucket: process.env.AWS_BUCKET_NAME,
  };

  return s3.getObject(downLoadParams).createReadStream();
};

export default uploadFile;
