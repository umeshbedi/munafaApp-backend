import { payouts } from "../utils/payoutInit.js";

export async function checkPayoutStatus(req, res, transferID) {

    await payouts.transfers
        .getTransferStatus({
           transferId: transferID,
        })
        .then(function (d) {
            console.log(d);
            res.json(d)
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json(error)
        });
    
}