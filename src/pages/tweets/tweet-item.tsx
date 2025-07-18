import { formatDistanceToNow } from "date-fns";
import type { Tweet } from "./types";
import "./tweet-item.css";
import LikeButton from "./like-button";
import Photo from "../../components/ui/photo";

interface TweetItemProps {
  tweet: Tweet;
}

const TweetItem = ({ tweet }: TweetItemProps) => {
  const { user, updatedAt, content, likes } = tweet;
  return (
    <article className="tweet-item">
      <div>
        <Photo className="tweet-item-photo" />
      </div>
      <div className="right">
        <div className="tweet-item-header">
          <span className="tweet-item-name">{user.name}</span>
          <span className="tweet-item-username">{user.username}</span>
          <span className="tweet-item-separator">·</span>
          <time dateTime={updatedAt}>
            {formatDistanceToNow(new Date(updatedAt))}
          </time>
        </div>
        <div>
          {content}
          <div className="tweet-item-actions">
            <LikeButton
              onLike={() => console.log("Click on like")}
              likes={likes.length}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TweetItem;
