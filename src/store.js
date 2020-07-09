import { createStore } from 'redux';

const actionType = {
    GETSTATE: 0,
    ADDFAVORITE: 1,
    REMOVEFAVORITE: 2,
    SHOWMODALNOTFAVORITE: 3,
    SHOWMODALDETAILS: 4,
    SHOWFAVORITES: 5,
    FILTERTVSHOWS: 6,
    GETFAVORITES: 7
};

const readCookie = (name) => {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  };

  const readTvShowsFavorites = () => {
    let cookietvShows = readCookie("tvShowsFavorites") ? readCookie("tvShowsFavorites").split(',') : [];
    cookietvShows = cookietvShows.map((val) => parseInt(val));
    return cookietvShows;
  };

const initialState = { lstFavorites: readTvShowsFavorites(), 
                       showModalNoFavorite: false, 
                       showModalDetails: false, 
                       tvShowActual: undefined,
                       showFavorites: false,
                       filterTvShows: ''
                    };

function tvsReducer(state = initialState, action) {
    const idTvshow = action.idTvshow;
    switch (action.type) {
        case actionType.GETFAVORITES:
            return { ...state, lstFavorites: readTvShowsFavorites() };
        case actionType.ADDFAVORITE:
            document.cookie = "tvShowsFavorites=" + [...state.lstFavorites, idTvshow];
            return { ...state, lstFavorites: [...state.lstFavorites, idTvshow] };
        case actionType.REMOVEFAVORITE:
            const filter = state.lstFavorites.filter((val) => val !== idTvshow);
            document.cookie = "tvShowsFavorites=" + filter;
            return { ...state, lstFavorites: filter };
        case actionType.SHOWMODALNOTFAVORITE:
            return { ...state, showModalNoFavorite: action.showModal, tvShowActual: action.tvShow };
        case actionType.SHOWMODALDETAILS:
            return { ...state, showModalDetails: action.showModal, tvShowActual: action.tvShow };
        case actionType.SHOWFAVORITES:
            return { ...state, showFavorites: action.show };
        case actionType.FILTERTVSHOWS:
            return { ...state, filterTvShows: action.filter };
        case actionType.GETSTATE:
        default:
            return state;
    }
};

export const actionObject = {
    ADDFAVORITE: { type: actionType.ADDFAVORITE, idTvshow: undefined },
    REMOVEFAVORITE: { type: actionType.REMOVEFAVORITE, idTvshow: undefined },
    SHOWMODALNOTFAVORITE: { type: actionType.SHOWMODALNOTFAVORITE, showModal: false, tvShow: undefined },
    SHOWMODALDETAILS: { type: actionType.SHOWMODALDETAILS, showModal: false, tvShow: undefined },
    SHOWFAVORITES: { type: actionType.SHOWFAVORITES, show: false },
    FILTERTVSHOWS: { type: actionType.FILTERTVSHOWS, filter: '' },
    GETFAVORITES: { type: actionType.GETFAVORITES }
};

const store = createStore(tvsReducer);
export default store;