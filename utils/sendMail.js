import { configDotenv } from "dotenv";

configDotenv()

export async function sendEmail(req, res) {
    const emailBody = {
        "sender": { "name": "Munafa App", "email": "no-reply@munafaapp.com" },
        "to": [{ "email": req.body.email, "name": req.body.name }],
        "htmlContent": 
     `<!DOCTYPE html> 
      <html> 
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
      <div>
      <p>OTP for new registration of Munafa app is given below:</p>
      <hr/>
      <h1>${req.body.otp}</h1>
      </div>
      </body> 
      </html>`,

        "subject": "OTP from Munafa App",
        "replyTo": { "email": "no-reply@munafaapp.com", "name": "Munafa App" },
        
    }
    
    fetch("https://api.sendinblue.com/v3/smtp/email", {
        method: 'POST',
        headers: {
            "api-key": process.env.EMAILKEY,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(emailBody)
    })
        .then(response => response.json())
        .then(response => {
            res.send("OTP sent successfully! Check your email and verify.")
        })
        .catch(err => { console.log(err); setLoading(false) })

}