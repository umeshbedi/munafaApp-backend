import axios from 'axios';
import { configDotenv } from 'dotenv';
import express from 'express'

configDotenv()

const orderPaymenRouter = express.Router()

function customerID() {
    const min = 1000000000;
    const max = 9999999999;
    const tempID = Math.floor(Math.random() * (max - min + 1)) + min;
    return tempID

}

export function orderID() {
    const randomString = Math.random().toString(36).substring(2, 12);
    // const uid = uuid.replace(/-/g, '') + randomString;
    return randomString;
}

//create order and get session id
orderPaymenRouter.post("/", async (req, res) => {
    const cid = String(customerID())
    const oid = orderID()

    const requestBody = {
        customer_details: {
            customer_id: cid,
            customer_phone: cid
        },
        order_meta: {
            return_url: req.body.returnUrl+"/"+cid+"/"+oid,
            notify_url: req.body.notifyUrl+"/"+cid+"/"+oid
        },
        order_id: oid,
        order_amount: req.body.amount,
        order_currency: 'INR'
    };

    await axios.post('https://sandbox.cashfree.com/pg/orders', requestBody, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-api-version': '2023-08-01',
            'x-client-id': `${process.env.PGCLIENTID}`,
            'x-client-secret': `${process.env.PGSECRETID}`
        }
    })
        .then(response => {
            // console.log('Response:', response.data);
            res.status(200).json(response.data)
        })
        .catch(error => {
            // console.error('Error:', error);
            res.status(403).json(error)
        });

})


//Do payment by different payment method
orderPaymenRouter.post("/:session", (req, res) => {
    const requestBody = {
        payment_method: req.body.pMode,
        // payment_method: {
        // card: {
        //     channel: 'link',
        //     card_number: '6074825972083818',
        //     card_holder_name: 'Test',
        //     card_expiry_mm: '03',
        //     card_expiry_yy: '28',
        //     card_cvv: '123'
        // },
        // upi: {
        //     channel: 'collect',
        //     upi_id: 'success@upi',
        //     upi_redirect_url: true,
        //     upi_expiry_minutes: 10
        // },
        // netbanking: {
        //     channel: "link",
        //     netbanking_bank_code: 3333,
        //     netbanking_bank_name: "TESTR"
        // }
        // },
        payment_session_id: req.params.session
    };

    axios.post('https://sandbox.cashfree.com/pg/orders/sessions', requestBody, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-api-version': '2023-08-01'
        }
    })
        .then(response => {
            console.log('Response:', response.data);
            res.status(200).json(response.data)
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(400).json(error)
        });

    console.log(req.params.session, req.body.pMode)

})


orderPaymenRouter.get("/success/:cid/:oid", (req, res) => {
    res.send({
        message:"Payment Success",
        orderID:req.params.oid,
        customerID:req.params.cid
    })
})

orderPaymenRouter.get("/notify/:cid/:oid", (req, res) => {
    res.send(req.body.data)
})

export default orderPaymenRouter