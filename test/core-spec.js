import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';
import { setEligiblePlayers, nextPlayer, setBid } from '../src/core';


describe('application logic', () => {
   
   describe('setEligiblePlayers', () => {
     
     it('initializes the state with eligible players', () => {
       const state = Map();
       
       const entries = [
           { 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' },
           { 'id': 2, 'name':'Kevin Durant', 'salary': 15000000, 'position': 'sf' }
       ];
       
       const initializedState = setEligiblePlayers(state, entries);
       
       expect(initializedState).to.equal(Map({
        entries: Map (fromJS([
            { 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' },
            { 'id': 2, 'name':'Kevin Durant', 'salary': 15000000, 'position': 'sf' }            
        ])) 
       }));
                         
     });
            
   });
   
   
   describe('nextPlayer', () => {
       
        it('loads next player by id to be bid on', () => {      
            const entries = fromJS([
                { 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' },
                { 'id': 2, 'name':'Kevin Durant', 'salary': 15000000, 'position': 'sf' }
            ]);

            const state = Map().set('entries', entries);

            const nextPlayerState = nextPlayer(state, 1);

            expect(nextPlayerState).to.equal(Map({
                entries: entries,
                currentPlayer: fromJS({ 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' })            
            }));           
        });
        
        it('resets the current bid amount to 0', () => {
            
        });
        
        it('resets the team eligibility', () => {
            
        });
   });
   
   describe('setBid', () => {
       
       it('sets bid for current player', () => {
            const entries = fromJS([
                { 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' },
                { 'id': 2, 'name':'Kevin Durant', 'salary': 15000000, 'position': 'sf' }
            ]);

            const currentPlayer = fromJS({ 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' });
            
            const state = Map()
                .set('entries', entries)
                .set('currentPlayer', currentPlayer)
                .set('currentBid', fromJS({'teamId': 0, 'amount':0}));
                
            var nextState = setBid(state, {'teamId': 1, 'amount': 9});
            
            expect(nextState).to.equal(Map({
                entries: entries,
                currentPlayer: currentPlayer,
                currentBid: fromJS({'teamId': 1, 'amount': 9})
            }));
            
             
           
       });              
   });
       
});


