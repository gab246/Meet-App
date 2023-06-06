import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

  let AppWrapper

  test('An event element is collapsed by default', ({ given, when, then }) => {
    
    given('the app is loaded', () => {
      AppWrapper = mount(<App />);
    });

    when('the user has a list of events', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(64);
    });


    then('the event details are not visible to the user', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(64);

    });
  });

 
  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the list of events has been loaded', async () => {
      AppWrapper = await mount(<App />)
    });

    when('the user clicks the expand button for a particular event', () => {
      AppWrapper.update();
      AppWrapper.find('.event .detailsButton').at(0).simulate('click');
    });

    then('the event details will be shown', () => {
      AppWrapper.update();
      AppWrapper.find('.event .eventDetails').at(0).simulate('click');

    });
  });


  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('the user has expanded an event', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.event .detailsButton').at(0).simulate('click');
    });

    when('the user clicks the collapse button', () => {
      AppWrapper.update();
      AppWrapper.find('.event .detailsButton').at(0).simulate('click');
    });

    then('the user can hide the details of the event.', () => {
      expect(AppWrapper.find('.event .eventDetails')).toHaveLength(0);
    });
  });


})