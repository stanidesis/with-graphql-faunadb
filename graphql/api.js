import fetch from 'isomorphic-unfetch'

const FAUNA_GRAPHQL_ENDPOINT = 'https://graphql.fauna.com/graphql'
/**
|--------------------------------------------------
| Change These for your app!
|--------------------------------------------------
*/
const FAUNA_DB_SECRET = 'fnADa80hSqACFJqo-OFlKpTIEvgtCXsuCXCmWfBp'

export const getGuestbookEntries = after => {
  const query = `query Entries($size: Int, $cursor: String) {
    entries(_size: $size, _cursor: $cursor) {
      data {
        _id
        _ts
        twitter_handle
        story
      }
      after
    }
  }`
  // A magical constant, you say? Not at all...
  const size = 100
  return new Promise((resolve, reject) => {
    fetch(FAUNA_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FAUNA_DB_SECRET}`,
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: { size, after }
      })
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        resolve(data)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}

export const createGuestbookEntry = async (twitterHandle, story) => {
  const query = `mutation CreateGuestbookEntry($twitterHandle: String!, $story: String!) {
    createGuestbookEntry(data: {
      twitter_handle: $twitterHandle,
      story: $story
    }) {
      _id
      _ts
      twitter_handle
      story
    }
  }`
  return new Promise((resolve, reject) => {
    fetch(FAUNA_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FAUNA_DB_SECRET}`,
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: { twitterHandle, story }
      })
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        resolve(data)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}
