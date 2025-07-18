import { useNavigate, useParams } from "react-router";
import Page from "../../components/layout/page";
import { useEffect } from "react";
import { getTweet } from "./service";
import { AxiosError } from "axios";
import { useAppSelector } from "../../store";
import { getTweetDetail } from "../../store/selectors";

function TweetPage() {
  const params = useParams();
  //const [tweet, setTweet] = useState<Tweet | null>(null);
  const navigate = useNavigate();
  const tweet = useAppSelector(getTweetDetail(params.tweetId));

  useEffect(() => {
    if (!params.tweetId) {
      return;
    }
    getTweet(params.tweetId)
      .then((tweet) => setTweet(tweet))
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.status === 404) {
            navigate("/404", { replace: true });
          }
        }
      });
  }, [params.tweetId]);

  return <Page title="Tweet detail">{tweet?.content}</Page>;
}

export default TweetPage;
