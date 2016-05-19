import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import makeStore from '../src/store';

describe('store', () => { 
    
    it('is a Redux store configured with the correct reducer', () => {
        
       const store = makeStore();       
       expect(store.getState()).to.equal(Map());
       
       const entries =[
            { 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' },
            { 'id': 2, 'name':'Kevin Durant', 'salary': 15000000, 'position': 'sf' }
       ];
       
       store.dispatch({
           type: 'SET_ELIGIBLE_PLAYERS',
           entries: entries           
       });                 
       
       expect(store.getState()).to.equal(fromJS({
           entries: entries
       }));   
    });
    
});

