import { Map, fromJS } from 'immutable';


export function setEligiblePlayers(state, entries) {
    return state.set('entries', fromJS(entries));
}

export function setEligibleTeams(state, teams) {
    return state.set('teams', fromJS(teams));
}

export function nextPlayer(state, playerId) {
    var player = state.get('entries').find(function(entry) {
        if(entry.get('id') === playerId) {
            return entry;
        }
    });

    return state.set('currentPlayer', player)
                .set('currentBid', fromJS({'teamId': 1, 'amount': 1}));
}

export function setBid(state, bid) {
    var amount = state.get('currentBid').get('amount');
    if(bid.amount <= amount) {
        return state;
    }

    return state.set('currentBid', fromJS(bid));
}