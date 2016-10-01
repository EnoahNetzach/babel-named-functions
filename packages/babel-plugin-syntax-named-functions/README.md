# babel-plugin-syntax-named-functions

Allow parsing of named functions.

## Installation

```sh
$ npm install babel-plugin-syntax-named-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-named-functions"]
}
```

### Via CLI

```sh
$ babel --plugins syntax-named-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-named-functions"]
});
```
