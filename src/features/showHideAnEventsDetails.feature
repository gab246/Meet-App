Feature: Show and hide event details 

Scenario: An event element is collapsed by default 
Given the app is loaded
When the user has a list of events 
Then the event details are not visible to the user 

Scenario: User can expand an event to see its details 
Given the list of events has been loaded
When the user clicks the expand button for a particular event 
Then the event details will be shown

Scenario: User can collapse an event to hide its details
Given the user has expanded an event
When the user clicks the collapse button
Then the user can hide the details of the event.
