import axios from "axios";

const SET_MOVIES = 'SET-MOVIES',
      SET_CURRENT_PAGE = 'SET-CURRENT-PAGE',
      SET_TOTAL_COUNT = 'SET-TOTAL-COUNT',
      SET_MOVIES_ID = 'SET-MOVIES-ID',
      ADD_COMMENTS = 'ADD-COMMENTS',
      REMOVE_COMMENTS = 'REMOVE-COMMENTS',
      UPDATE_COMMENTS = 'UPDATE-COMMENTS';

let initialState = {
    films: [],
    pageSize: 1,
    totalCount: 0,
    currentPage: 1,
    details: [],
    comments: []
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
        case UPDATE_COMMENTS:
            return {
                ...state,
                comments: [...state.comments.map(comment => comment.id === action.payload.id ? {
                    ...comment,
                    title: action.payload.title
                } : comment)]
            }
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
export const updateCommentTitle = (id, title) => ({type: UPDATE_COMMENTS, payload: {id: id, title: title}});

export const getMovies = (currentPage, pageSize, sort) => async (dispatch) => {
    let url = `https://yts.mx/api/v2/list_movies.json?`
    try {

        if (currentPage && pageSize) {
            url = `https://yts.mx/api/v2/list_movies.json?limit=20&page=${currentPage}&movie_count=${pageSize}`
        }
        if (sort) {
            url = `https://yts.mx/api/v2/list_movies.json?sort_by=${sort}`
        }
        if (currentPage && pageSize && sort) {
            url = `https://yts.mx/api/v2/list_movies.json?limit=20&page=${currentPage}&movie_count=${pageSize}&sort_by=${sort}`
        }

        const response = await axios.get(url)
        dispatch(setMovies(response.data.data.movies))
        dispatch(setTotalCount(response.data.data.movie_count))
        console.log(response.data.data.movies)
    } catch (e) {
        console.log(e)
    }
}

export const searchMovie = (search) => async (dispatch) => {
        try {
            const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${search}`)
            dispatch(setMovies(response.data.data.movies))
        } catch (e) {
            console.log(e)
        }
}