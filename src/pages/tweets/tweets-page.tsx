import "./tweets-page.css";
import { useEffect } from "react";
import Button from "../../components/ui/button";
import TweetItem from "./tweet-item";
import Page from "../../components/layout/page";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { tweetsLoaded } from "../../store/actions";
import { getTweets } from "../../store/selectors";

const EmptyList = () => (
  <div className="tweets-page-empty">
    <p>Be the first one!</p>
    <Button $variant="primary">Create tweet</Button>
  </div>
);

// TweetsPage va a ser un componente
function TweetsPage() {
  const dispatch = useAppDispatch(); // Aqui se puede hacer un custom hook como hemos hecho con useLoginAction (en store - hooks.ts)
  const tweets = useAppSelector(getTweets); //Aqui cogemos los tweets que mas abajo hemos mandado a Redux para poder imprimirlos por pantalla (los usamos en el return de abajo)

  useEffect(() => {
    dispatch(tweetsLoaded());
  }, [dispatch]);
  /* ESTO ES LO QUE HACIA EL useEffect ANTES DE HACER UN MIDDLEWARE EN EL ARCHIVO ACTIONS.TS ENCARGADO DE OBTENER LOS TWEETS DE LA APO Y MANDARLOS AL ESTADO GLOBAL DE REDUX:
  useEffect(() => {
    async function getTweets() {
      const tweets = await getLatestTweets();
      dispatch(tweetsLoaded(tweets)); 
    }
    getTweets();
  }, [dispatch]); */

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
