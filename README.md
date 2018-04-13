# pushNotif

#### Install Instructions

1. `git clone https://github.com/RyanAquino/pushNotif`
2. `cd pushNotif`
3. `npm install`

#### Add and run to android 
1. `ionic cordova platform add android`
2. `ionic cordova run android`


## Configure for firebase account

1. Change `./src/app/app.firebase.config.ts` to your config
2. download and replace `google-service.json`
3. change the server key `key=(insert key)` to your firebase fcm server key in (`./src/providers/notif/notif.ts`)   
