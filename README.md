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

## Bibliography

The Checklist Manifesto by Atul Gawande