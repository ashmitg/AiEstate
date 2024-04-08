import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardNavbar from "./components/navbar/dashboardNav";

// Lazy load the main dashboard component
const MainDashboard = React.lazy(()=> import("./views/Dashboard/main"));
const ChatPage = React.lazy(()=> import("./views/Dashboard/chatPage"));
const ApiPage = React.lazy(() => import('./views/Api'));
const UserAssets = React.lazy(() => import('./views/UserAssets'));

const DashboardRoutes = () => {

  return (
      <>
      <DashboardNavbar />
      <Routes>
        <Route path="/" element={<MainDashboard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path = "/api" element = {<ApiPage/>} />
        <Route path =  "/assets" element = {<UserAssets/>}/>
      </Routes>
      </>
  );
};

export default DashboardRoutes;
