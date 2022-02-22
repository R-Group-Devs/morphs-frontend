# morphs-frontend

Minting app for the **[Morphs](https://morphs.wtf)** NFT drop.

## Requirements

- [Node](https://nodejs.org/en/) >=14.0.0
- [Yarn](https://yarnpkg.com/) ^1.22.0

## Setup

Clone the repo:

```sh
$ git clone git@github.com:R-Group-Devs/morphs-frontend.git
```

## Development

Install dependencies:

```sh
$ yarn
```

You'll need an [Infura](https://infura.io/) project ID for local development. Add the following environment variables to a `.env.local` file:

```
REACT_APP_INFURA_PROJECT_ID=???
```

Run the app in development mode:

```sh
$ yarn start
```

Generate a browser-ready build artifact:

```sh
$ yarn build
```
