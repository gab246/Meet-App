# Meet Me Out App

# Overview
Meet Me Out is an app that allows users to view various events that are happening in different cities.
It is a serverless, progressive web application with React and uses a test drive development technique.


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
tbc

#Use of Serverless Functions
Meet Me Out uses serverless functions and as such, only authorized users will have access to view the events from the Google Calendar API. This access is granted through a token. The authorization server, AWS Lambda, is the platform where the serverless functions responsible for providing authorization tokens to users are hosted.

# Link
