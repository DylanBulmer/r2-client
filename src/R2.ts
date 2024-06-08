import {
  CopyObjectCommand,
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import client from "./client";

export default class R2Client {
  /**
   * R2 admin read permission required, does not work for Object read permission.
   * @returns A list of buckets.
   */
  public async getBuckets() {
    return await client.send(new ListBucketsCommand({}));
  }

  /**
   * Get the list of objects and directories at a key prefix/directory.
   * @param bucket Selected bucket name.
   * @param prefix Object key prefix.
   * @param delimiter Defaults to '/' to show prefixes (directories) and objects seperate.
   * @returns List of objects at prefix/directory.
   */
  public async getObjects(bucket: string, prefix?: string, delimiter?: string) {
    return await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix || "/",
        Delimiter: delimiter || "/",
      }),
    );
  }

  public async getObject(bucket: string, key: string) {
    return await client.send(
      new GetObjectCommand({ Bucket: bucket, Key: key }),
    );
  }

  public async putObject(bucket: string, key: string) {
    return await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );
  }

  public async copyObject(bucket: string, sourceKey: string, key: string) {
    return await client.send(
      new CopyObjectCommand({
        Bucket: bucket,
        CopySource: sourceKey,
        Key: key,
      }),
    );
  }

  public async getSignedUrl(command: any) {
    return await getSignedUrl(client, command, { expiresIn: 3600 });
  }
}
