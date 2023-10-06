require("dotenv").config();

// Connects to mail jet api
const mailjet = require("node-mailjet")
                    .apiConnect(
                        process.env.MAPI,
                        process.env.MSECRET,
                    );

// Standard Mailjet template to send emails
const mailJet = (recepient, subject, bodyText, bodyHTML) => {
  const request = mailjet.post("send", {version : "v3.1"}).request({
    Messages : [
      {
        From : {
          Email : "chrysaor07@gmail.com",
          Name : "Udemy Clone",
        },
        To : [
          {
            Email : recepient,
            Name : "Receiver",
          },
        ],
        Subject : subject,
        TextPart : bodyText,
        HTMLPart : bodyHTML,
      },
    ],
  });
  request.then((result) => { console.log(result.body); })
      .catch((err) => { console.log(err.statusCode); });
};

module.exports = mailJet;
