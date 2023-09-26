import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { TeamContextProvider } from './contexts/TeamContexts';
import { ProjContextProvider } from './contexts/ProjectContexts';
import { IssueContextProvider } from './contexts/IssueContexts';
import { SprintContextProvider } from './contexts/SprintContexts';
import { AuthProvider } from './App/Auth';
import  MonoCtxProvider from './contexts/MonoCtxProvider'


const root = ReactDOM.createRoot(document.getElementById('root'));  // eslint-disable-next-line
if (process.env.NODE_ENV == 'production')  {
    if (window?.__REACT_DEVTOOLS_GLOBAL_HOOK__?.inject) {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function(){}
    }
}

root.render(
    <MonoCtxProvider
    components = {[
        AuthProvider,
        ContextProvider,
        TeamContextProvider,
        ProjContextProvider,
        SprintContextProvider,
        IssueContextProvider
    ]}> 
        <App />
    </MonoCtxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

