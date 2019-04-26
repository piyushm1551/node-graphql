// // var arr = [
// //     "20181005071516-Locklist.js",
// //     "20181005081852-Admin.js",
// //     "20181119070120-Locklist Tested.js",
// //     "20181120043340-Organization.js",
// //     "20181122101847-lock master key.js",
// //     "20181122110744-lock organization_id.js",
// //     "20181127091816-Country.js",
// //     "20190214130830-subscription status.js"
// // ]
// // var query = `INSERT INTO public."SequelizeMeta" (name) VALUES`;
// // for (var i = 0; i < arr.length; i++) {
// //     query = query + `('${arr[i]}'),`
// // }

// // console.log('q', query)

// var FCM = require('fcm-node');

// var serverKey = "AAAAQe05I-g:APA91bFH2S3DuhlGHDUhlVdYSjbJCS50i6SezgdhtgVmY20LdzdaVVS98SvIV-SLH53YW5QWQseyEQNXckRCAzwtEF2L5idj1X_M38V7vATBptiDWJ2EcX58r5EcHsi13Uzv2BCPz5Lt";
// var fcm = new FCM(serverKey);

// var noti_data = {
//     to: 'e11rR-J7-4o:APA91bGRumnhahKpk8SZ_IjLu34iE9sxoTMRf5jRs7W3TN8sXmvmsF9lxxz0cDd-Im93ligW0dbu2f4eOQSnym6-G4dr2FwNarSEbDKOO1RTegKs1DKcDJy_zi_Cy3Q70uJGJRCZOid3',
//     title: 'Unlock',
//     body: 'Your device F 7 has been unlocked by Venkat Raghu',
//     data: {
//         title: 'Unlock',
//         body: 'Your device F 7 has been unlocked by Venkat Raghu',
//         action: 'app_unlock',
//         user_id: '2',
//         lock_id: '1',
//         id: '152',
//         time: '1551949271000'
//     }
// }

// fcm.send(message, function (err, response) {
//     if (err) {
//         console.log('err', err);
//         console.log("Something has gone wrong!");
//     } else {
//         console.log("Successfully sent with response: ", response);
//     }
// });

var moment = require('moment');
var __ = require('lodash');
var name = 'Earth, Planets and Space'
console.log(__.startCase(name))
// var dob = '10-12-1994';
// console.log(moment(dob));
