# STARTER API

## Features
- Express
- Sequelize (MySQL)
- Logs rotator
- Documentation
- Unit testing with Mocha
- ES6 support
- i18n

## Specs

### Dependencies
- NodeJS
- PM2
- Git
- Sequelize CLI

### Migration & seed
Run migrations
```sh
$ NODE_ENV=dev npm run migrate
$ NODE_ENV=dev npm run seed
```

### Install & start dev
```sh
$ npm install
$ npm start
```

---

# API

## Summary

- **[Introduction](#introduction)**
  * **[Verbs](#verbs)**
  * **[Status Codes](#stats-codes)**
  * **[Required Headers](#required-headers)**
  * **[Pagination](#pagination)**
  * **[Filters](#filters)**
  * **[Dates](#dates)**
  * **[Roles and Capabilities](#roles-and-capabilities)**
- **[References](#references)**

## Introduction

### Verbs
The API uses restful verbs.

|Verb|Description|
|---|---|
|GET|Select one or more items. Success returns `200` status code.|
|POST|Create a new item. Success returns `201` status code.|
|PUT|Update an item. Success returns `200` status code.|
|DELETE|Delete an item. Success returns `200` or `204` status code.|

### Status Codes
The API will respond with one of the following HTTP status codes.

|Code|Description|
|---|---|
|`200`|Success|
|`201`|Success - new resource created (POST)|
|`204`|Success - no content to return|
|`400`|Bad Request - request couldn't be parsed|
|`401`|Unauthorized - OAuth must be provided|
|`403`|Forbidden - invalid API key or unapproved app|
|`404`|Not Found - method exists, but no record found|
|`405`|Method Not Found - method doesn't exist|
|`409`|Conflict - resource already created|
|`412`|Precondition Failed - use application/json content type|
|`422`|Unprocessible Entity - validation errors|
|`500`|Server Error|

### Required Headers
You'll need to send some headers when making API calls to identify your application and set the content type to JSON.

|Header|Value|
|---|---|
|`Content-type`|`application/json`|
|`X-App-Token`|`X-APP-TOKEN-HERE`|

##### LoggedIn Headers
Methods with 🔒 **Logeddin Required** need to have the following headers to check that user is logged and have correct role (cf. **[Roles and Capabilities](#roles-and-capabilities)**) to access the resource.

|Header|Value|Exemple|
|---|---|---|
|`Authorization`|The user's token to specify which user is logged|`Authorization: Bearer 6SXO7ZLJAlhfcTP7xCRYjtsudYxHhU55`|

### Pagination
Some methods are paginated. Methods with 📄 **Pagination** will load 1 page of 10 items by default. Methods with 📄 **Pagination Optional** will load all items by default. In either case, append a query string like `?page={page}&limit={limit}` to the URL to influence the results.

|Parameter|Type|Default|Value|
|---|---|---|---|
|`page`|integer|`1`|Number of page of results to be returned.|
|`limit`|integer|`10`|Number of results to return per page.|

All paginated methods will return these HTTP headers.

|Header|Value|
|---|---|
|`X-Pagination-Page`|Current page.|
|`X-Pagination-Limit`|Items per page.|
|`X-Pagination-Page-Count`|Total number of pages.|
|`X-Pagination-Item-Count`|Total number of items.|

### Filters
Some resources methods support additional filters and will be tagged with 🎚 **Filters**. Applying these filters refines the results and helps your users to more easily discover new items. Add a query string (i.e. `?query=search%20query`) with any filters you want to use. Some filters allow multiples which can be sent as comma delimited parameters. For example, `?authors=1,2` would match the action OR adventure genre.
Note: Make sure to properly URL encode the parameters including spaces and special characters.

|Parameter|Multiples|Example|Value|
|---|---|---|---|
|**Common filters**||||

### Dates
All dates will be GMT and returned in the ISO 8601 format like `2014-09-01T09:10:11.000Z`. Adjust accordingly in your app for the user's local timezone.

### Roles and Capabilities
Each user is attached to a role that specify what he can or cannot do in the app. Here is a map of each action depend on the role :

|Capability|Admin|Commentator|Reader|
|---|---|---|---|

---

## References

Put all the docs here
