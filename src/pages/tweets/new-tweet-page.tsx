import "./new-tweet-page.css";
import Button from "../../components/ui/button";
import Photo from "../../components/ui/photo";
import Textarea from "../../components/ui/textarea";
import Page from "../../components/layout/page";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { createTweet } from "./service";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

const MAX_CHARACTERS = 140;
const MIN_CHARACTERS = 5;

function NewTweetPage() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const createdTweet = await createTweet(content);
      navigate(`/tweets/${createdTweet.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          navigate("/login", { replace: true });
        }
      }
      console.log(error);
    }
  }

  const progress = `${content.length} / ${MAX_CHARACTERS}`;
  const isDisabled = content.length < MIN_CHARACTERS;

  return (
    <Page title="What are you thinking?">
      <div className="new-tweet-page">
        <div>
          <Photo />
        </div>
        <form className="new-tweet-page-form" onSubmit={handleSubmit}>
          <Textarea
            className="new-tweet-page-textarea"
            placeholder="Hey! What's up!"
            maxLength={MAX_CHARACTERS}
            value={content}
            onChange={handleChange}
          />
          <div className="new-tweet-page-footer">
            <span className="new-tweet-page-characters">{progress}</span>
            <Button
              type="submit"
              className="new-tweet-page-submit"
              $variant="primary"
              disabled={isDisabled}
            >
              Let's go!
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
}

export default NewTweetPage;
