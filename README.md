# @dylanbulmer/r2-client

![npm version](https://img.shields.io/npm/v/@dylanbulmer/r2-client)
[![CodeQL](https://github.com/DylanBulmer/r2-client/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/DylanBulmer/r2-client/actions/workflows/codeql.yml)

## Purpose

An S3 client wrapper for Cloudflare R2 buckets.

## Getting started

Set up your `.env` file with the following variables, replace `CF_ACCOUNT_ID` with your Cloudflare Account ID. Your ID can be found on the top right of the R2 overview page. Right under the Account ID, there is a "Manage R2 API Tokens" link, create a new API token there and paste the contents into the `.env` file.

```ini
S3_ENDPOINT="https://CF_ACCOUNT_ID.r2.cloudflarestorage.com"
S3_ACCESSKEY_ID="..."
S3_SECRET_ACCESSKEY="..."
```

Ensure that your Node application has a way to import environment variables before importing the `r2-client` module. Frameworks like NextJS that import `.env` files automatically don't have to worry.

Here's an example usage of the module:

```ts
// Only needed if env vars are not imported prior.
import { config } from "dotenv";
config();

import { R2Client } from "@dylanbulmer/r2-client";

/* Create an R2 client.
 *
 * NOTE: Behind the scenes, the R2Client class uses a singleton
 *       S3 client instance.
 */
const r2 = new R2Client();

/* All r2 client methods are async/return promises, useful for
 * promise chaining as shown here.
 */
r2.getBuckets()
  .then(({ Buckets }) => {
    // An object containing a list of "Buckets" is returned.
    return Buckets[0]?.Name as string;
  })
  .then((bucket: string) => {
    // Use the bucket name when fetching objects.
    return r2.getObjects(bucket, "images/");
  })
  .then(data => {
    // A list of "CommonPrefixes" and/or "Contents" is returned.
    console.log({ data });
    return data;
  });
```

## TODO

- [ ]
