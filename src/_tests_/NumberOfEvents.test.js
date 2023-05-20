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

})

