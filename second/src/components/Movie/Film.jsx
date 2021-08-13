import React from 'react';

const Film = ({title,title_long,cover}) => {
    return (
        <div>
            <div>{title}</div>
            <h1>{title_long}</h1>
            <div>
                <img src={cover}/>
            </div>
        </div>
    );
};

export default Film;