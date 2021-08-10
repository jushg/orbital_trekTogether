# TrekTogether

[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/@orbital-trektogether/trek-together)

A platform for hikers to connect, plan and record their hiking experiences.
> TrekTogether is a project for **[NUS Orbital 2021](https://orbital.comp.nus.edu.sg)** by **[Ngo Ngoc Phuong Uyen](https://github.com/uyencfi)** &amp; **[Hoang Trong Tan](https://github.com/jushg)**. This is an advanced-level project, **Apollo 11**


## Project Scope

We created a mobile application that can connect hikers with others in the community: by pairing up with another like-minded hiker and embark on trips together. Our app also serves as a tool to help hikers organise their journeys by planning future trips, and saving memorable details of their past trips.

### Read more about our project **[here](https://docs.google.com/document/d/1_d7XOHz21nRQN78oCOiJdRpqmZfpYzikjGE5rDPGCAk/edit?usp=sharing)** or watch a video demonstration **[here](https://www.youtube.com/watch?v=qVXCB2BAv_A)**

## Development Guide
### Tools &amp; prerequisites
- A package manager (e.g., npm, Yarn, or pnpm)
- A working Firebase account
- [Expo Go](https://expo.io/tools#client) on your mobile device or simulators
- [`expo-cli`](https://expo.io/tools#cli), install with `npm install expo-cli --global` or `yarn global add expo-cli`
- A working [Google Map API](https://developers.google.com/maps/documentation/places/web-service/get-api-key/)
- A working [Firebase Application](https://firebase.google.com), specifically a _web application_ project. [Spark plan](https://firebase.google.com/pricing) (without credit card) is sufficient.

### Setting up
1. Clone this repository  

2. Install all dependencies with your package manager  
`npm install` or `yarn install`

3. Grab the configuration info from _Add Firebase SDK_  
If you missed this page, go to _Project Overview_, scroll down to _Your apps_, and locate the web app with your set nickname. Under _SDK setup and configuration_, choose _Config_ and the configuration info is given to you in the form of `config firebaseConfig = { ... };`.

4. Create a `.env` file (yes, starting with a dot) in the root project directory

5. Populate the `.env` file with the Firebase configuration and Google API key

6. In Firebase, enable **Authentication** by navigating to _Build_ > _Authentication_ > _Get started_ on your Firebase console

7. Run the app using `expo start`
