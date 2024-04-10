import axios from "axios";
import { cID, oID } from "../api/utils/generateID.js.js";
import { deleteBeneficiary } from "./deleteBeneficiary.js";
import { payouts } from "../api/utils/payoutInit.js.js";

export async function transerMoney(req, res, beneficiaryID) {
    const { amount, transferMode } = req.body
    const transferID = cID + oID

    await payouts.transfers
        .requestTransfer({
            beneId: beneficiaryID,
            amount: amount,
            transferId: transferID,
            transferMode:transferMode
        })
        .then(function (d) {
            console.log(d);
            deleteBeneficiary(req, res, transferID, beneficiaryID)
        })
        .catch(function (error) {
            console.error(error);
            // res.status(500).json(error)
            deleteBeneficiary(req, res, transferID, beneficiaryID)
        });
    
}