import React from "react";
import styled from "styled-components"
import { useState } from "react";
import { authService } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [newAccount , setNewAccount] = useState(true);
    const [error , setError] = useState("");
    const nav = useNavigate();
    const onChange = (e) => {
        const {target : {name , value}} = e;
        if(name === "email") {
            setEmail(value);
        }else if(name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async (e)=> {
        e.preventDefault();
        try{   
            let data;
            if(newAccount) {
                data = await authService.createUserWithEmailAndPassword(email , password);
                nav('/')
        } else {
            data = await authService.signInWithEmailAndPassword(email , password);
            nav('/')
        } 
        console.log(data);
    }
    catch(error) {
            setError(error.message);
        }
    }
    const toggleAccount = () => setNewAccount(prev => !prev);
    return(
        <>
        <LoginForm>
            <h1>{newAccount ? "회원가입" : "로그인"}</h1>
            <form onSubmit={onSubmit}>
                <MailInput className="IdForm" name = "email" type="email" placeholder="이메일을 입력하시오" required value={email} onChange={onChange}></MailInput><br/>
                <PassInput className="PasswordForm" name = "password" type="password" placeholder="비밀번호를 입력하시오" required value={password} onChange={onChange}></PassInput><br/>
                <SignInput className="SubmitForm" type="submit" value={newAccount ? "회원가입" : "로그인"}></SignInput><br/>
                <ToggleBtn className="toggleForm" onClick={toggleAccount}>{newAccount ? "로그인" : "회원가입"}</ToggleBtn><br/>
                {error}
            </form>
        </LoginForm>
        </>
    )
}
const LoginForm = styled.div`
    height:510px;
    margin:80px;
    padding:20px; 
    background:#eee;
    text-align:center;
`
const MailInput = styled.input `
    width:500px;
    height:30px;
    border-radius:20px;
    border:none;
    padding:10px;
    margin:10px;
    box-shadow:2px 2px 6px gray;
`
const PassInput = styled.input`
    width:500px;
    height:30px;
    border-radius:20px;
    border:none;
    padding:10px;
    margin:10px;
    box-shadow:2px 2px 6px gray;
`
const SignInput = styled.input`
    width:300px;
    height:40px;
    border-radius:20px;
    text-align:center;
    border:none;
    padding:10px;
    margin:10px;
    background-color:#fff;
    cursor:pointer;
`
const ToggleBtn = styled.span`
    cursor:pointer;
`
export default Login