
Feature: As a user, I should be able to specify the number of events I can see so I can see more or less events in the list.

Scenario: When user hasn’t specified a number, 64 is the default number
Given the user has a list of events 
When user has not specified a number of events
Then user is shown the default number of 64


Scenario: User can change the number of events they want to see 
Given user is shown list of upcoming events 
When user specifies number of events to be shown
Then user is returned a list with the specified number of events
