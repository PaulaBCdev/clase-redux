import "./new-tweet-page.css";
import Button from "../../components/ui/button";
import Photo from "../../components/ui/photo";
import Textarea from "../../components/ui/textarea";
import Page from "../../components/layout/page";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useAppDispatch } from "../../store";
import { tweetsCreate } from "../../store/actions";

const MAX_CHARACTERS = 140;
const MIN_CHARACTERS = 5;

function NewTweetPageForm() {
  const footerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(footerRef.current);
    // footerRef.current?.click();
    // buttonRef.current?.click();
    console.log(textareaRef.current);
    textareaRef.current?.focus();
  }, []);

  const progress = `${content.length} / ${MAX_CHARACTERS}`;
  const isDisabled = content.length < MIN_CHARACTERS;

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(tweetsCreate(content));
    /* try {
      await dispatch(tweetsCreate(content));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          navigate("/login", { replace: true });
        }
      }
    } */
  }

  return (
    <form className="new-tweet-page-form" onSubmit={handleSubmit}>
      <Textarea
        className="new-tweet-page-textarea"
        placeholder="Hey! What's up!"
        maxLength={MAX_CHARACTERS}
        // React 19: no need to use forwardRef to pass a ref to my component
        ref={textareaRef}
        value={content}
        onChange={handleChange}
      />
      <div
        ref={footerRef}
        className="new-tweet-page-footer"
        onClick={() => {
          console.log("click");
        }}
      >
        <span className="new-tweet-page-characters">{progress}</span>
        <Button
          type="submit"
          className="new-tweet-page-submit"
          $variant="primary"
          ref={buttonRef}
          disabled={isDisabled}
        >
          Let's go!
        </Button>
      </div>
    </form>
  );
}

function NewTweetPage() {
  const someObject = {};

  const someFunction = () => {
    console.log("Click");
  };

  return (
    <Page title="What are you thinking?">
      <div className="new-tweet-page">
        <div>
          <Photo />
        </div>
        <NewTweetPageForm />
      </div>
    </Page>
  );
}

export default NewTweetPage;
