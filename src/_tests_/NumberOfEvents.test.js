import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
let NumberOfEventsWrapper;

beforeAll(() => {
  NumberOfEventsWrapper = shallow(<NumberOfEvents eventsUpdate={() => {}}/>);
});

test('renders container for NumberOfEvents', () => {
  expect(NumberOfEventsWrapper.find('.numberOfEvents-container')).toHaveLength(1);
});

test('check default number is 64', () => {
  expect(NumberOfEventsWrapper.state('eventCount')).toBe(64);
});


test('eventNumber default is 64', () => {
  NumberOfEventsWrapper.setState({ eventCount: 64})
});

test('state changes when eventNumber input changes', () => {
  expect(NumberOfEventsWrapper.state('eventCount')).toBe(64);
  NumberOfEventsWrapper.find('.eventNumber').simulate('change', {target: {value:13}});
  expect(NumberOfEventsWrapper.state('eventCount')).toBe(13);
  
})
 
})

  

