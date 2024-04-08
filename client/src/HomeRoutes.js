import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeNav from './components/navbar/homeNav';


//react lazy

const LandingPage = React.lazy(() => import('./views/LandingPage'));
const SignUp = React.lazy(() => import('./views/SignUp'));
const SignIn = React.lazy(() => import('./views/SignIn'));

const HomeRoutes = () => {
    return (
    <>
        <HomeNav/>
        <Routes>
            <Route path = '/' element = {<LandingPage/>}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
        </Routes>
    </>
)
}

export default HomeRoutes;