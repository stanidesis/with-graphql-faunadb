# FaunaDB Graphql Starter Example -- The FaunaDB Guestbook

This simple example shows you how to use [FaunaDB's GraphQL endpoint](https://docs.fauna.com/fauna/current/api/graphql/) in your nextjs project.

- [FaunaDB Graphql Starter Example -- The FaunaDB Guestbook](#faunadb-graphql-starter-example----the-faunadb-guestbook)
  - [Why FaunaDB](#why-faunadb)
  - [How To Use This Template](#how-to-use-this-template)
    - [Use `create-next-app`](#use-create-next-app)
    - [Download This Template Manually](#download-this-template-manually)
    - [Run Locally](#run-locally)
    - [Deploy](#deploy)

## Why FaunaDB

By importing a `.gql` or `.graphql` schema into FaunaDB (sample file in [static directory](TODO)), FaunaDB will generate the required Indexes and resolvers for you -- hands free 👐.

## How To Use This Template

You can start with this template [using `create-next-app`](#use-create-next-app) or by [downloading the repository manually](#download-this-template-manually).

To switch to your database, take a look inside the `/api/graphql.js` implementation and modify the `schema.gql` file before uploading yours to FaunaDB.

### Use `create-next-app`

Download [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app) to bootstrap the example:

```
npm install -g create-next-app
create-next-app --example with-graphql-faunadb
```

### Download This Template Manually

Download the example [or clone the repo](https://github.com/zeit/next.js):

```bash
curl https://codeload.github.com/zeit/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/with-graphql-faunadb
cd with-graphql-faunadb
```

### Run Locally

Install, then run the development server:

```bash
npm install
now dev
```

Make sure to leave us a message in the guestbook! 😉

### Deploy

Deploy it to the cloud with [now](https://zeit.co/now)! [Install now](https://zeit.co/download) on your development machine before proceeding.

```bash
now
```
