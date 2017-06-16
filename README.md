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

- Atom

- WebStorm **(author's favorite)**

- Brackets

- VSCode **(author's choice)**


### EditorConfig

Best way to align configuration in your editors

- Create a .editorconfig file
- Many editors require a plugin

## Module #3:  Package Management

### JavaScript Package Managers

Selected npm, pretty much the defacto standard now

### Security Scanning for Packages

- retire.js
- Node Security Platform **(author's choice)**
  - nsp check


## Module #4:  Development Webserver

- http-server
  - Ultra-simple
  - Single command serves up server
- live-server
  - Lightweight
  - Support live-reloading
- Express **(author's choice)**
  - Comprehensive
  - Highly configurable
    - Not just for static files
  - Production grade
    - Run it everywhere
  - Goes good with node
  - Alternatives:
    - koa
    - hapi
- budo
  - Integrates with Browserify
  - Includes hot reloading
- Webpack dev server
  - Built in to Webpack
  - Serves from memory
  - Includes hot reloading
- Browsersync
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

- localtunnel **(author's choice)**
  - Easily share work on your local machine
    - npm install localtunnel -g
    - start your app
    - lt --port 3000 --subdomain kevin
      - Creates:  http://kevin.localtunnel.me
- ngrok
  - Secure tunnel to your local machine
  - Pretty easy to share work
    - Install ngrok
    - Install authtoken
    - Start your app
    - ./ngrok http 80
  - Secure
- Surge
  - Quickly host static files to public URL
  - Setup
    - npm install -g surge
    - surge
  - Different approach
  - Hosting persists
- now
  - Quickly deploy Node.js to the cloud
  - To use
    - npm install -g now
    - Create start script
    - now
  - Hosting persists

## Module #5:  Automation



## Bibliography

The Checklist Manifesto by Atul Gawande