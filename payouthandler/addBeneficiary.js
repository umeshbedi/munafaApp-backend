import { oID } from "../utils/generateID.js";
import { transerMoney } from "./transferMoney.js";
import { payouts } from "../utils/payoutInit.js";

export async function addBeneficiary(req, res) {

    let data;
    const { name, IFSC, account } = req.body
    const beneficiaryID = oID

    if (req.body.transferMode == "banktransfer") {
        data = {
            name: name,
            ifsc: IFSC,
            bankAccount: account,
        }
    } else {
        data = {
            name: "john doe",
            vpa: req.body.UPI
        }
    }

    await payouts.beneficiary
        .add({
            email: 'johndoe@cashfree.com',
            address1: 'ABC Road',
            phone: '9876543210',
            beneId: beneficiaryID,
            ...data
        })
        .then(function (response) {
            console.log(response);
            transerMoney(req, res, beneficiaryID)
        })
        .catch(function (error) {
            console.error(error);
            // res.status(500).json(error)
        });


    
}