import { ColorModeScript } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Routes, Route, Link, BrowserRouter, Navigate } from "react-router-dom"
import {
  ChakraProvider, Box, Flex, Spacer, Button, Heading, Text
} from '@chakra-ui/react';


const HomeRoutes = React.lazy(() => import('./HomeRoutes'));
const DashboardRoutes = React.lazy(() => import('./DashboardRoutes'));

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);


root.render(
  <ChakraProvider>

      <ColorModeScript />
      <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <ToastContainer />
        <Routes>
          <Route path="/*" element={<HomeRoutes />} />
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
      </Suspense>
      </BrowserRouter>

  </ChakraProvider>
);
