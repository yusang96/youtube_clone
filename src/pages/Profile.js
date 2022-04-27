import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../firebase"
import styled from "styled-components"
function Profile({userObj , refreshUser}) {
    const [newDisplayName,setDisplayName] = useState(userObj.displayName);
    const navigate = useNavigate();
    const onLogOut = () =>{ 
        authService.signOut();
        navigate('/');
    };
    const onChange = (e) => {
        const {target : {value}} = e;
        setDisplayName(value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName : newDisplayName,
            });
            refreshUser();
        }
    }
    console.log(userObj)
    return (
        <UserForm>
            <form onSubmit={onSubmit}>
                <input className="ProfileName" type="text" placeholder = "name" onChange={onChange} value={newDisplayName}></input>
                <input className = "ModifyProfile" type="submit" value="수정"/>
            </form>
            <button onClick={onLogOut}>로그아웃</button>
        </UserForm>
    )
}
const UserForm = styled.div `
    margin-top:60px;
`
export default Profile