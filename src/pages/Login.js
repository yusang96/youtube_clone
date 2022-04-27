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
            <form onSubmit={onSubmit}>
                <input className="IdForm" name = "email" type="email" placeholder="E-mail" required value={email} onChange={onChange}></input>
                <input className="PasswordForm" name = "password" type="password" placeholder="Password" required value={password} onChange={onChange}></input>
                <input className="SubmitForm" type="submit" value={newAccount ? "Create Account" : "Sign in"}></input>
                {error}
                <span className="toggleForm" onClick={toggleAccount}>{newAccount ? "Log in" : "Create Account"}</span>
            </form>
        </LoginForm>
        </>
    )
}
const LoginForm = styled.div`
    margin-top:60px;
`
export default Login