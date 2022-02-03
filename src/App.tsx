import React from 'react';
import './App.css';
import {
    Routes,
    Route,
    Link
} from "react-router-dom"
import {LoginPage} from "./components/LoginPage";
import {ProfilePage} from "./components/ProfilePage";
import {PreviewCommonComponents} from "./components/PreviewCommonComponents";
import {RegistrationPage} from "./components/RegistrationPage";
import {ChangePasswordPage} from "./components/ChangePasswordPage";
import {RecoveryPasswordPage} from "./components/RecoveryPasswordPage";

function App() {
    return (<div className={'App'}>
            <header>
                <Link to="login"> Login</Link>
                <Link to="preview"> Preview</Link>
                <Link to="registration"> Registration</Link>
                <Link to="change"> Change Password</Link>
                <Link to="recovery"> Recovery Password</Link>
                <Link to="/"> ProfilePage</Link>
            </header>
            <Routes>
                <Route path='/' element={<ProfilePage/>}/>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='preview' element={<PreviewCommonComponents/>}/>
                <Route path='registration' element={<RegistrationPage/>}/>
                <Route path='change' element={<ChangePasswordPage/>}/>
                <Route path='recovery' element={<RecoveryPasswordPage/>}/>
                <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
            </Routes>
        </div>
    );
}

export default App;