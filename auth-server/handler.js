const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

//SCOPES - allows you to set access levels. Read only atm (dont have access rights)
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

//Credentials - values required to get access to calendar
//'process.nv' - means value is in config.json file
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://gab246.github.io/meet-app/"],
  javascript_origins: ["https://gab246.github.io", "http://localhost:3000"],
};

const { client_secret, client_id, redirect_uris, calendar_id } = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

//first step in OAuth - generate a URL for user login in 
//Google and be authorized so see calendar events data
//code received in URL parameter after logging in

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  //above - scopes array passed to scope option. 
  //any scopes passed must go through oauth consent screen 
  //scopes are the ones user will see on consent screen

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  //values used to instantiate the OAuthClient - at top of file
  const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    //authorization code extracted from URL query
    const code = decodeURIComponent(`${event.pathParameters.code}`);
  
    return new Promise((resolve, reject) => {
       oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      });
    })
      .then((token) => {
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(token),
        };
      })
      .catch((err) => {
        console.error(err);
        return {
          statusCode: 500,
          body: JSON.stringify(err),
        };
      });
    };

    module.exports.getCalendarEvents = async (event) => {
      const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
      );
      
      const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
      oAuth2Client.setCredentials({ access_token });
      
      return new Promise ((resolve, reject) => {
        
        //accessing data from the calendar
        calendar.events.list(
          {
            calendarId: calendar_id,
            auth: oAuth2Client,
            timeMin: new Date().toISOString(),
            singleEvents: true,
            orderBy: "startTime",
          },
          (error, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(response);
            }
          }
        );
      })
        .then((results) => {
          return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ events: results.data.items })
          };
        })
        .catch((err) => {
          console.error(err);
          return {
            statusCode: 500,
            body: JSON.stringify(err),
          };
        });
      };
