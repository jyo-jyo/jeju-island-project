import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';

import {getAPI, deleteAPI} from '../common/API';
import Comment from './Comment';
import InputComment from './InputComment';


const CommentList = (props) => {
    const store_id = props.store_id;
    const { status: logStatus } = useSelector((state) => state.status);
    // const [flag, setFlag] = useState(true);
    const [ comments, setComments ] = useState([]);
    
    const getComments = async() => {
        // console.log(props.userId, store_id, store_id === undefined);
        if(store_id === undefined){
            // console.log(props.userId);
            setComments(await getAPI("/api/v1/user/"+props.userId+"/comment"));
        }
        else{
            setComments(await getAPI("/api/v1/store/"+store_id+"/comment"));
            // console.log(store_id, await getAPI("/api/v1/store/"+store_id+"/comment"));
        }
    }

    useEffect(() => {
        getComments();
    },[logStatus]);

    // delete comment
    const deleteComment = (c) =>{
        deleteAPI("/api/v1/store/" + c.storeId + "/comment/" + c.id);
        const newComments = comments.filter((element) => element !== c);
        setComments(newComments);
    }

    const updateComment = (pk) => {
        const newComments = comments.filter((info, index) => index !== pk);
        // setComments(newComments);
    }

    const insertComment = () => {
        getComments();
    }

    const commentList = comments.map(
        (info, index) => 
        <div key={index}>
            <Comment comment={info} deleteComment={deleteComment} updateComment={updateComment}/>
        </div>
        );

    return(
        <div>
            {commentList}
            {(store_id !== undefined && logStatus) ? <InputComment insertComment={insertComment} store_id={store_id}/> : null}
        </div>
    );
}

export default CommentList;
