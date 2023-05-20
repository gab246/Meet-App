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

test('eventNumber input changes', () => {
  NumberOfEventsWrapper.setState({ eventCount: 32})
  const number = { target: {value: 15 }};
  NumberOfEventsWrapper.find('.eventNumber').simulate('change', number);
  expect(NumberOfEventsWrapper.state('eventCount')).toBe(15);
});

})

