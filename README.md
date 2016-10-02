# USE NAMED FUNCTIONS IN BABEL

## Declaration

as usual, notice the **§** sign ([silcrow](https://en.wikipedia.org/wiki/Section_sign))
```es6
function§ answer(l, u, e, a = 42) {
    return `The Answer to ${l}, ${u} and ${e} is ${a}.`
}
```

## Usage

normal function call
```es6
answer('Life', 'the Universe', 'Everything')
// The Answer to Life, the Universe and Everything is 42.
```

curried, named call
```es6
answer(l='Life')(u='the Universe')(e='Everything')()
// The Answer to Life, the Universe and Everything is 42.
```
the order of the calls is indifferent, when the so-curried function is
called normally (with or without arguments), the function returns.

The named call effectively function as adding default values, so a
final call with some positions undefined doesn't modify the curried
value:
```es6
const p1 = answer(u='the Universe')
const p2 = p1(l='Love')
const p3 = p2(l='Life')
const p4 = p3(e='What', a=-1)

p4(undefined, undefined, 'Everything', 42)
// The Answer to Life, the Universe and Everything is 42.
```

## Set up

 - install `npm i -D EnoahNetzach/babylon EnoahNetzach/babel-plugin-check-es2015-constants babel-plugin-transform-named-functions`
 - add `transform-named-functions` to babel plugins

## Try it

See it [here](https://github.com/EnoahNetzach/babel-try-named-functions).
