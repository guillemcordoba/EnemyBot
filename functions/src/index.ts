const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.fcmSend = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    console.log('Before send notifications');
    sendNotifications();
    console.log('After send notifications');
    res.status(200).send();
  });
  return;
});

function sendNotifications() {
  admin
    .database()
    .ref(`/fcmToken/token`)
    .once('value')
    .then(token => token.val())
    .then(userFcmToken => {
      for (let i = 0; i < 6; i++) {
        const payload = {
          notification: {
            title: 'Enemic invisible: ATTACK NOW!',
            body: '' + Math.random(),
            icon: 'https://placeimg.com/250/250/any'
          }
        };
        console.log('Sending message');
        admin.messaging().sendToDevice(userFcmToken, payload);
        console.log('Message sent');
      }
      return;
    })
    .then(res => {
      console.log('Sent Successfully', res);
    })
    .catch(err => {
      console.log(err);
    });
}
