import { GlobalStyles } from '@vallorisolutions/foa-design-system';
import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './routes/Navigation';
import store from './store';
import ErrorBoundary from './errorBoundary';
import { generateRequestForQuotation } from './mocks/generate';

const App: React.FC = (): JSX.Element => {
    console.log('App', generateRequestForQuotation(1));
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <GlobalStyles />
                <Navigation />
            </Provider>
        </ErrorBoundary>
    );
};

export default App;
