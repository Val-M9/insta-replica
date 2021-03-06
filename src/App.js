import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import UserContext from "./context/UserContext";
import useAuthListener from "./hooks/use-auth-listener";
import Preloader from "./preloader/Preloader";

import ProtectedRoute from "./helpers/protected-route";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<Preloader />}>
          <Switch>
            <ProtectedRoute user={user} exact path={ROUTES.DASHBOARD}>
              <Dashboard />
            </ProtectedRoute>
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
