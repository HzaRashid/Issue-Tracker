import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { TeamContextProvider } from './contexts/TeamContexts';
import { ProjContextProvider } from './contexts/ProjectContexts';
import { IssueContextProvider } from './contexts/IssueContexts';
import { SprintContextProvider } from './contexts/SprintContexts';
import { UserContextProvider } from './contexts/UserContext';
// import { AuthProvider } from './App/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <AuthProvider>
        <UserContextProvider> 
            <ContextProvider>
                <TeamContextProvider>
                    <ProjContextProvider>
                        <SprintContextProvider>
                            <IssueContextProvider>
                                <App />
                            </IssueContextProvider>
                        </SprintContextProvider>
                    </ProjContextProvider>
                </TeamContextProvider>
            </ContextProvider>
        </UserContextProvider>
    // </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

