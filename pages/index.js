import Head from 'next/head'
import React, { useState } from 'react'
import * as api from '../graphql/api'

const Guestbook = props => {
  let initEntries = []
  try {
    initEntries = props.initialEntries.slice(0)
  } catch (err) {
    console.log(`No initial entries`)
  }
  const [entries, setEntries] = useState(initEntries)
  const [twitterHandle, setTwitterHandle] = useState('')
  const [story, setStory] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (twitterHandle.trim().length === 0) {
      alert('Please provide a valid twitter handle :)')
      return
    }
    if (story.trim().length === 0) {
      alert('No favorite memory? This cannot be!')
      return
    }
    setSubmitting(true)
    api
      .createGuestbookEntry(twitterHandle, story)
      .then(data => {
        entries.unshift(data.data.createGuestbookEntry)
        setTwitterHandle('')
        setStory('')
        setEntries(entries)
        setSubmitting(false)
      })
      .catch(error => {
        console.log(`boo :( ${error}`)
        alert('🤷‍♀️')
        setSubmitting(false)
      })
  }

  function handleStoryChange(event) {
    setStory(event.target.value)
  }

  function handleTwitterChange(event) {
    setTwitterHandle(event.target.value.replace('@', ''))
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/static/favicon.png"
        />
      </Head>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
        fieldset {
          outline: none;
          border: none;
        }
      `}</style>
      <div className="main">
        <div className="main__hero">
          <a href="https://fauna.com" target="_blank">
            <img
              className="main__hero__banner"
              src="/static/fauna-logo-blue.png"
              height="35px"
              width="auto"
            />
          </a>
          <h1 className="main__hero__title">Guestbook</h1>
          <form className="main__hero__form" onSubmit={handleSubmit}>
            <fieldset disabled={submitting && 'disabled'}>
              <textarea
                className="main__hero__form__textArea"
                rows="5"
                cols="50"
                name="story"
                placeholder="What is your favorite memory as a developer?"
                onChange={handleStoryChange}
                value={story}
              />
              <input
                className="main__hero__form__twitterInput"
                type="text"
                placeholder="twitter handle (no '@')"
                onChange={handleTwitterChange}
                value={twitterHandle}
              />
              <input
                className="main__hero__form__submitButton"
                type="submit"
                value="Submit"
              />
            </fieldset>
          </form>
        </div>
        <div className="main__entries">
          {entries.map((entry, index, allEntries) => {
            const date = new Date(entry._ts / 1000)
            return (
              <div key={entry._id}>
                <div className="main__entries__entry">
                  <div className="main__entries__entry__userDetail">
                    <div className="main__entries__entry__userDetail__avatar">
                      <a
                        target="_blank"
                        href={`https://twitter.com/${entry.twitter_handle}/`}>
                        <img
                          className="main__entries__entry__userDetail__avatar__img"
                          src={`https://avatars.io/twitter/${entry.twitter_handle}/`}
                        />
                      </a>
                    </div>
                    <a
                      className="main__entries__entry__userDetail__biolink"
                      target="_blank"
                      href={`https://twitter.com/${entry.twitter_handle}/`}>
                      {entry.twitter_handle}
                    </a>
                    <span className="main__entries__entry__userDetail__timestamp">
                      {date.toDateString()}
                    </span>
                  </div>
                  <div className="main__entries__entry__story">
                    {entry.story}
                  </div>
                </div>
                <div className="main__entries__share">
                  <a
                    href={`http://twitter.com/share?text=${encodeURIComponent(
                      entry.story + ' @faunadb @zeithq'
                    )}&url=${encodeURIComponent(
                      'https://fauna.com'
                    )}&hashtags=graphql,nextjs
                    `}
                    target="_blank"
                    className="main__entries__share__twitterButton">
                    <img
                      src="/static/twitter_icon_black.png"
                      className="main__entries__share__twitterButton__logo1"
                    />
                    <img
                      className="main__entries__share__twitterButton__logo2"
                      src="/static/twitter_icon_blue.png"
                    />
                  </a>
                </div>
                {index < allEntries.length - 1 && (
                  <hr className="main__entries__divider" />
                )}
              </div>
            )
          })}
        </div>
        <footer className="main__footer">
          <div className="main__footer__col1">
            <a href="https://fauna.com" target="_blank">
              <img
                className="main__footer__col1__logo"
                src="/static/fauna-logo-white.png"
                height="35px"
                width="auto"
              />
            </a>
            <p className="main__footer__col1__address">
              744 Montgomery Street
              <br />
              Suite 200
              <br />
              San Francisco, CA 94111
              <br />
              <a
                href="mailto:info@fauna.com"
                className="main__footer__col1__address__url">
                info@fauna.com
              </a>
            </p>
          </div>
          <div className="main__footer__col2">
            Fauna
            <ul className="main__footer__list">
              <li>
                <a
                  className="main__footer__list__url"
                  target="_blank"
                  href="https://fauna.com/faunadb">
                  FaunaDB
                </a>
              </li>
              <li>
                <a
                  className="main__footer__list__url"
                  target="_blank"
                  href="https://fauna.com/pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a
                  className="main__footer__list__url"
                  target="_blank"
                  href="https://fauna.com/resources">
                  Resources
                </a>
              </li>
              <li>
                <a
                  className="main__footer__list__url"
                  target="_blank"
                  href="https://fauna.com/blog">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="main__footer__col3">
            About
            <ul className="main__footer__list">
              <li>
                <a
                  className="main__footer__list__url"
                  target="_blank"
                  href="https://fauna.com/team">
                  Company
                </a>
              </li>
              <li>
                <a
                  className="main__footer__list__url"
                  target="_blank"
                  href="https://fauna.com/press">
                  Press
                </a>
              </li>
              <li>
                <a
                  className="main__footer__list__url"
                  target="_blank"
                  href="https://fauna.com/careers">
                  Careers
                </a>
              </li>
              <li>
                <a
                  className="main__footer__list__url"
                  target="_blank"
                  href="http://www2.fauna.com/contact-us">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="main__footer__col4">
            Quicklinks
            <ul className="main__footer__list">
              <li>
                <a
                  className="main__footer__list__url"
                  target="_blank"
                  href="https://community-invite.fauna.com/">
                  Community Slack
                </a>
              </li>
              <li>
                <a
                  className="main__footer__list__url"
                  target="_blank"
                  href="https://support.fauna.com/">
                  Support
                </a>
              </li>
              <li>
                <a
                  className="main__footer__list__url"
                  target="_blank"
                  href="https://dashboard.fauna.com/">
                  Login
                </a>
              </li>
              <li>
                <a
                  className="main__footer__list__url"
                  target="_blank"
                  href="https://dashboard.fauna.com/accounts/register">
                  Signup
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
      <style jsx>{`
        .main {
          display: flex;
          margin-left: auto;
          margin-right: auto;
          height: 100vh;
          font-family: sans-serif, sans;
          flex-direction: column;
          align-items: center;
        }
        .main__hero {
          width: 70%;
          max-width: 700px;
          text-align: center;
          flex-basis: 30%;
        }
        .main__hero__banner {
          padding-top: 15px;
        }
        .main__hero__title {
          font-size: 300%;
          font-weight: normal;
          margin: 15px 0;
        }
        .main__hero__form {
          position: relative;
          display: block;
          margin-left: auto;
          margin-right: auto;
          text-align: left;
          width: 50%;
          margin-bottom: 60px;
        }
        .main__hero__form__textArea {
          display: block;
          width: 100%;
          margin-bottom: 20px;
          resize: none;
          padding: 5px;
          border-radius: 5px;
          border: 1.2px solid rgba(50, 63, 203, 0.5);
          transition: border 200ms ease-in-out;
          box-sizing: border-box;
          font-family: sans-serif;
        }
        .main__hero__form__textArea:hover,
        .main__hero__form__textArea:focus,
        .main__hero__form__twitterInput:hover,
        .main__hero__form__twitterInput:focus {
          outline: none !important;
          border: 1.2px solid rgba(50, 63, 203);
        }
        .main__hero__form__twitterInput {
          display: inline-block;
          width: 45%;
          padding: 5px;
          border-radius: 5px;
          border: 1.2px solid rgba(50, 63, 203, 0.5);
          transition: border 200ms ease-in-out;
        }
        .main__hero__form__submitButton {
          width: 45%;
          border-radius: 5px;
          padding: 5px;
          float: right;
          background-color: rgba(50, 63, 203);
          color: white;
          font-weight: bold;
          border: 1.2px solid rgba(50, 63, 203, 0.5);
        }
        .main__hero__form__submitButton:hover {
          cursor: pointer;
        }
        .main__entries {
          flex-grow: 0;
          flex-shrink: 10;
          flex-basis: 60%;
          overflow-y: auto;
          overflow-x: hidden;
          position: relative;
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: 56%;
          max-width: 800px;
          text-align: center;
        }
        .main__entries::-webkit-scrollbar {
          width: 2px;
        }
        .main__entries::-webkit-scrollbar-thumb {
          background: rgba(50, 63, 203, 0.5);
        }
        .main__entries__entry {
          width: 100%;
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 30px;
        }
        .main__entries__entry__userDetail {
          flex-shrink: 0;
          flex-basis: 30%;
          text-align: center;
        }
        .main__entries__entry__userDetail__avatar {
          display: inline-block;
          position: relative;
          margin-bottom: 5px;
          width: 70px;
          height: 70px;
        }
        .main__entries__entry__userDetail__avatar__img {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          border-radius: 50%;
          border: 2px solid rgba(50, 63, 203, 0.5);
          opacity: 0.75;
          transition: all 200ms ease-in-out;
        }
        .main__entries__entry__userDetail__avatar__img:hover {
          opacity: 1;
          border-color: rgba(50, 63, 203);
        }
        .main__entries__entry__userDetail__biolink {
          display: block;
          margin-bottom: 5px;
          text-decoration: none;
          color: rgba(50, 63, 203, 0.5);
          font-size: 70%;
          transition: color 200ms ease-in-out;
        }
        .main__entries__entry__userDetail__biolink:hover {
          color: rgba(50, 63, 203);
        }
        .main__entries__entry__userDetail__timestamp {
          display: block;
          font-size: 70%;
          font-weight: 200;
          color: gray;
        }
        .main__entries__entry__story {
          flex-shrink: 0;
          flex-basis: 60%;
          text-align: left;
          padding-right: 15px;
        }
        .main__entries__share {
          margin-bottom: 30px;
        }
        .main__entries__share__twitterButton {
          display: inline-block;
          width: 20px;
          height: 20px;
          position: relative;
        }
        .main__entries__share__twitterButton__logo1,
        .main__entries__share__twitterButton__logo2 {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .main__entries__share__twitterButton__logo1 {
          opacity: 0.5;
        }
        .main__entries__share__twitterButton__logo2 {
          opacity: 0;
          transition: opacity 200ms ease-in-out;
        }
        .main__entries__share__twitterButton__logo2:hover {
          opacity: 1;
        }
        .main__entries__divider {
          display: block;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 30px;
          height: 1px;
          width: 80%;
          border-radius: 20px;
          border-color: rgba(50, 63, 203);
          opacity: 0.5;
        }
        .main__footer {
          flex-grow: 1;
          flex-shrink: 0;
          flex-basis: 140px;
          width: 100%;
          background-color: rgba(50, 63, 203);
          display: flex;
          flex-direction: row;
          align-items: center;
          color: white !important;
          padding-top: 20px;
          padding-bottom: 20px;
        }
        .main__footer__col1,
        .main__footer__col2,
        .main__footer__col3,
        .main__footer__col4 {
          flex-basis: 25%;
          padding: 0 15px;
        }

        .main__footer__col1 {
          font-size: 60% !important;
        }
        .main__footer__col1__address__url {
          color: white !important;
        }
        .main__footer__list {
          list-style-type: none;
          padding: 0;
        }
        .main__footer__list__url {
          color: white;
          text-decoration: none;
          transition: color 200ms ease-in-out;
          color: rgba(255, 255, 255, 0.5);
        }
        .main__footer__list__url:hover {
          color: white;
        }
      `}</style>
    </>
  )
}

Guestbook.getInitialProps = async function() {
  const initialEntries = await api.getGuestbookEntries()
  return {
    initialEntries: initialEntries.data.entries.data.reverse()
  }
}

export default Guestbook
