//function takes an events array, uses map to create new array (only location)
// creating new array using spread operator and spread reading a Set
//Set removes duplicates from array

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [ ...new Set(extractLocations)];
  return locations;
};
