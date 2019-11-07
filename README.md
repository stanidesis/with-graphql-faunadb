# FaunaDB Graphql Starter Example -- The FaunaDB Guestbook

This simple Guestbook SPA example shows you how to use [FaunaDB's GraphQL endpoint](https://docs.fauna.com/fauna/current/api/graphql/) in your Next.js project. [[Live demo](https://with-graphql-faunadb.now.sh/)].

- [Why FaunaDB](#why-faunadb)
- [How To Use This Template](#how-to-use-this-template)
  - [Use `create-next-app`](#use-create-next-app)
  - [Download This Template Manually](#download-this-template-manually)
  - [Run Locally](#run-locally)
  - [Deploy](#deploy)

## Why FaunaDB

By importing a `.gql` or `.graphql` schema into FaunaDB ([see our sample schema file](#TODO)), FaunaDB will generate required Indexes and GraphQL resolvers for you -- hands free 👐 ([some limitations exist](https://docs.fauna.com/fauna/current/api/graphql/#limitations)).

## How To Use This Template

You can start with this template [using `create-next-app`](#use-create-next-app) or by [downloading the repository manually](#download-this-template-manually).

To use a live FaunaDB database, create one and import this example's `schema.gql` file using the FaunaDB console. Create a client secret, then paste it into `next.config.js`.

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

Make sure to leave us a guestbook message in our [live demo](https://with-graphql-faunadb.now.sh/)! 😉

### Deploy

Deploy it to the cloud with [now](https://zeit.co/now)! [Install now](https://zeit.co/download) on your development machine before proceeding.

```bash
now
```
