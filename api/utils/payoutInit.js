import {Payouts} from "@cashfreepayments/cashfree-sdk"
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { configDotenv } from "dotenv";

configDotenv()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Construct the absolute path to the file
const filePath = path.join(__dirname, 'accountId_613121_public_key.pem');

// Instantiate Cashfree Payouts
const payoutsInstance = new Payouts({
  env: 'TEST',
  clientId: process.env.POCLIENTID,
  clientSecret: process.env.POCLIENTID,
//   pathToPublicKey: filePath,
  "publicKey": process.env.PUBLICKEY
});

export const payouts = payoutsInstance
