import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {getAPI} from '../common/API';

import Score from './Score';



const StoreInfo = (props) => {

    const history = useHistory();
    const { name, id, telephone, address, local, category } = props.data;
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const getRating = async() => {
            console.log(await getAPI('api/v1/store/' + id + '/rating'));
            const {avarageRating} = await getAPI('api/v1/store/' + id + '/rating');
            // console.log(avarageRating);
            setRating(avarageRating);
        }
        getRating();
    }, [props]);

    const linkToStore = () => {
        history.push({
            pathname: "/store",
            state: {id: id},
        })
    }

    const linkToStoreList = (type, value) => {
        // console.log({[type]: value})
        history.push({
            pathname: "/store_list",
            state: {params: {[type]: value}},
        })
    }

    return(
        <div className="store-detail-info">
            <h1 className="store-name" onClick={linkToStore}>{name}</h1>
            <Score font="material-icons md-24" data={rating} />
            <p className="store-phone">{telephone}</p>
            <p className="store-address">{address}</p>
            <div className="tags">
                <button onClick={() => linkToStoreList("local", local)}>{local}</button>
                <button onClick={() => linkToStoreList("category", category)}>{category}</button>
            </div>
        </div>
    );
}

export default StoreInfo;