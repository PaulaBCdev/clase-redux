import "./tweets-page.css";
import { getLatestTweets } from "./service";
import { useEffect } from "react";
import Button from "../../components/ui/button";
import TweetItem from "./tweet-item";
import Page from "../../components/layout/page";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { tweetsLoades } from "../../store/actions";
import { getTweets } from "../../store/selectors";

const EmptyList = () => (
  <div className="tweets-page-empty">
    <p>Be the first one!</p>
    <Button $variant="primary">Create tweet</Button>
  </div>
);

// TweetsPage va a ser un componente
function TweetsPage() {
  const dispatch = useAppDispatch();
  const tweets = useAppSelector(getTweets);

  /* 
  Opcion 1 de llamada a api
  useEffect(() => {
    getLatestTweets().then((tweets) => {
      setTweets(tweets);
    });
  }, []); */

  // Opcion 2 de llamada a api
  useEffect(() => {
    async function getTweets() {
      const tweets = await getLatestTweets();
      dispatch(tweetsLoades(tweets));
    }
    getTweets();
  }, [dispatch]);

  return (
    <Page title="What are you thinking?!">
      <div className="tweets-page">
        {tweets.length ? (
          <ul>
            {tweets.map((tweet) => (
              <li key={tweet.id}>
                <Link to={`/tweets/${tweet.id}`}>
                  <TweetItem tweet={tweet} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
}

export default TweetsPage;
