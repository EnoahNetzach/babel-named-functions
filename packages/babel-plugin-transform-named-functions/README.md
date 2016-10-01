# babel-plugin-transform-named-functions

Compile named functions to ES5

## Installation

```sh
$ npm install babel-plugin-transform-named-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-named-functions"]
}
```

### Via CLI

```sh
$ babel --plugins transform-named-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-named-functions"]
});
```
