import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import * as actions from '../actions/status';
import { postAPI } from '../common/API';
import useInput from '../c_Hooks/useInput';
import './SignIn.css';

const SignIn = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, setUser] = useInput({
        username: "",
        password: ""
    });
    const {username, password} = user;

    async function signIn(){
        
        if (username === ""){
            alert("ID를 입력하십시오!!");
            return;
        }
        if (password === ""){
            alert("PASSWORD를 입력하십시오!!");
            return;
        }
        
        // BackEnd - chk -> setSession
        const jwttoken = await postAPI("/api/v1/token", user);
        if(jwttoken === false){
            alert("ID와 PASSWORD를 확인해주세요.");
            return;
        }
        sessionStorage.setItem('Authorization', jwttoken);
        dispatch(actions.signIn());
        history.goBack();
    }

    const keyPress = (e) => {
        if(e.key === "Enter")
            signIn();
    }

    return(
        <div className="sign-in-page">
            <div className="sign-in">
                <div className="sign-in-inputs">
                    <input className="user-id" name="username" value={username} placeholder="ID" onKeyPress={keyPress} onChange={setUser}></input>
                    <input className="user-password" name="password" value={password} placeholder="PASSWORD" onKeyPress={keyPress} onChange={setUser} type="password"></input>
                </div>
                <button className="sign-in-btn" onClick={signIn}>LOGIN</button>
            </div>
            <button className="find-member-btn"><Link to= '/member/find' className="find-member-btn">ID/PASSWORD찾기</Link></button>

        </div>
    );
}

export default SignIn;