import { Map, fromJS } from 'immutable';
import { expect } from 'chai'
import {setEligiblePlayers} from '../src/core';

import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles INITIALIZE_DRAFT', () => {
        const initialState = Map();

        const entries = [
            { 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' },
            { 'id': 2, 'name':'Kevin Durant', 'salary': 15000000, 'position': 'sf' }
        ];

        const teams = [
            {'id': 1, 'name': 'Cruncheesie', 'owner': 'Derrick Brown', 'players':[], 'auctionDollars': 500 },
            {'id': 2, 'name': 'Juice', 'owner': 'Travis Maly', 'players':[], 'auctionDollars': 500 },
            {'id': 3, 'name': 'Chise', 'owner': 'Matt Peterson', 'players':[], 'auctionDollars': 500 },
            {'id': 4, 'name': 'WKRP', 'owner': 'Bill Boortz', 'players':[], 'auctionDollars': 500 }
        ];

        const action = {
            type: 'INITIALIZE_DRAFT',
            entries: entries,
            teams: teams
        }

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(Map({
            entries: fromJS([
                { 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' },
                { 'id': 2, 'name':'Kevin Durant', 'salary': 15000000, 'position': 'sf' }
            ]),
            teams: fromJS([
                {'id': 1, 'name': 'Cruncheesie', 'owner': 'Derrick Brown', 'players':[], 'auctionDollars': 500},
                {'id': 2, 'name': 'Juice', 'owner': 'Travis Maly', 'players':[], 'auctionDollars': 500},
                {'id': 3, 'name': 'Chise', 'owner': 'Matt Peterson', 'players':[], 'auctionDollars': 500},
                {'id': 4, 'name': 'WKRP', 'owner': 'Bill Boortz', 'players':[], 'auctionDollars': 500}
            ])
        }));


    });

    it('handles SET_ELIGIBLE_PLAYERS', () => {

        const initialState = Map();
        const entries = [
            { 'id': 1, 'name':'Steph Curry', 'salary': 10000000, 'position': 'pg' },
            { 'id': 2, 'name':'Kevin Durant', 'salary': 15000000, 'position': 'sf' }
        ];

        const action = {
            type: 'SET_ELIGIBLE_PLAYERS',
            entries: entries
        };

        var nextState = reducer(initialState, action);

        expect(nextState).to.equal(Map({
            entries: fromJS(entries)
        }));


    });

});
