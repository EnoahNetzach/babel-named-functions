import { transformNamedFunction, transformNamedCallExpression } from 'babel-helper-named-functions'

export default ({ types }) => ({
  inherits: require('babel-plugin-syntax-named-functions'),

  visitor: {
    FunctionDeclaration(path, state) {
      if (path.node.params.length === 0
        || path.node.async
        || path.node.generator
        || !path.node.named
      ) {
        return
      }

      const nafNode = state.addImport('babel-plugin-transform-named-functions/lib/naf', 'default')

      transformNamedFunction(path, nafNode)
    },

    CallExpression(path, state) {
      if (path.node.arguments.length > 0
        && path.node.arguments.every(arg => arg.type === 'AssignmentExpression')
      ) {
        const nafSymbolNode = state.addImport('babel-plugin-transform-named-functions/lib/naf', '__naf__')

        transformNamedCallExpression(path, nafSymbolNode)
      }
    },
  },
})
