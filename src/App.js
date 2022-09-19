import Navbar from "./layout/Navbar";
import Login from "./auth/login/Login";
import SignUp from "./auth/registration/SignUp";
import { Switch, Route } from "react-router-dom";
import DataProvider from "./DataProvider";
import Home from "./home/Home";
import BlogDetails from "./blog/blogDetails/BlogDetails";
import Addblog from "./blog/addBlog/Addblog";
import UserBlog from "./blog/userBlog/UserBlog";
import UpdateBlog from "./blog/update-blog/UpdateBlog";
import Profile from "./profile/Profile";
import AuthGurd from "./AuthGurd";

function App() {
  return (
    <div>
      <DataProvider>
        <div className="App">
          <Navbar />
          <Switch>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/signup">
              <SignUp />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/blog-details/:id">
              <AuthGurd>
                <BlogDetails />
              </AuthGurd>
            </Route>

            <Route exact path="/add-blog/">
              <AuthGurd>
                <Addblog />
              </AuthGurd>
            </Route>

            <Route exact path="/user-blogs">
              <AuthGurd>
                <UserBlog />
              </AuthGurd>
            </Route>

            <Route exact path="/update-blog/:id">
              <AuthGurd>
                <UpdateBlog />
              </AuthGurd>
            </Route>

            <Route exact path="/profile">
              <AuthGurd>
                <Profile />
              </AuthGurd>
            </Route>





          </Switch>

        </div>
      </DataProvider>
    </div>

  );
}

export default App;
