# technest-test Front

## Getting Started

Once the code have been downloaded, first at all install the dependencies:
```sh
npm install
```
Then there are two checks:
- Run the tests
- Run the app

### Tests

Tests have been implemented to accounts management library, specifically for `AccountsManagementService`, `AccountsListComponent` and `AccountDetailComponent`.
For that reason _package.json_ script contains a shortcut for execute this library tests
```sh
npm run test
```

### Run the App

No comments needed, as simple as execute the following command line, and the app will start
```sh
npm run start
```

## Features

### Security

There is a simple Security library to provide an auth guard, for navigation, throught google's api.
Expiration time of the token was set in 5 min (google set it to 1 hour).
That is the reason for the "login".

### Api Lib

Library to manage all the request to the server, have been developed as generic in a first instance to allow Accounts and Orders, finally the app it is just using Accounts requests.

### Management Accounts

Main library of this test. It contains the views for show a given list or a specific account detail.

Comments: 
> Highlighting a complete row of a color overloaded the design, instead of it, I decided to add some pipes to "complicate a bit" and apply it on certain columns. 
I also hope it provides versatility.

> I made the service singleton to provide the same resources and use the same address memory of the elements listed throught the subjects.

### Technest App Lib
It contains all the config and integrates all the others.


