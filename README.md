# Project PillX
#### Team Red Panda
[Project demonstration video](https://youtu.be/rjBzclieww8)  
[Prototype function demonstration video](https://www.youtube.com/watch?v=UbGwiBAD5h4)

## Use the apk
1. The apk can be used on Android Phone.  
2. You can either login with account "test" and password "111", or create a new account by using sign up function.
3. note that a new account might not include information of health data page.  

## Run the Source Code
1. download the package
2. start your android emulator
3. open the folder with your editer
4. run the project with `yarn react-native run-android` or `yarn android`
5. To avoid some potencial error, you can enter the "android" folder and use `./gradlew clean`
6. If the error shows any missing package, please refer to the API reference below.

### Project break down

#### entry (PillX > index.js)
This file is the entry of the whole project which includes APP.js as the main js file.

#### login module (PillX > pages > loginModule)  
1. This mocule includes pages of welcome, signup and getPassword.
2. Users are able to create new account or login with an exist account.
3. getPassword function is waiting to be built.

#### schedule module (PillX > pages > scheduleModule)  
1. This mocule includes pages of schedule, medicine information and camera.
2. In schedule page, users can add new time card of taking medicine, delete card and cancel the alarm.
3. In the medicine information page, users can view the visulized medicine data.
4. In the camera page, users can scan a qr code by taking photo or select from album. The qr code will lead the users to medicine information page.

#### healthdata module (PillX > pages > healthdata.js & inputHealthData.js)  
1. This mocule includes pages of health data and data input.
2. Users are able to see their health data in a visualized interface.
3. User can add new data.

#### setting module (PillX > pages > settingModule)  
1. This mocule includes pages of setting and account information.
2. In setting page, users are able to switch the font size which is designed for the elderly.
3. In the account information page, users can check information and change avatar.

#### navigation (PillX > navigator)  
1. navigation of this project is mainly depended on the api "react-navigation".
2. stacks are used in each module.
3. schedule, health data and setting modules are signed as a tab navigation stack.
4. login module and tab navigation are signed as stack elements of the main navigation.

## Team member:
Lichao Song: back-end coder, database building  
Rui Tian: front-end coder, schedule page building  
Yan Sui: front-end coder, health data page building  
Yifan Wu: designer  
Zhuoran Li: front-end coder, medicine information page, setting page, login module building  

## API reference
[react-navigation](https://reactnavigation.org/)  
[react-native-reanimated](https://www.npmjs.com/package/react-native-reanimated)  
[react-native-camera](https://github.com/react-native-camera/react-native-camera)  
[react-native-local-barcode-recognizer](https://www.npmjs.com/package/react-native-local-barcode-recognizer)  
[react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker)  
[react-native-gesture-handler](https://www.npmjs.com/package/react-native-gesture-handler)  
[react-native-push-notification](https://www.npmjs.com/package/react-native-push-notification)  
[react-native-restart](https://www.npmjs.com/package/react-native-restart)  
[react-native-wheel-pick](https://www.npmjs.com/package/react-native-wheel-pick)  
[react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)  
[react-native-dialog](https://www.npmjs.com/package/react-native-dialog)  
[react-native-firebase](https://rnfirebase.io/)  
[react-native-drawerlayoutandroid](https://reactnative.dev/docs/drawerlayoutandroid)  

