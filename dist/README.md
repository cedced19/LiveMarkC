# LiveMarkC

A real time application to write with your friends in the same time.

[![Build Status](https://travis-ci.org/cedced19/LiveMarkC.svg?branch=master)](https://travis-ci.org/cedced19/LiveMarkC)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Dependencies](https://david-dm.org/cedced19/LiveMarkC.png)](https://david-dm.org/cedced19/LiveMarkC)
[![devDependencies](https://david-dm.org/cedced19/LiveMarkC/dev-status.png)](https://david-dm.org/cedced19/LiveMarkC#info=devDependencies)
[![NPM version](https://badge.fury.io/js/livemark-cli.svg)](http://badge.fury.io/js/livemark-cli)

```bash
$ npm install -g livemark-cli
$ docs
```


####How to write a text?
You can write a text at the left side with this [syntax](//github.com/cedced19/LiveMarkC/wiki).

##Options

    -h, --help                  output usage information

    -V, --version               output the version number

    -p, --port [number]          specified the port

##Demo
![](https://raw.githubusercontent.com/cedced19/LiveMarkC/master/demo.png)

##Developement

To launch in developpement:

```bash
$ npm install
$ node livemark.js
```

To launch in release:

```bash
$ npm install
$ grunt
$ cd dist/
$ node livemark.js
```

NOTE: dist/ is the dist folder.