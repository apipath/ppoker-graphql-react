## Project overview

PPoker is a platform that help teams estimating tasks during sprint planning by
letting users create rooms where each participant can secretly estimate, all
votes get revealed either after everyone voted or they are manually revealed
with the press of a button.

This real-time tool aims to be simple, reliable, mobile friendly and accesible
to everyone.

### Glossary

| Word    | Description               |
| :------ | :------------------------ |
| Guests  | not logged in users       |
| Clients | guests or logged in users |

### Features

- App does not require account registration
- Guests and logged in users can create rooms
- Rooms can have max 20 options
- Rooms are publicly accesible
- Rooms created by guests are ephemeral
- Rooms created by users are long-lived
- Users can edit their rooms' options
- Clients can join a room as a participant or an observer
- Voting is on real-time
- During a voting participants and observers can perform the following actions:
  - Clear votes
  - Reveal votes
- Observers cannot vote

## Tech Overview

The nature of the project is to build the app in different ways, discussing
pros/cons of solutions, trying different technologies and approaches, topics
can refer to every aspect of the app, from the selection of technologies,
libraries, how to structure the project, build tasks, adding observability,
scaling the app, etc.

The plan is to do this in stages where the first step is the clearest by now:

_"We build and deploy a simple version of the app with the traditional approach
of a SPA on the client and a REST API on the back-end"_

This project is open source, open to anyone who wants to contribute
or discuss/ask why we developed the app that way.

For the sake of simplicity and experience of the organization's developers we
will build the app in Typescript, both the client and the server.

### Proposed solution

- Diagrams:
  - Entities: User, Session, Room, Option

> TODO: complete this section

#### REST API

##### Error handling

We expose the following interface to the user:

```js
{
  error: {
    status: 200, // HTTTP Status Code
    code: "UNIQUE_ERROR_IDENTIFIER",
    description: "Dev friendly error description"
  }
}
```

The main idea of the `code` field is to identify with certainty where, in the source code, the
error was produced.

### Current state

| App       | Repo                                           | Host    |                 Live URL                 |
| :-------- | :--------------------------------------------- | :------ | :--------------------------------------: |
| React SPA | [https://github.com/apipath/ppoker-rest-react] | Netlify |            [react.apipath.io]            |
| Rest API  | [https://github.com/apipath/ppoker-rest-js]    | Heroku  | [api-path-ppoker-rest-api.herokuapp.com] |

### Next steps

- Build the GraphQL version for both the front-end and the back-end
- Build a Serverless API
- Build clients with Elm, Vue, Reason, etc.
- Build server witht Go, Kotlin, Elixir, etc.

[https://github.com/apipath/ppoker-rest-react]: https://github.com/apipath/ppoker-rest-react
[https://github.com/apipath/ppoker-rest-js]: https://github.com/apipath/ppoker-rest-js
[react.apipath.io]: https://react.apipath.io
[api-path-ppoker-rest-api.herokuapp.com]: https://api-path-ppoker-rest-api.herokuapp.com/
