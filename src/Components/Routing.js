import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageNotFound from "./pageNotFound/pageNotFound";
import Header from "./Header";
import Footer from "./Footer";
import HomeIndex from "./Home";
import JoinUs from "./Home/JoinUs/JoinUs";
import AboutUs from "./Home/AboutUs/AboutUs";
import ContactUs from "./ContactUs/contact";
import "../App.css";

function Routing() {
    return (
        <div className="App">
            <Header />
            <Router>
                <div className="content">
                    <br></br>
                    <Switch>
                        <Route path="/home" component={HomeIndex} />
                        <Route path="/about" component={AboutUs} />
                        <Route path="/join" component={JoinUs} />
                        <Route path="/contact" component={ContactUs} />
                        <Route path="/" exact={true} component={HomeIndex} />
                        <Route path="*" exact={true} component={PageNotFound} />
                    </Switch>
                    <br></br>
                </div>
            </Router>
            <Footer />
        </div>
    );
}

export default Routing;
