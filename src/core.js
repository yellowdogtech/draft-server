import { Map, fromJS } from 'immutable';


export function setEligiblePlayers(state, entries) {
    return state.set('entries', Map(fromJS(entries)));
}

export function nextPlayer(state, playerId) {
    var player = state.get('entries').find(function(entry) {
        if(entry.get('id') === playerId) {
            return entry;
        }        
    });
    
    return state.set('currentPlayer', player);
}
