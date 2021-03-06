import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {getAPI} from '../common/API';

import Header from './Header';
import Main from '../map/Map';

import SignIn from '../member/SignIn';
import SignUp from '../member/SignUp';
import FindMember from '../member/FindMember';
import MyPage from '../member/MyPage';
import Modify from '../member/Modify';

import StoreList from '../kindstore/StoreList';
import Store from '../kindstore/Store';

import InputComment from '../comment/InputComment';

export default () => {
    const [stores, setStores] = useState([]);
    // const stores = [];

    useEffect(() => {
        const getMapInfo = async() => {
            const store_locations = await getAPI("/api/v1/store/location");
            // console.log(store_locations);
            store_locations.sort((a,b) => (a['storeId'] - b['storeId']));
            const store_infos = await getAPI("/api/v1/store");
            store_infos.sort((a,b) => (a['id'] - b['id']));
            //console.log(store_infos);

            const merge_list = [];

            for(var idx = 0; idx < store_infos.length; idx++){
                merge_list.push({...store_infos[idx], ...store_locations[idx]})
            }

            setStores(merge_list);
            //console.log(merge_list);
        }
        getMapInfo();
    }, []);

    return(
        <BrowserRouter>
            
            <Header />
            <Switch>
                
                <Route exact path='/' render={() => <Main stores={stores} />}/>

                <Route path='/store' component={Store}/>
                <Route path='/store_list' component={StoreList}/>

                <Route path='/comment' component={InputComment}/>

                <Route path='/member/sign-in' component={SignIn}/>
                <Route path='/member/sign-up' component={SignUp}/>
                <Route path='/member/find' component={FindMember}/>
                <Route path='/member/my-page' component={MyPage}/>
                <Route path='/member/modify' component={Modify}/>

            </Switch>
            
            
        </BrowserRouter>
    );

}