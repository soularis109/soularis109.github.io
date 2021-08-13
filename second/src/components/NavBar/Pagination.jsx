import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './pages.css'
import axios from "axios";
import {setCurrentPage, setMovies} from "../redux/films-reducer";
const Pagination = ({portionSize = 3}) => {
    const dispatch = useDispatch();
    const totalCount = useSelector(state => state.movies.totalCount);
    const pageSize = useSelector(state => state.movies.pageSize);
    const currentPage = useSelector(state => state.movies.currentPage);

    const pagesCount = Math.ceil(totalCount / pageSize)
    const pages = [];

    for (let i = 0; i <= pagesCount; i++) {
        pages.push(i + 1)
    }
    let portionCount = Math.ceil(pagesCount / portionSize );
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1 )* portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    const onPages = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber))
        axios.get(`https://yts.mx/api/v2/list_movies.json?limit=10&page=${pageNumber}&movie_count=${totalCount}`)
            .then(response => {
                dispatch(setMovies(response.data.data.movies))

            })
    }
    return (

            <div>

                {portionNumber > 1 && <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>Prev</button>}

                {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p) => {return <span className={currentPage === p && 'pages'}
                    onClick={(e) => {onPages(p)}}>{p}</span>})}
                {portionCount  > portionNumber && <button onClick={() => {setPortionNumber(portionNumber + 1)}}>Next</button>}
            </div>

    );
};

export default Pagination;