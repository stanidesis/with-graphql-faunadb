import Head from 'next/head'
import React, { Component } from 'react'
import * as api from '../graphql/api'

class Guestbook extends Component {
  componentDidMount() {
    let entries = []
    try {
      entries = this.props.initialEntries.slice(0)
    } catch (err) {
      console.log(`No entries fetched initially`)
    }
    this.setState({ entries, cursor: this.props.initialCursor })
  }

  render() {
    let entries = this.props.initialEntries
    if (this.state) {
      entries = this.state.entries
    }
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <style jsx global>{`
          body {
            margin: 0px;
            padding: 0px;
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
            <form className="main__hero__form">
              <textarea
                className="main__hero__form__textArea"
                rows="5"
                cols="50"
                name="story"
                placeholder="What is your favorite memory as a developer?"
              />
              <input
                className="main__hero__form__twitterInput"
                type="text"
                placeholder="@twitter_handle"
              />
              <input
                className="main__hero__form__submitButton"
                type="button"
                value="Submit"
              />
            </form>
          </div>
          <div className="main__entries">
            {entries.map((entry, index) => {
              const date = new Date(entry._ts / 1000)
              return (
                <>
                  <div key={entry._id} className="main__entries__entry">
                    <div className="main__entries__entry__userDetail">
                      <a
                        className="main__entries__entry__userDetail__avatar"
                        target="_blank"
                        href={`https://twitter.com/${entry.twitter_handle}/`}>
                        <img
                          className="main__entries__entry__userDetail__avatar__img"
                          src={`https://avatars.io/twitter/${entry.twitter_handle}/`}
                        />
                      </a>
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
                  <hr className="main__entries__divider" />
                </>
              )
            })}
          </div>
          <footer className="main__footer">footer stuff</footer>
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
            display: inline-flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 30px;
          }
          .main__entries__entry__userDetail {
            width: 30%;
            text-align: center;
          }
          .main__entries__entry__userDetail__avatar {
            display: inline-block;
            margin-bottom: 5px;
          }
          .main__entries__entry__userDetail__avatar__img {
            width: 25%;
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
            width: 70%;
            text-align: left;
            padding-right: 15px;
          }
          .main__entries__divider {
            display: block;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 30px;
            height: 1px;
            width: 20%;
            border-radius: 20px;
            border-color: rgba(50, 63, 203);
            opacity: 0.5;
          }
          .main__footer {
            flex-grow: 1;
            flex-shrink: 0;
            flex-basis: 95px;
            width: 100%;
            background-color: rgba(50, 63, 203);
          }
        `}</style>
      </>
    )
  }
}

Guestbook.getInitialProps = async function() {
  const initialEntries = await api.getGuestbookEntries()
  return {
    initialEntries: initialEntries.data.entries.data,
    initialCursor: initialEntries.data.entries.after
  }
}

export default Guestbook
