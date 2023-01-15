import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../firebase"
import styled from "styled-components"
import { IUserObj } from "../type/userObjProps";

function Profile({userObj , refreshUser}:IUserObj) {
    const [newDisplayName,setDisplayName] = useState(userObj?.displayName);
    const navigate = useNavigate();
    const onLogOut = () =>{ 
        authService.signOut();
        navigate('/');
    };
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {target : {value}} = e;
        setDisplayName(value);
    }
    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(userObj?.displayName !== newDisplayName) {
            await userObj?.updateProfile({
                displayName : newDisplayName,
            });
            refreshUser!();
        }
    }
    console.log(userObj)
    return (
        <UserForm>
            <h1>내 정보 관리</h1>
            <form onSubmit={onSubmit}>
                <InputName className="ProfileName" type="text" placeholder = "name" onChange={onChange} value={newDisplayName}></InputName><br/>
                <Modify className = "ModifyProfile" type="submit" value="수정"/>
            </form>
            <LogOut onClick={onLogOut}>로그아웃</LogOut>
        </UserForm>
    )
}
const UserForm = styled.div `
    height:510px;
    margin:80px;
    padding:20px; 
    background:#eee;
    text-align:center;
`
const InputName = styled.input`
    width:500px;
    height:32px;
    border-radius:20px;
    border:none;
    padding:10px;
    font-size:20px;
    text-align:center;
    margin:10px;
    box-shadow:2px 2px 6px gray;
`
const Modify = styled.input`
    width:400px;
    background:#fff;
    padding:10px;
    margin:10px;
    border-radius:20px;
    border:none;
    font-size:20px;
    box-shadow:2px 2px 6px gray;
`

const LogOut = styled.button`
    width:300px;
    background-color:red;
    font-size:20px;
    color:#fff;
    border-radius:20px;
    padding:10px;
    border:none;
`

export default Profile