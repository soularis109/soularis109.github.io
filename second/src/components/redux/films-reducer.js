import axios from "axios";

const SET_MOVIES = 'SET-MOVIES',
      SET_CURRENT_PAGE = 'SET-CURRENT-PAGE',
      SET_TOTAL_COUNT = 'SET-TOTAL-COUNT',
      SET_MOVIES_ID = 'SET_MOVIES_ID',
      ADD_COMMENTS = 'ADD-COMMENTS',
      REMOVE_COMMENTS = 'REMOVE-COMMENTS';

let initialState = {
    films: [],
    pageSize: 1,
    totalCount: 0,
    currentPage: 1,
    details: [],
    comments: [
        {id: 1, title: 'Фильм пушка, рекомендую'},
        {id: 2, title: 'Рекомендую'}
    ]
}


export default function filmsReducer (state  = initialState, action) {

    switch (action.type) {
        case SET_MOVIES :
            return {...state, films: action.films}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_COUNT:
            return {...state, totalCount: action.totalCount}
        case SET_MOVIES_ID:
            return {...state, details: action.details}
        case ADD_COMMENTS :
            let newComments = {
                id: Date.now,
                title: action.newTitle
            }
            return {...state, comments: [...state.comments, newComments]}
        case REMOVE_COMMENTS:
            return {...state, comments: [...state.comments.filter(comment  => comment.id !== action.payload)]}
        default:
            return state
    }
}

export const setMovies = (films) => ({type: SET_MOVIES, films});
export const setMoviesDetails = (details) => ({type: SET_MOVIES_ID, details});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount})
export const addComments = (newTitle) => ({type: ADD_COMMENTS, newTitle})
export const removeComments = (id) => ({type: REMOVE_COMMENTS, payload: id});

export const getMovies = (currentPage, pageSize) => async (dispatch) => {
    axios.get(`https://yts.mx/api/v2/list_movies.json?limit=20&page=${currentPage}&movie_count=${pageSize}`)
        .then(response => {
            dispatch(setMovies(response.data.data.movies))
            dispatch(setTotalCount(response.data.data.movie_count))
        })

}

export const getOneMovie = (id) => async (dispatch) => {
    axios.get(`https://yts.mx/api/v2/list_movies.json` + id)
        .then(response => {
            console.log(response.data.data.movies)
        })

}
