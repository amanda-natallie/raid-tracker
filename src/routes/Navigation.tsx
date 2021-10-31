import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import DialogContainer from '../components/DialogContainer';
import PageLayout from '../components/PageLayout';
import Dashboard from '../Pages/Dashboard';
import LoginPage from '../Pages/Login';

const Navigation: React.FC = (): JSX.Element => {
    const idToken = localStorage.getItem('isAuth') || '';
    console.log(idToken, 'idToken');
    return (
        <Router>
            {idToken === 'true' ? (
                <>
                    <DialogContainer />
                    <div className="contacts">
                        <style>{`@media print {.contacts{display: none;}}`}</style>

                        <PageLayout>
                            <Switch>
                                <Route exact path="/">
                                    <Dashboard />
                                </Route>
                            </Switch>
                        </PageLayout>
                    </div>
                </>
            ) : (
                <Switch>
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>

                    <Redirect to="/login" />
                </Switch>
            )}
        </Router>
    );
};

export default Navigation;
