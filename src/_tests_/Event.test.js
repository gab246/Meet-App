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
  test('render start details', () => {
    expect(EventWrapper.find('.start')).toHaveLength(1);
    expect(EventWrapper.find('.start').text()).toBe(event.start.dateTime);
  })
  test('render location details', () => {
    expect(EventWrapper.find('.location')).toHaveLength(1);
    expect(EventWrapper.find('.location').text()).toBe(event.location);
  })



  })


});

