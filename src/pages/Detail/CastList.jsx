import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './CastList';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';

function CastList(props) {

    const {category} = useParams();

    const [casts , setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const response = await tmdbApi.credits(category , props.id)
            setCasts(response.cast.slice(0 , 5));
        }
        getCredits();
    } , [category, props.id])

    return (
        <div className='casts'>
            {casts.map((item , index) => (
                <div className="casts_item" key={index}>
                    <div className="casts_item_img" style={{backgroundImage: `url(${apiConfig.w500img(item.profile_path)})`}}></div>
                    <p className="casts_item_name">{item.name}</p>
                </div>
            ))}
        </div>
    );
}

export default CastList;