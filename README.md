# Building a JavaScript Development Environment
This is a repo for containing my notes, example code, etc. from the Building a JavaScript Development Environment course by Cory House on PluralSight

## Module #1:  Introduction

General idea is that in order to avoid missing steps, avoid re-creating things each and every time you need to do JavaScript development, you should instead build a "starter kit" that you can use over and over.

The author said he was inspired by the book The Checklist Manifesto; by the idea of professionals in many fields using checklists.  The general idea is that "...we think we can remember all the steps..." but in reality we can't or don't.  Example:  Doctors use checklists for starting a line on a patient.

## JavaScript Starter Kit

What belongs in your JavaScript Starter Kit?

- Package Management
- Bundling
- Minification
- Sourcemaps
- Transpiling
- Dynamic HTML Generation
- Centralized HTTP
- Mock API Framework
- Component Libraries
- Development Webserver
- Linting
- Automated Testing
- Continuous Integration
- Automated build
- Automated deployment
- Working example app

## Module #2:  Editors and Configuration

### Selecting a JavaScript Editor

- Strong ES2015+ support
  - Autocompletion
  - Parse ES6 imports
  - Report unused imports
  - Automated refactoring
- Framework intelligence
- Built-in terminal

### JavaScript Editors

- #### Atom

- #### WebStorm **(author's favorite)**

- #### Brackets

- #### VSCode **(author's choice)**


### EditorConfig

Best way to align configuration in your editors

- Create a .editorconfig file
- Many editors require a plugin

## Module #3:  Package Management

### JavaScript Package Managers

Selected npm, pretty much the defacto standard now

### Security Scanning for Packages

- #### retire.js

- #### Node Security Platform **(author's choice)**

  - `nsp check`


## Module #4:  Development Webserver

- #### http-server

  - Ultra-simple
  - Single command serves up server

- #### live-server

  - Lightweight
  - Support live-reloading

- #### Express **(author's choice)**

  - Comprehensive
  - Highly configurable
    - Not just for static files
  - Production grade
    - Run it everywhere
  - Goes good with node
  - Alternatives:
    - koa
    - hapi

- #### budo

  - Integrates with Browserify
  - Includes hot reloading

- #### Webpack dev server

  - Built in to Webpack
  - Serves from memory
  - Includes hot reloading

- #### Browsersync

  - Dedicated IP for sharing work on LAN
  - All interactions remain in sync
    - Across devices, etc.
  - Great for cross-device testing
    - Literally syncs across multiple browsers in real time
  - Browsersync recipes available
  - Integrates with Webpack, Express

### Express Webserver

Created srcServer.js file to configure and run Express.

Used `node .\buildScripts\srcServer.js` command to leverage our script to run Express.

### Sharing Work-in-progress

Alternatives to using traditional Cloud services such as AWS and Azure.

- #### localtunnel **(author's choice)**

  - Easily share work on your local machine
    - `npm install localtunnel -g`
    - start your app
    - `lt --port 3000 --subdomain kevin`
      - Creates:  http://kevin.localtunnel.me

- #### ngrok

  - Secure tunnel to your local machine
  - Pretty easy to share work
    - Install ngrok
    - Install authtoken
    - Start your app
    - `./ngrok http 80`
  - Secure

- #### Surge

  - Quickly host static files to public URL
  - Setup
    - `npm install -g surge`
    - `surge`
  - Different approach
  - Hosting persists

- #### now

  - Quickly deploy Node.js to the cloud
  - To use
    - `npm install -g now`
    - Create start script
    - now
  - Hosting persists

## Module #5:  Automation

- #### Grunt

  - the "original"
  - configuration over code
  - writes intermediary files between steps
  - large plugin ecosystem

- #### Gulp

  - in-memory streams; pipes
    - no files
  - fast
  - code over configuration; code-based
  - large plugin ecosystem

- #### npm Scripts **(author's choice)**

  - declared in package.json
  - leverage your OS' command line
  - directly use npm packages
  - call separate Node scripts
  - convention-based pre/post hooks
  - leverage world's largest package manager

### Why npm Scripts (over Gulp)?

- Use tools directly
- No need for separate plugins
- Simpler debugging
- Better documentation
- Easy to learn
- Simple

Author wrote interesting article on why he migrated from Gulp to npm Scripts:

[bit.ly/npmvsgulp](bit.ly/npmvsgulp)

### npm Scripts

#### package.json Changes

All of these changes are to be made in the "scripts" block near the top of the file.

- Add start:

  ```javascript
  "start":"node buildScripts/srcServer.js"
  ```

  - `npm start` to start up the local webserver
  - `npm start -s` (silent) to start up the local webserver without any output

- Add prestart:

  ```javascript
  "prestart":"node buildScripts/startMessage.js"
  ```

  - This script uses a library called Chalk to add a colored message to the console when we run npm start

- Add security-check (nsp):

  ```javascript
  "security-check": "nsp check"
  ```

  - `npm run security-check`
  - Note:  npm start, npm test are the *only* commands where you can avoid typing **run**

- Add share (localtunnel):

  ```javascript
  "share": "lt --port 3000 --subdomain kevin"
  ```

  - `npm run share`
  - This will launch `http://kevin.localtunnel.me`

- Add "open:src" and Update "start" (npm-run-all):

  ```javascript
  "start": "npm-run-all --parallel security-check open:src"
  "open:src": "node buildScripts/srcServer.js"
  ```
  - Note:  `npm-run-all` allows us to run 1-n of the scripts in parallel

- Add "localtunnel" and Update "share" (npm-run-all)

  ```javascript
  "localtunnel": "lt --port 3000 --subdomain kevin"
  "share": "npm-run-all --parallel open:src localtunnel"
  ```
  - `npm run share` now starts up our server and exposes it via localtunnel all at once!

#### Conventions:

- In  an npm script, like package.json (above), we can append the prefixes "pre" and "post" to a given script in order to run another script before (pre) or after (post)
  - Examples:  "prestart" - will get run *before* "start", "poststart" - will get run *after* "start"

## Module #6:  Transpiling

### Choosing a Transpiler

- #### Babel (author's choice)

  - Modern, standards-based JS, today; transpiles down to ES5
  - Write standardized JavaScript
  - Leverage full JS Ecosystem
  - Use experimental features earlier
  - No type definitions required
  - No data annotations required
  - ES6 imports are statically analyzable
  - Test + Lint + Babel + Great Libraries + IDE == safety

- #### TypeScript

  - Superset of JavaScript
  - Enhanced Autocompletion
  - Enhanced readability
  - Safer refactoring
  - Clearer intent
  - Additional, non-standard features

- #### Elm

  - Functional style language
  - Compiles down to JS
  - Clean Syntax
  - Immutable data structures
  - Friendly errors
  - All errors are compile-time errors
  - Interoperates with JS

### Babel

#### Configuration Styles

| .babelrc                      | package.json                  |
| ----------------------------- | ----------------------------- |
| Not npm specific              | One less file in your project |
| Easier to read since isolated |                               |
|                               |                               |

#### Plugins

| Preset                      | Approach          |
| --------------------------- | ----------------- |
| babel-preset-es2015-node    | Version Detection |
| babel-preset-latest-minimal | Feature Detection |

#### Build Script Style

| ES5                              | Transpiled                            |
| -------------------------------- | ------------------------------------- |
| No waiting for transpile; faster | Enjoy the latest features             |
| No transpiler dependency         | Consistent coding style               |
|                                  | Use the same linting rules everywhere |
|                                  | Can eventually remove transpiler      |

Change "prestart" script to use babel-node

`babel-node buildScripts/startMessage.js`

## Module #7:  Bundling

#### Why use bundling?

- CommonJS does not work in web browsers; just NodeJS
- Package project into file(s)
- Improve Node performance

#### Module Formats

- *Old Module Formats*

  - ##### IIFE (Immediately Invoked Function Expressions)

  - ##### AMD (Asynchronous Module Definition)

  - ##### CJS (CommonJS)

- ##### UMD (Universal Module Definition)

- ##### ES6 Modules (author's choice)

  - Standardized
  - Statically analyzable
    - Improved autocomplete
    - Intelligent refactoring
    - Fails fast
    - Tree shaking (dead code discovery?)
  - Easy to read
    - Named Imports
    - Default exports

#### Selecting a Bundler

- *OLD Bundler*

  - ##### Require.JS

    - First popular bundler
    - Utilizes and helped popularize AMD pattern

- ##### Browserify

  - Simple
  - The first bundler to reach mass adoption
  - Bundle npm packages for the web
  - Large plugin ecosystem
    - Linting, Transpiling, etc.

- ##### Webpack (author's choice)

  - Comprehensive
  - Bundles more than just JavaScript
  - Import CSS, Images, just like JavaScript
  - Built in hot-reloading web server

- ##### Rollup

  - Tree shaking
  - Faster loading production code
  - Quite new?
  - Great choice for library authors
  - No hot reloading and code splitting yet

- ##### JSPM

  - Runtime loader
  - Uses SystemJS; universal module loader
  - Can load modules at runtime
  - Has its own package manager
  - Can install from npm, git
  - Uses Rollup

#### Webpack

- More than just JavaScript
  - CSS, Images, Fonts, HTML
- Bundle splitting
- Hot module reloading
- Webpack 2 soon --> tree shaking coming


##### Using Webpack

1. Create a couple of basic files to use with Webpack, `index.js` and `index.css` in the src folder
   1. In index.js we do the following 
      1. use a Node package called numeral
      2. import our `index.css` file
2. Create a basic Webpack configuration file in the project root called `webpack.config.dev.js` (see project for contents)
   1. Within the configuration, we output our bundled JavaScript in a single file called `bundle.js`
3. Update Express webserver (srcServer.js) to use Webpack:

```javascript
import webpack from 'webpack';
import config from '.../webpack.config.dev'

...

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

...
```
3. Update index.html to reference `bundle.js` generated by Webpack

4. Note in browser when the application is run, bundle.js shows as the JavaScript file included by the page.  In addition, because Webpack is configured to include our stylesheet, we find the css styles we defined in index.css embedded in the bundle.js file.


#### Sourcemaps

- Maps code back to original source
- Part of our build
- Downloaded if you open developer tools; downloaded only when needed

## Module #8:  Linting

### Why Lint?

#### Enforce Consistency

- Curly brace position
- confirm / alert 
- Trailing commas
- Globals
- eval

#### Avoid Mistakes

- Extra parenthesis
- Overwriting function
- Assignment in conditional
- Missing default case in switch
- debugger / console.log

#### Linters

- ##### JSLint

  - Douglas Crockford
  - Original

- ##### JSHint

- ##### ESLint (author's choice)

  - Defacto Standard

- ##### TSLint

  - For TypeScript until their is support for it in ESLint

#### ESLint

##### Configuration Formats

- Five formats allowed
  - .eslintrc.js
  - .eslintrc.yaml
  - .eslintrc.yml
  - .eslintrc.json
  - .eslintrc
  - package.json

##### Comparing Configuration Options

| Dedicated config file | package.json  |
| --------------------- | ------------- |
| Not tied to npm       | One less file |

- `package.json` - add a new section to package.json
- Note:  the block of JSON added to the package.json file is the same block if you go the dedicated config file route.

```javascript
"eslintConfig": {
  "plugins": ["example"],
    "env": {
      "example/custom": true
    }
}
```

##### Rules

As a team go through the available linting rules and decide which ones to include.

##### Warnings or Errors (re: Rules)

| Warning                        | Error                    |
| ------------------------------ | ------------------------ |
| Can continue development       | Breaks the build         |
| Can be ignored                 | Cannot be ignored        |
| Team must agree:  Fix warnings | Team is forced to comply |

##### Plugins

##### Preset

- From scratch
- ESLint's Recommended (author's recommendation)
- Presets
  - airbnb
  - standardJS
  - XO

##### Watching files with ESLint

- eslint-loader
  - Re-lints all files upon save
  - Depends upon Webpack
- eslint-watch (author's choice)
  - ESLint wrapper that adds file watch
  - Not tied to Webpack
  - Better warning and error formatting
  - Displays clean message
  - Easily lint tests and build scripts too

##### Linting Experimental Features

- Run ESLint directly
  - Supports ES6 and ES7 natively
  - Also supports object spread 
- Babel-eslint
  - Also lints stage1-stage4 features

##### Why Lint via automated build process?

- Single place to check
- Universal configuration
- Part of continuous integration (CI)

##### Linting Plan

- Use ESLint Recommended rules
- Use `eslint-watch`
- Add lint configuration to the root of the project via `.eslintrc.json` file
- See `.eslintrc.json` for details - to override any rules (we do so in the rules section of the file)

```javascript
...
"exptends": [
  "eslint:recommended",
  "plugin:import/errors",
  "plugin:import/warnings"
]
...
"rules": {
  "no-console": 1
}
```

- Note:  To override a rule you need to add the name of the rule and a setting:  0 - Off, 1 - Warning, and 2 - Error
- Add the following to the `package.json` file so we can use ESLint via eslint-watch (esw)

```javascript
"scripts": {
  ...
  "lint": "esw webpack.config.* src buildScripts --color",
  ...
}
```

- Note:  This configuration says use our webpack configuration file and watch the src and buildScripts folders

- Note:  If you have an editor with built-in linting capability, disable it at this point so that it doesn't interfere with your specific linting setup here.

- Now, we add an additional script to package.json in order to tell eslint-watch to continuously watch our files for changes and then add the new script to our start script:

```javascript
"scripts": {
  "start": "npm-run-all --parallel security-check open:src lint:watch",
  ...
  "lint:watch": "npm run lint -- --watch",
  ...
}
```

## Module #9:  Testing and Continuous Integration 

### Testing Styles

- Unit Testing
- Integration Testing
- UI Testing

### Testing Frameworks

- #### Mocha (author's choice)

  - Most popular
  - Highly configurable
  - Large eco-system of support

- #### Jasmine

  - Popular
  - Includes assertion library

- #### Tape

  - Lean
  - Simple
  - Minimal configuration

- #### QUnit

  - Oldest; jQuery

- #### AVA

  - Runs tests in parallel
  - Only re-runs impacted tests

- #### Jest

  - Facebook
  - Popular for React developers
  - Wrapper for Jasmine
  - Code Coverage
  - JSDOM
  - Popular convention for finding test files

### Assertion Libraries

- Chai (author's choice)
- ShouldJS
- Expect

### Helper Libraries

- #### JSDOM (author's choice)

  - Simulate the browser's DOM
  - Run DOM-related tests without a browser

- #### Cheerio

  - jQuery for the server
    - Query virtual DOM using jQuery selectors

### Where To Run Tests

- In a browser
  - Karma, Testem
- In a Headless browser
  - PhantomJS
- In-memory DOM (author's choice - see above)
  - JSDOM

### Where Do Test Files Belong?

- Centralized
  - Mocha
  - Folder called "Tests"
  - Less "noise" in src folder
  - Deployment confusion
  - Inertia
- Alongside (author's choice)
  - Easy imports
  - Clear visibility
  - Convenient to open
  - No recreating folder structure
  - Easy file moves

### File Naming Convention

- filename.spec.js
- filename.test.js

### When Should Unit Tests Run?

- When you hit save
- Rapid feedback
- Facilitates TDD
- Automatic; low friction
- Increases test visibility

### Testing Plan

- Mocha Framework
- Chai Assertion Library
- JSDOM Helper Library (In-Memory DOM)
- Node to run our tests
- Place our test files alongside the actual files (using filename.spec.js or filename.test.js?)
- Tests will run everytime we save

### Continuous Integration (CI)

- Run automated build
- Run your tests
- Check your code coverage
- Deploy your code

### CI Servers

- #### Travis (author's choice for linux/mac)

  - Popular
  - Hosted Solution

- #### Appveyor (author's choice for windows)

  - Windows support
  - Hosted Solution

- #### Jenkins

  - Popular
  - Installed

- #### circleCI

- #### Semaphore

- #### SnapCI


### Travis

Added a .travis.yml file to the project in order to leverage the TravisCI platform.  Since TravisCI is integrated into Github, once I turned CI on for the project and checked in the yaml file, then the CI kicked off automatically. TravisCI uses a Linux virtual machine to perform the CI task(s).

.travis.yml - tells TravisCI to set the language to NodeJS version 6

```yaml
language: node_js
node_js:
  - "6"
```

### Appveyor

Added a appveyor.yml file to the project in order to leverage the Appveyor platform.  Since the Appveyor is integrated, although not as well as TravisCI, the configuration is a little more involved.  Once I checked in the configuration file and setup the webhook between Github and Appveyor (which was done automagically by signing into Appveyor with my Github account), the CI kicked off automatically.  Appveyor, alternatively, uses Windows VMs to perform its CI task(s).

appveyor.yml - tells Appveyor to set the language to NodeJS version 6, to install that version of NodeJS, to install all the packages by running npm install and finally to run npm test to execute the unit tests (and not to actually try to 'build' the code since its Node (JavaScript).

```yaml
environment:
  matrix:
  - nodejs_version: "6"

install:
  - ps: Install-Product node $env:nodejs_version
  - npm install
  
test_script:
  - node --version
  - npm --version
  - npm test
  
build: off
```



## Module #10:  HTML Calls

### Approaches

- #### Node

  - ##### http

  - ##### request (author's choice)

- #### Browser

  - ##### XMLHttpRequest (XHR); native JavaScript

  - ##### jQuery

  - ##### Framework-based [e.g. Angular]

  - ##### FetchAPI (author's choice)

    - WHAT working group
    - Requires polyfill in some cases
    - Limited feature set

- #### Node & Browser

  - ##### isomorphic-fetch

    - Wrapper around GitHub's implementation of fetch?

  - ##### xhr

    - Subset of request (see above)

  - ##### SuperAgent

    - Full featured
    - Plugin Ecosystem

  - ##### Axios

    - Full featured
    - Promise-based API

### Centralize API Calls

- Configure all calls
- Handle preloader logic
- Handle errors
- Single seam for mocking


### FetchAPI

- Add a new route to `srcServer.js` to simulate an available API endpoint called users

```javascript
app.get('/users', function (request, response) {
  response.json([
    { "id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bob@example.com" },
    { "id": 2, "firstName": "Tammy", "lastName": "Norton", "email": "tnorton@example.com" },
    { "id": 3, "firstName": "Tina", "lastName": "Lee", "email": "lee.tina@example.com" },
  ]);
});
```

- Verify the new "API" by hitting http://localhost:3000/users in a browser
  - To do this run `npm start` in the shell
- Create a new folder called `API` inside the `src` folder to contain our API client implementation
- `userApi.js`

```javascript
import 'whatwg-fetch';

/* eslint-disable no-console */

export function getUsers() {
  return get('users');
}

function get(url) {
  return fetch(url).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error);
}
```

- `userApi.js` code is using `fetch` module; uses promises, error handling via fetch
- `whatwg-fetch` module is a polyfil for non-modern browsers
- Repository pattern like
- Update `index.html` to accommodate user data
- Recreate`index.js` to use getUsers() from `userApi.js`

```javascript
import './index.css';
import { getUsers } from './api/userApi';

getUsers().then(result => {
  let usersBody = "";

  result.forEach(user => {
    usersBody += `<div id="row">
                   <div id="column1"><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></div>
                   <div id="id">${user.id}</div>
                   <div id="firstName">${user.firstName}</div>
                   <div id="lastName">${user.lastName}</div>
                   <div id="email">${user.email}</div>
                </div>`
    });

    global.document.getElementById('users').outerHTML = usersBody;
});
```

### Selective Polyfilling with Pollyfill.io

For example, we can use Polyfill.io to *only* polyfill FetchAPI:

```html
<script src="https://cdn.polyfill.io/v2/polyfill.js?features=fetch"></script>
```

### Mocking HTTP

- Unit Testing
- Instant Response
- Keep working when service are down
- Rapid prototyping
- avoid inter-team bottlenecks
- Work offline

#### Mocking Libraries

- ##### Nock

- ##### Static JSON

- ##### Create development webserver

  - ###### api-mock

  - ###### JSON Server

  - ###### JSON Schema Faker (author's choice)

  - ###### Browsersync or Express

#### Plan

- Declare our schema via JSON Schema Faker
- Generate Random Data
  - faker.js
  - chance.js
  - randexp.js
- Serve Data via API
  - JSON Server


#### JSON Schema Faker

In order to emulate some behavior and make the test data more robust, we can employ a mocking library.  In this case we used JSON Schema Faker to generate random test data based on a schema and then used that test data from our test page.

##### Details

1. Added functionality to `index.js` in order to make the `delete` links work next to each user

```javascript
global.document.getElementById('users').outerHTML = usersBody;

  const deleteLinks = global.document.getElementsByClassName('deleteUser');

  Array.from(deleteLinks, link => {
    link.onclick = function (event) {
      event.preventDefault();

      const element = event.target;
      deleteUser(element.attributes["data-id"].value);

      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
```

2. Next, since we don't yet have a deleteUser function, we need to modify the `userApi.js` to include a deleteUser function
   1. This new code uses the `fetch` library (see above)
   2. This new code also uses an update version of the `getBaseUrl` function from baseUrl.js

```javascript
...
const baseUrl = getBaseUrl();
...
export function deleteUser(id) {
  return del(`users/${id}`);
}
...
function del(url) {
  const request = new Request(baseUrl + url, {
    method: 'DELETE'
  });

  return fetch(request).then(onSuccess, onError);
}
...
```

```javascript
export default function getBaseUrl() {
  const inDevelopment = window.location.hostname === 'localhost';

  return inDevelopment ? 'http://localhost:3001/' : '/';
}
```

3. Now, the `getBaseUrl` function returns differently based on local vs. "Production"
   1. If the code is running locally, then in returns the JSON Server URL, `http://localhost:3001/`
4. Finally, in order to generate the fake data on the fly each time the application is started, we need to modify the `package.json` file by adding some new functions
   1. We've created a script to generate the mock data, calling `generateMockData.js`
   2. We've created a start (and prestart) for starting up JSON Server, which serves up the generated data from `db.json` via the JSON Server URL (`http://localhost:3001/users`)

```json
...
"start":"npm-run-all --parallel security-check open:src lint:watch test:watch start-mockapi",
...
"generate-mock-data": "babel-node buildScripts/generateMockData",
"prestart-mockapi": "npm run generate-mock-data",
"start-mockapi": "json-server --watch src/api/db.json --port 3001"
...
```

## Project Structure

### Demo Application

Provides examples of:

- Directory structure and file naming
- Framework usage
- Testing
- Mock API
- Automated deployment
- Codifies decisions
  - coding standards, etc.
- Interactive example of working with starter kit

### Project Structure Tips

- JavaScript belongs in a .js file
- Avoid dynamically generating JavaScript logic.  Dynamically generate JSON instead
- Consider organizing by feature (on larger projects) otherwise Organize by File Type

| Organization Type     | Examples    |
| --------------------- | ----------- |
| Organize by File Type | /components |
|                       | /data       |
|                       | /models     |
|                       | /views      |
| Organize by Feature   | /authors    |
|                       | /courses    |
|                       |             |

- Extract logic into POJO (Plain Old JavaScript objects)
  - Pure logic; no framework-specific code

## Bibliography

The Checklist Manifesto by Atul Gawande
