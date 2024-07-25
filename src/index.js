import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProvider from './providers/ThemeProvider';
import {Provider} from "react-redux";
import {store} from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
      <ThemeProvider>
          <Provider store={store}>
              <App />
          </Provider>
      </ThemeProvider>
  // </React.StrictMode>
);

reportWebVitals();
