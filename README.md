Open Hackathon Košice
=====================

> Static site for Open Hackathon in Košice.

## Table of Contents

  1. [Install](#install)
  1. [Usage](#usage)
  1. [Licence](#licence)

## Install
### Requirements

Node (Use NVM - Node Version Manager!!! Install instructions [here](https://github.com/creationix/nvm))

### Clone this repository

*OSX & Linux*

```bash
git clone https://github.com/marospekarik/open-hackathon.git && cd open-hackathon && rm -rf .git
```

*Windows*

```bash
git clone https://github.com/marospekarik/open-hackathon.git && cd open-hackathon && rd /s /q .git
```

### Install

Then each time you clone the repo, use:

```bash
npm install
```

This repo uses local Gulp installation, so you should be fine after install.

## Usage

### Configuration

Open `package.json`:

|Option (`directories` and `config` keys)|Type|Default
|:---------|:---------:|:----------:|
|**src**: the source folder path, that's where you write code.|String|src|
|**dist**: the destination folder path, that's where your code is compiled.|String|dist|
|**test**: the `test` folder path.|String|test|
|**verbose**: provide a more verbose output when available (useful for debugging).|Boolean|false|
|**port**: the server port.|Number|3000|
|**browsers**: the browser(s) targeted for autoprefixer (see full list of options [here](https://github.com/ai/autoprefixer#browsers))|Array|['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']|
|**prodURL**: the absolute url to use in the sitemap and for metas|String|''|
|**shareImageURL**: the absolute url of the share image for metas|String|''|
|**twitterHandle**: twitter handle for metas|String|''|
|**analyticsUA**: your google analytics UA|String|''|
|**developerURL**: your URL.|String|''|

Others keys:

* [Babel](https://babeljs.io/docs/usage/babelrc/)
* [ESLint](http://eslint.org/docs/user-guide/configuring)
* [stylelint](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md)

### Tasks

#### Launch it

This is the default task.

```bash
npm start
```
All the magic begins here:

* process `.html` files
* process `.scss`, `.less` or `.styl` files
* process `.js` or `.coffee` files
* create a server with BrowserSync and serve `dist` folder
* watch changes in source folder
* reload on changes in source folder

Same as running `npm run dev`.

---
Note: if you just want to build the project and serve it, run `npm run build` then `npm run serve`.


#### Make changes

 * Write your markup in `src` folder and in `src/partials`. Include your partials with `<!-- @include partials/filename.html -->`
 * Add some or edit `scss` styles to `src/styles` (remember.
 * Add some or edit `.js` scripts to `src/scripts`.
 * Add images in the - wait for it - `images` folder.
 * Generate a spritesheet with corresponding mixins (located in `styles/_sprite{.scss,.less,.styl}`) by adding `.png` files into `images/sprite` folder and retina version with `@2x` suffix.

#### Build

When you are happy with your changes, run:

```bash
npm run build
```

* Replace build tags with `.min` files, generates these minified files in `dist` folder (with optimization tasks)
* Add copyright headers and generate a `sitemap.xml`file

#### Tests tasks

Quick tests and stats with:

```bash
# w3c validation
npm run test-markup

# mocha tests (written in test folder)
npm run test-scripts

# PageSpeed Insights reporter for mobile and desktop
> (need deploy website first and set "prodURL": "http://hackathon.eastcubator.sk")
npm run test-psi
```

#### Clean it

Clean dist dir (except static folder) and clear all caches (sass cache, gulp cache)

```bash
npm run clean
```

## Licence

MIT
