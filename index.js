 const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

// Create express app.
const app = express();

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
    console.log("ggggggggg",subscription);
    res.status(201).json({});
    //const payload = JSON.stringify({ title: "Hello World", body: "This is your first push notification" });
    //console.log("kkkkk,",payload);

    //webpush.sendNotification(subscription, payload).catch(console.log);
})

app.post("/push", (req, res) => {
      try {
        const {subscription} = req?.body;
        console.log("kkk",{subscription});
        if (subscription.endpoint) {
          //const payload = JSON.stringify({ title: "Hello World", body: "This is your first push notification" });
           const payload ={title :"Icon Notification"};
          console.log("nnnnn", payload);
          webpush .sendNotification(subscription, JSON.stringify({payload}))
            .catch(console.log);
          res.send("Notification sent successfuly");
        } else res.status(500).json({ error: "No subscription end point" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    });

const PORT = 5001;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});