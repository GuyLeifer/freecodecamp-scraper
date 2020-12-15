import './App.css';

import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Users from './components/fcc/users/Users';
import Dashboard from './components/fcc/dashboard/Dashboard';
import Challenges from './components/fcc/challenges/Challenges';
import ChallengeId from './components/fcc/challenges/components/challenges/ChallengeId';
import SubChallengeId from './components/fcc/challenges/components/subChallenges/SubChallengeId';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider } from './components/firebaseAuth/contexts/AuthContext';

// auth components
import Signup from "./components/firebaseAuth/components/Signup"
import DashBoard from "./components/firebaseAuth/components/Dashboard"
import Login from "./components/firebaseAuth/components/Login"
import PrivateRoute from "./components/firebaseAuth/components/PrivateRoute"
import ForgotPassword from "./components/firebaseAuth/components/ForgotPassword"
import UpdateProfile from "./components/firebaseAuth/components/UpdateProfile"

function App() {
  return (
    <>
    <div className="App">
      <Router>
      <AuthProvider>
          <Navbar />
          <Header />
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/users" component={Users} />
            <PrivateRoute exact path="/challenges" component={Challenges} />
            <PrivateRoute exact path="/challenges/:challenge" component={ChallengeId} />
            <PrivateRoute exact path="/challenges/:challenge/:subChallenge" component={SubChallengeId} />
            <Route exact path="/about" component={About} />
            <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "90vh" }}
            >
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/profile" component={DashBoard} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <Route path="/signup" component={Signup} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </div>
            </Container>
          </Switch>
          <Footer />
        </AuthProvider>
        </Router>
      </div>
      </>
  );
}

export default App;
