import LayOut from "./layout/Index";
import Messages from "./components/main/Body";
import Login from "./components/login_register/Login";
import Register from "./components/login_register/Register";
import HomeRouter from "./components/main/HomeRoute";
import ImageUpload from "./components/imaga_name-upload.js/ImageUpload";
import MobileView from "./mobile/layout/Index";
import Convos from "./mobile/views/Convos";
import Chat from "./mobile/views/Chat";
import SocketProvider from "./context/sockeHook";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { number } = useSelector((state) => state.login);

  return (
    <SocketProvider number={number}>
      <div className="App d-none d-md-block">
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" axact>
            <Register />
          </Route>
          <Route path="/upload" exact>
            <ImageUpload />
          </Route>
          <Route path="/" axact>
            <LayOut>
              <Route path="/" exact>
                <HomeRouter />
              </Route>
              <Route path="/:id">
                <Messages />
              </Route>
            </LayOut>
          </Route>
        </Switch>
      </div>
      <div className="d-block d-md-none">
        <MobileView>
          <Switch>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" axact>
              <Register />
            </Route>
            <Route path="/messages">
              <Chat />
            </Route>
            <Route path="/upload" exact>
              <ImageUpload />
            </Route>
            <Route path="/">
              <Convos />
            </Route>
          </Switch>
        </MobileView>
      </div>
    </SocketProvider>
  );
}

export default App;
