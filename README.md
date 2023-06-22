# Meet Me Out App

# Overview
Meet Me Out is an app that allows users to view various Front-End developer events that are happening in different cities.
It is a serverless, progressive web application with React and uses a test drive development technique. The focus was not on styling 
(although some was added), but rather the functions.


# Features
When using Meet Me Out, users can:
- Filter events by city
- Show/hide event details
- View a specifc number of events
- Use the app when offine
- Add an app shortcut to the home screen
- View a chart that shows the number of upcoming events by city 

# Language, Libraries, Frameworks and Tools
- React
- HTML and CSS
- Recharts
- AWS Lambda
- GoogleOAuth2
- Google Calendar API
- Jest
- Jest-Cucumber
- Puppeteer
- Atatus

# Use of Serverless Functions
Meet Me Out uses serverless functions and as such, only authorized users will have access to view the events from the Google Calendar API.

A key and secret are obtained from OAuth consumer and are used to identify the Meet Me Out app. The key and secret are then entered into the authorization server, AWS Lambda, and cross-checked. If they match, a token is send back from the authorization server and it is used to identify the user. Each time a request is made via the app, the token is sent along aswell. When the API sees the token, it knows the user is who they say they are. The request is then fulfilled and is send back to the user.

# Link
[Meet Me App](https://gab246.github.io/meet-app/)
