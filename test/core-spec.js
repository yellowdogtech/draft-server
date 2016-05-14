import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';
import { setEligiblePlayers, setEligibleTeams, nextPlayer, setBid } from '../src/core';


describe('application logic', () => {

   describe('setEligiblePlayers', () => {

     it('initializes the state with eligible players and team data', () => {
       const state = Map();

       const entries = [
           { 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' },
           { 'id': 2, 'name':'Kevin Durant', 'salary': 15000000, 'position': 'sf' }
       ];

       const nextState = setEligiblePlayers(state, entries);

       expect(nextState).to.equal(Map({
        entries: fromJS([
            { 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' },
            { 'id': 2, 'name':'Kevin Durant', 'salary': 15000000, 'position': 'sf' }
        ])
       }));

     });
   });

   describe('setEligibleTeams', () => {
       it('should initialize state with eligible teams', () => {
        const state = Map();

        const teams = [
            {'id': 1, 'name': 'Cruncheesie', 'owner': 'Derrick Brown', 'players':[] },
            {'id': 2, 'name': 'Juice', 'owner': 'Travis Maly', 'players':[] },
            {'id': 3, 'name': 'Chise', 'owner': 'Matt Peterson', 'players':[] },
            {'id': 4, 'name': 'WKRP', 'owner': 'Bill Boortz', 'players':[] }
        ];

        const nextState = setEligibleTeams(state, teams);

        expect(nextState).to.equal(Map({
            teams: fromJS([
                {'id': 1, 'name': 'Cruncheesie', 'owner': 'Derrick Brown', 'players':[], 'capSpace': 500},
                {'id': 2, 'name': 'Juice', 'owner': 'Travis Maly', 'players':[], 'capSpace': 500},
                {'id': 3, 'name': 'Chise', 'owner': 'Matt Peterson', 'players':[], 'capSpace': 500},
                {'id': 4, 'name': 'WKRP', 'owner': 'Bill Boortz', 'players':[], 'capSpace': 500}
            ])
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
                currentPlayer: fromJS({ 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' }),
                currentBid: fromJS({'teamId': 1, 'amount': 1})
            }));
        });

        it('resets the current bid amount to 1', () => {
            const entries = fromJS([
                { 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' },
                { 'id': 2, 'name':'Kevin Durant', 'salary': 15000000, 'position': 'sf' }
            ]);

            const state = Map().set('entries', entries);

            const nextPlayerState = nextPlayer(state, 1);

            expect(nextPlayerState).to.equal(Map({
                entries: entries,
                currentPlayer: fromJS({ 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' }),
                currentBid: fromJS({'teamId': 1, 'amount': 1})
            }));

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

       it('will not allow a bid below current bid', () => {
            const entries = fromJS([
                { 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' },
                { 'id': 2, 'name':'Kevin Durant', 'salary': 15000000, 'position': 'sf' }
            ]);

            const currentPlayer = fromJS({ 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' });

            const state = Map()
                .set('entries', entries)
                .set('currentPlayer', currentPlayer)
                .set('currentBid', fromJS({'teamId': 1, 'amount':100}));

            var nextState = setBid(state, {'teamId': 2, 'amount': 99});

            expect(nextState).to.equal(Map({
                entries: entries,
                currentPlayer: currentPlayer,
                currentBid: fromJS({'teamId': 1, 'amount': 100})
            }));
       });
   });
});


