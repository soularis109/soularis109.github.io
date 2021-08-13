import React, {useEffect, useState} from 'react';
import './filmsPage.css'
import {useParams} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setMoviesDetails ,addComments} from "../redux/films-reducer";
import Comments from './Comments'
import NavBar from '../NavBar/NavBar'

const FilmsPage = () => {
    const dispatch = useDispatch()
    const details = useSelector(state => state.movies.details)
    const {id} = useParams();
    const comments = useSelector(state => state.movies.comments)
    const [value, setValue] = useState({
        title: ''
    })
    useEffect(() => {
            axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
                .then(response => {
                    dispatch(setMoviesDetails(response.data.data.movie))
                    console.log(response.data.data.movie)
                })
    },[])

    if (details < 1) {
        return <h1>wait</h1>
    }
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(addComments(value))
        setValue({title: ''})
        localStorage.setItem('comments', JSON.stringify(value))

    }
    console.log(localStorage.getItem('comments'))

    return (
        <div className='container__movie'>
            <div className='col__movie'>
                <img src={details.large_cover_image} className='img__movie'/>
            </div>
            <div className='col__movie'>
                <div className='title_long'>{details.title_long}</div>
                <div className='title__movie'>{details.title}</div>
                <div className='description'>{details.description_full}</div>
                <div className='comments'>Comments</div>
                <div>
                    {comments.map(comment => <Comments key={comment.id} title={comment.title} id={comment.id}/>)}
                </div>
                <form onSubmit={onSubmit}>
                    <input placeholder='Введите сообщение' name="newTitle" value={value.title} onChange={e => setValue(e.target.value)}/>
                    <button>Добавить комментарий</button>
                </form>


            </div>
        </div>
    );
};

export default FilmsPage;