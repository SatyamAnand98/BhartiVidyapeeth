import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageNotFound from './pageNotFound/pageNotFound';
import Header from './Header';
import Footer from './Footer';
import Home from './Home/Home';
import HomeIndex from './Home';
import AboutUs from './Home/AboutUs/AboutUs';

function Routing() {
    return(
        <div className="App">
            <Header />
            <Router>
                <div>
                    <br></br>
                    <Switch>
                        <Route path="/login" component={PageNotFound} />
                        <Route path="/home" component={HomeIndex} />
                        <Route path="/contact" component={AboutUs} />
                        <Route path="/" exact={true} component={HomeIndex} />
                        <Route path="*" exact={true} component={PageNotFound} />
                    </Switch>
                    <br></br>
                </div>
            </Router>
            <Footer />
        </div>
    )    
}

export default Routing;