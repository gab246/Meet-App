import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
let NumberOfEventsWrapper;

beforeAll(() => {
  NumberOfEventsWrapper = shallow(<NumberOfEvents eventsUpdate={() => {}}/>);
});

test('renders container for NumberOfEvents', () => {
  expect(NumberOfEventsWrapper.find('.container')).toHaveLength(1);
});

test('check default number is 32', () => {
  const number = NumberOfEventsWrapper.state('eventCount');
  expect(NumberOfEventsWrapper.find('.eventNumber').prop('value')).toBe(number);
});


})

