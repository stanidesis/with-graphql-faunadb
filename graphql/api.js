import fetch from 'isomorphic-unfetch'

const FAUNA_GRAPHQL_ENDPOINT = 'https://graphql.fauna.com/graphql'
/**
|--------------------------------------------------
| Change These for your app!
|--------------------------------------------------
*/
const FAUNA_DB_SECRET1 = 'fnADa7WFdHACFHntia-RxcTzi6oAULxsQFjcLAQQ'
const FAUNA_DB_SECRET2 = 'fnADa7PxyjACFFPqT7i7j7oXjmBorgJwWua2F8Rm'

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
  const size = 15
  return new Promise((resolve, reject) => {
    fetch(FAUNA_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FAUNA_DB_SECRET1}`,
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

export const createGuestbookEntry = async (twitterHandle, story) => {}
