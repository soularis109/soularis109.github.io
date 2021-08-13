import React from 'react';
import './film.css';
import FilmsPage from "./FilmsPage";
import {MOVIE_ROUTE} from "../../utils/consts";
import {useHistory} from "react-router-dom";


const Film = ({cover, id}) => {
    const history = useHistory();
    return (
        <div className='container'>
            <div className='col_rows'>
                    <img src={cover} className='img' onClick={() => history.push(MOVIE_ROUTE + '/' + id)}/>
            </div>
        </div>
    );
};

export default Film;