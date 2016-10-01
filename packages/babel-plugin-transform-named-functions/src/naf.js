export const __naf__ = Symbol('__naf__')

const positionalToNominal = (names, args) => names.reduce(
  (iteratee, name, key) => (typeof args[key] === 'undefined'
      ? iteratee
      : Object.assign(iteratee, { [name]: args[key] })
  ), {}
)

export default (names, originalFn) => (...args) => (function _naf_impl_(_cnaf_) {
  const isNaf = _cnaf_ === __naf__

  let actual
  if (isNaf) {
    actual = [...arguments].slice(1)[0]
  } else if (arguments.length > 1) {
    actual = positionalToNominal(names, [...arguments].slice(0, -1))
  }

  const next = Object.assign({}, [...arguments].slice(-1)[0], actual)

  if (!isNaf) {
    return originalFn(...names.map(name => next[name]))
  }

  return (_ncnaf_, ...nextArgs) => _naf_impl_(_ncnaf_, ...nextArgs, next)
}(...args, {}))
