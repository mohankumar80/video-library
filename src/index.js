import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import { AuthProvider } from "./context/auth-context/AuthProvider";
import { VideosProvider } from "./context/videos-context/videos-context";

ReactDOM.render(
  <Router >
    <AuthProvider>
      <VideosProvider>
        <App />
      </VideosProvider>
    </AuthProvider>
  </Router >
  , document.getElementById('root')
);

