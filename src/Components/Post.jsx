import React, { useState } from "react";

const initialPosts = [];

export default function Post() {
  const [posts, setPosts] = useState(initialPosts);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const text = message.trim();

    if (!text) {
      setError("Post cannot be empty");
      return;
    }

    setPosts((currentPosts) => [
      {
        id: crypto.randomUUID(),
        author: "Guest User",
        message: text,
        timestamp: new Intl.DateTimeFormat("en-US", {
          dateStyle: "short",
          timeStyle: "medium",
        }).format(new Date()),
      },
      ...currentPosts,
    ]);
    setMessage("");
    setError("");
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
    if (error && event.target.value.trim()) {
      setError("");
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        body {
          margin: 0;
          background: #fff;
          color: #1f2937;
          font-family: Arial, Helvetica, sans-serif;
        }

        .post-page {
          width: 100%;
          max-width: 1180px;
          min-height: 100vh;
          margin: 0 auto;
          padding: 32px 36px 72px;
          background: #fff;
          text-align: left;
        }

        .post-composer,
        .post-item {
          background: #fff;
          border: 1px solid #e3e5e8;
          border-radius: 8px;
        }

        .post-composer {
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: 0 2px 5px rgba(31, 41, 55, 0.06);
        }

        .post-heading {
          margin: 0 0 18px;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0;
        }

        .post-textarea {
          width: 100%;
          min-height: 94px;
          resize: vertical;
          padding: 16px 14px;
          border: 1px solid #dfe2e6;
          border-radius: 7px;
          outline: none;
          color: #374151;
          background: #fff;
          font: inherit;
          font-size: 15px;
        }

        .post-textarea::placeholder { color: #9aa3af; }

        .post-textarea:focus {
          border-color: #9aa6b2;
          box-shadow: 0 0 0 3px rgba(154, 166, 178, 0.16);
        }

        .post-actions {
          display: flex;
          justify-content: flex-end;
          min-height: 36px;
          margin-top: 10px;
        }

        .post-submit-btn {
          min-width: 72px;
          height: 36px;
          border: 0;
          border-radius: 6px;
          background: #8791a1;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
        }

        .post-submit-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .post-error {
          margin: 8px 0 -28px;
          color: #b42318;
          font-size: 13px;
        }

        .post-list {
          display: grid;
          gap: 14px;
        }

        .post-item {
          min-height: 82px;
          padding: 17px 17px 15px;
        }

        .post-item-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
        }

        .post-author {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
        }

        .post-time {
          flex: none;
          color: #98a1ad;
          font-size: 12px;
        }

        .post-message {
          margin: 12px 0 0;
          color: #485568;
          font-size: 14px;
        }

        @media (max-width: 640px) {
          .post-page { padding: 20px 16px 48px; }
          .post-composer { padding: 16px; }
          .post-item { padding: 15px; }
          .post-item-head { align-items: flex-start; }
          .post-time { font-size: 11px; }
        }
      `}</style>

      <main className="post-page">
        <section className="post-composer">
          <h1 className="post-heading">Create Post</h1>
          <form onSubmit={submit} noValidate>
            <textarea
              className="post-textarea"
              value={message}
              onChange={handleChange}
              placeholder="What’s on your mind?"
              aria-label="Post message"
            />
            {error && <div className="post-error" role="alert">{error}</div>}
            <div className="post-actions">
              <button
                className="post-submit-btn"
                type="submit"
                disabled={!message.trim()}
              >
                Post
              </button>
            </div>
          </form>
        </section>

        <section className="post-list" aria-label="Posts">
          {posts.map((post) => (
            <article className="post-item" key={post.id}>
              <div className="post-item-head">
                <h2 className="post-author">{post.author}</h2>
                <time className="post-time">{post.timestamp}</time>
              </div>
              <p className="post-message">{post.message}</p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}