import template from 'babel-template'
import * as t from 'babel-types'

const fnTemplate = template(`NAF_REF([PARAM_NAMES], (PARAMS) => BODY)`)

export const transformNamedFunction = (path, nafRef) => {
  const node = path.node
  const fnId = node.id

  node.named = false

  node.type = 'FunctionExpression'

  const container = fnTemplate({
    NAF_REF: nafRef,
    PARAM_NAMES: node.params.map(param => t.stringLiteral(Object.keys(t.getBindingIdentifiers(param))[0])),
    PARAMS: node.params,
    BODY: node.body
  }).expression

  const declar = t.variableDeclaration('let', [
    t.variableDeclarator(
      t.identifier(fnId.name),
      container
    )
  ])
  declar._blockHoist = true

  path.replaceWith(declar)
}

export const transformNamedCallExpression = (path: NodePath, nafSymbolRef: Node) => {
  const declar = path.node
  declar.arguments = [
    nafSymbolRef,
    t.objectExpression(path.node.arguments.map(arg => t.objectProperty(arg.left, arg.right)))
  ]

  path.replaceWith(declar)
}
