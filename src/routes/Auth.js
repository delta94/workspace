import React, { useState } from 'react';
import { authService, firebaseInstance } from '../fbase';


const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) => {
        const {target: {name, value}} = e;
        if(name==="email"){
            setEmail(value);
        }else if(name==="password"){
            setPassword(value);
        }
    };
    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            let data;
            if(newAccount){
                // create Account
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                );
            }else{
                // login
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }catch(e){
            setError(e.message);
        }
    };
    const toggleAccount = () => setNewAccount(prev => !prev);
    const onSocialClick = async(e) => {
        const {target:{name}} = e;
        let provider;
        if(name==="google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name==="github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text"
                 name="email"
                 placeholder="Email" 
                 required 
                 value={email}
                 onChange={onChange}
                 />
                <input type="password" 
                name="password"
                placeholder="Password" 
                required
                value={password}
                onChange={onChange}
                />
                <input type="submit" 
                value={newAccount ? "Create Account" : "Login"}
                />
            </form>
    <span onClick={toggleAccount}>{newAccount ? "Login" : "Create Account"}</span>
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
            {error}
        </div>
    );
};

export default Auth;