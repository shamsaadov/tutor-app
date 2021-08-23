import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import Header from "./header/Header";
import HomePage from "../pages/HomePage";
import Footer from "./footer/Footer";
import MentorProfile from "../pages/MentorProfile";
import MentorLang from "../pages/MentorLang";
import AllMentors from "../pages/AllMentors";
import UserLoginDialog from "./header/UserLoginDialog";
import MentorLoginDialog from "./header/MentorLoginDialog";
import { useSelector } from "react-redux";
import PrivatePage from "../pages/PrivatePage";
import Typical from './Typical'

function App() {
  const token = useSelector((state) => state.application.token);
  if (token) {
    return (
      <Switch>
        <Route exact path="/">
          <Header />
          <Typical/>
          <HomePage />
          <Footer />
        </Route>

        <Route exact path="/mentor/:id/profile">
          <Header />
          <MentorProfile />
          <Footer />
        </Route>

        <Route exact path="/mentor/:id/language">
          <Header />
          <MentorLang />
          <Footer />
        </Route>

        <Route exact path="/mentors/page">
          <Header />
          <AllMentors />
          <Footer />
        </Route>

        <Route path="/private/page">
          <Header />
          <PrivatePage />
          <Footer />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route exact path="/">
          <Header />
          <Typical/>
          <HomePage />
          <Footer />
        </Route>

        <Route exact path="/mentor/login/page">
          <Header />
          <MentorLoginDialog />
          <Footer />
        </Route>

        <Route exact path="/user/login/page">
          <Header />
          <UserLoginDialog />
          <Footer />
        </Route>

        <Route exact path="/mentor/:id/profile">
          <Header />
          <MentorProfile />
          <Footer />
        </Route>

        <Route exact path="/mentor/:id/language">
          <Header />
          <MentorLang />
          <Footer />
        </Route>

        <Route exact path="/mentors/page">
          <Header />
          <AllMentors />
          <Footer />
        </Route>
      </Switch>
    );
  }
}

export default App;
