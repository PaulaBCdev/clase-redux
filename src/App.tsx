import LoginPage from "./pages/auth/login-page";
import TweetsPage from "./pages/tweets/tweets-page";
import NewTweetPage from "./pages/tweets/new-tweet-page";
import { Navigate, Outlet, Route, Routes } from "react-router";
import Layout from "./components/layout/layout";
import RequireAuth from "./pages/auth/require-auth";
import TweetPage from "./pages/tweets/tweet-page";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/tweets"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<TweetsPage />} />
        <Route path=":tweetId" element={<TweetPage />} />
        <Route
          path="new"
          element={
            <RequireAuth>
              <NewTweetPage />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="/" element={<Navigate to="/tweets" />} />
      <Route path="/404" element={<div>404 | Not Found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
