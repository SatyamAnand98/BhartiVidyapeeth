import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageNotFound from './pageNotFound/pageNotFound';
import Header from './Header';
import Footer from './Footer';
import Home from './Home/Home';

function Routing() {
    return(
        <div className="App">
            <Router>
                <div>
                    <Header />
                    <br></br>
                    <Switch>
                        <Route path="/login" component={PageNotFound} />
                        <Route path="/home" component={Home} />
                    </Switch>
                    <br></br>
                    <Footer />
                </div>
            </Router>
        </div>
    )    
}

export default Routing;