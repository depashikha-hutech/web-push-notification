 const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
//const { Subscription } = require('./model/subscription');
// Create express app.
const app = express();
let db = require("./model/db");

require("dotenv").config();

db.sequelize
  .authenticate()
  .then(() => {
    console.error(
      `db connected to  ${ process?.env?.SERVERHOST || "NA" } database "${process?.env?.DBNAME || "NA"}"`
      )
   db.sequelize.sync({alter:true});
    })
  .catch((err) => {
    console.error(
      `ERROR - Unable to connect to the database: "${process.env.DB_NAME}"`,
      err
    );
    });





// Use body parser which we will use to parse request body that sending from client.
app.use(bodyParser.json());

// We will store our client files in ./client directory.
app.use(express.static(path.join(__dirname, "client")))

const publicVapidKey = "BGE0hEoY6OLW48c_oQKB9quw2LEStTkR5J33_0FbcSFbYgDTt5DRb0CADfqVtF_Kz1WIOg3xNus2TZYl3MDMZ4M";

const privateVapidKey = "96f3DK1BSFbE2VmPSw_jBzjUS0jNcKQmXWfzvwjFC-E";

// Setup the public and private VAPID keys to web-push library.
webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

// Create route for allow client to subscribe to push notification.

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  console.log("ffff",subscription);
  db.Subscription.create(subscription)
    .then(() => {
      console.log('Subscription saved to database');
      res.sendStatus(201);
    })
    .catch(error => console.error(error));
});
//app.post('/subscribe', (req, res) => {
  //  const subscription = req.body;
   // res.status(201).json({});
    //const payload = JSON.stringify({ title: "Hello World", body: "This is your first push notification" });
    //webpush.sendNotification(subscription, payload).catch(console.log);
//})

// app.post("/push", (req, res) => {
//       try {
//         const {subscription} = req?.body;
//         console.log("kkk",{subscription});
//         if (subscription.endpoint) {
//           //const payload = JSON.stringify({ title: "Hello World", body: "This is your first push notification" });
//            const payload ={title :"Icon Notification"};
//           console.log("nnnnn", payload);
//           webpush .sendNotification(subscription, JSON.stringify({payload}))
//             .catch(console.log);
//           res.send("Notification sent successfuly");
//         } else res.status(500).json({ error: "No subscription end point" });
//       } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//       }
//     });


app.post('/notification', async (req, res) => {
  //const { title, message } = req.body;
  const users = await db.Subscription.findAll();
  const payload = JSON.stringify({ title:"icon-notification" });
  try {
    const sendNotifications = users.map(async (user) => {
      await webpush.sendNotification(user, payload);
    });
    // await Promise.all(sendNotifications);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error sending notification' });
  }
});
const PORT = 5001;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});