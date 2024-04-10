// import {Payouts} from "@cashfreepayments/cashfree-sdk"
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { configDotenv } from "dotenv";
import cashfree from 'cashfree-sdk'

configDotenv()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Construct the absolute path to the file
const filePath = path.join(__dirname, 'accountId_613121_public_key.pem');

let Payouts = cashfree.Payouts

// Instantiate Cashfree Payouts
Payouts.Init({
  "ENV": 'TEST',
  "ClientID": process.env.POCLIENTID,
  "ClientSecret": process.env.POCLIENTID,
  "PathToPublicKey": filePath,
  // "publicKey": process.env.PUBLICKEY
});

export const payouts = Payouts