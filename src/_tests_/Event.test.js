import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import Event from '../Event';

describe('<Event /> component', () => {
  let event, EventWrapper;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  test('render the summary details', () => {
    expect(EventWrapper.find('.summary')).toHaveLength(1); 
    expect(EventWrapper.find('.summary').text()).toBe(event.summary);
  })



});

