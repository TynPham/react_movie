import React from 'react';

import {useParams} from 'react-router'
import PageHeader from '../Components/PageHeader/PageHeader';
import { category as cate } from '../api/tmdbApi';
import MovieGrid from '../Components/MovieGrid/MovieGrid';

function Catalog(props) {

    const {category} = useParams();


    return (
        <div>
            <PageHeader>
                {category === cate.movie ? 'Movies' : 'TV Series'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category} />
                </div>
            </div>
        </div>
    );
}

export default Catalog;