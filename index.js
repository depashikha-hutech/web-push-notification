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

const publicVapidKey = "BFai2Ubydtsw0u5cbCiFXxIA5AORnFmA7cE-qa5RNKfcRtK8ZfNFyEH-lLee0pTO_8WCqPC5hvMOs4LAo5fOQLc";

const privateVapidKey = "lxAxUaY5_5wOkKSCxi89j2BgzGPfBcWXkJYoVl5Qov4";

// Setup the public and private VAPID keys to web-push library.
webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

// Create route for allow client to subscribe to push notification.
// app.post('/subscribe', (req, res) => {
//     const subscription = req.body;
//     console.log(subscription);
//     res.status(201).json({});
app.post("/subscribe", (req, res) => {
    try {
      const { subscription} = req?.body;
      console.log("kkk",{subscription});
      if (subscription.endpoint) {
        //const payload = JSON.stringify({ title: "Hello World", body: "This is your first push notification" });
        const payload ={ title :'Icon Notification',Option:{iii:"uuuu"}};
        console.log("nnnnn", payload);
        webpush .sendNotification(subscription, JSON.stringify(payload))
          .catch(console.log);
        res.send("Notification sent successfuly");
      } else res.status(500).json({ error: "No subscription end point" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });
  //  const payload = JSON.stringify({ title: "Hello World", body: "This is your first push notification" });

  // webpush.sendNotification(subscription, payload).catch(console.log);
//})

const PORT = 5001;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});