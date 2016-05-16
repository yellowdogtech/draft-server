import {setEligiblePlayers, setEligibleTeams, INITIAL_STATE} from './core';

export default function recuder(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'INITIALIZE_DRAFT':
            state = setEligiblePlayers(state, action.entries);
            return setEligibleTeams(state, action.teams);

        case 'SET_ELIGIBLE_PLAYERS':
            return setEligiblePlayers(state, action.entries);
    }

    return state;
}