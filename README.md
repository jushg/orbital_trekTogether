# TrekTogether

[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/@orbital-trektogether/trek-together)


Orbital Summer 2021  
Ngo Ngoc Phuong Uyen &amp; Hoang Trong Tan

### Development environment pre-requisites
- A package manager (e.g., npm, Yarn, or pnpm)
- A working Firebase account
- [Expo Go](https://expo.io/tools#client) on your mobile device or simulators
- [`expo-cli`](https://expo.io/tools#cli), install with `npm install expo-cli --global` or `yarn global add expo-cli`

### Setting up
1. Clone this repository  

2. Install all dependencies with your package manager  
`npm install` or `yarn install`

3. Create a [Firebase](https://firebase.google.com) application  
Since this app only uses Firebase Authentication and Realtime Database (for now), [Spark plan](https://firebase.google.com/pricing) (without credit card) is sufficient.

4. Add a _web application_ on your Firebase project  

5. Grab the configuration info from _Add Firebase SDK_  
If you missed this page, go to _Project Overview_, scroll down to _Your apps_, and locate the web app with your set nickname. Under _SDK setup and configuration_, choose _Config_ and the configuration info is given to you in the form of `config firebaseConfig = { ... };`.

6. Create a `.env` file (yes, starting with a dot) in the root project directory

7. Populate the `.env` file with the Firebase configuration

8. In Firebase, enable **Authentication** by navigating to _Build_ > _Authentication_ > _Get started_ on your Firebase console

9. Run the app using `expo start`
