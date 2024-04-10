import { checkPayoutStatus } from "./checkPayoutStatus.js";
import { payouts } from "../api/utils/payoutInit.js.js";


export async function deleteBeneficiary(req, res, transferID, beneficiaryID) {

    await payouts.beneficiary
        .remove({
            beneId: beneficiaryID,
        })
        .then(function (d) {
            console.log(d);
            checkPayoutStatus(req, res, transferID)
        })
        .catch(function (error) {
            console.error(error);
          //   res.status(500).json(error)
          });

    

}