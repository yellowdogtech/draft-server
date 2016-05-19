import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);


store.dispatch({
    type: 'SET_ELIGIBLE_PLAYERS',
    entries: [{ 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' },
              { 'id': 2, 'name':'Kevin Durant', 'salary': 15000000, 'position': 'sf' }]       
});
