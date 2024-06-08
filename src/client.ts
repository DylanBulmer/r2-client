import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";

const conf: S3ClientConfig = {
  region: "auto",
  endpoint: process.env.S3_ENDPOINT as string,
  bucketEndpoint: Boolean(process.env.S3_BUCKET_ENDPOINT as string),
  credentials: {
    accessKeyId: process.env.S3_ACCESSKEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESSKEY as string,
  },
};

const client = new S3Client(conf);

export default client;
