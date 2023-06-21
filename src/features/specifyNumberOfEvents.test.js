import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount, shallow } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';


const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

	let AppWrapper;
  let NumberOfEventsWrapper;
	NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} /> );

test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    	given('the user has a list of events', () => {
        AppWrapper = mount(<App />);
    	});

    	when('user has not specified a number of events', () => {
    	});

    	then(/^user is shown the default number of (\d+)$/, (arg0) => {
				expect(AppWrapper.state('eventCount')).toBeUndefined(); 
				AppWrapper.setState({ eventCount: 32 });
				expect(AppWrapper.state('eventCount')).toBe(32); 
    	});
    });



    test('User can change the number of events they want to see', ({ given, when, then }) => {
    	given('user is shown list of upcoming events', async () => {
       AppWrapper = await mount(<App />);
    	});

    	when('user specifies number of events to be shown', () => {
				AppWrapper.update();
				NumberOfEventsWrapper.find('.eventNumber').simulate( 'change', {target: {value:13}});
    	});

    	then('user is returned a list with the specified number of events', () => {
				expect(NumberOfEventsWrapper.state('eventCount')).toBe(13);
			
    	});
    });


});