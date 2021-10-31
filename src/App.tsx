import { GlobalStyles } from '@vallorisolutions/foa-design-system';
import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './routes/Navigation';
import store from './store';
import ErrorBoundary from './errorBoundary';

const App: React.FC = (): JSX.Element => {
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
