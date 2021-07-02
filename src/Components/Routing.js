import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageNotFound from './pageNotFound/pageNotFound';
import Header from './Header';
import Home from './Home/Home';

function Routing() {
    return(
        <div className="App">
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/login" component={PageNotFound} />
                        <Route path="/home" component={Home} />
                    </Switch>
                </div>
            </Router>
        </div>
    )    
}

export default Routing;