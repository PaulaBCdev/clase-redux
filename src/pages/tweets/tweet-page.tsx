import { useParams } from "react-router";
import Page from "../../components/layout/page";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getTweetDetail } from "../../store/selectors";
import { tweetsDetail } from "../../store/actions";

function TweetPage() {
  const params = useParams();
  //const [tweet, setTweet] = useState<Tweet | null>(null);
  const tweet = useAppSelector(getTweetDetail(params.tweetId));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!params.tweetId) {
      return;
    }
    dispatch(tweetsDetail(params.tweetId));
  }, [params.tweetId, dispatch]);

  return <Page title="Tweet detail">{tweet?.content}</Page>;
}

export default TweetPage;
