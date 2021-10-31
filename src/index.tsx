import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-cxv-r4y8.us.auth0.com"
            clientId="LtQza7WR2KZkVeRs4q82YQb98vznIqX0"
            redirectUri={window.location.origin}
        >
            <App />
        </Auth0Provider>
        ,
    </React.StrictMode>,
    document.getElementById('root'),
);

serviceWorkerRegistration.register();
