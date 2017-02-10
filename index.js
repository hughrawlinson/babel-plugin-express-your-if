export default function({
  types: t
}) {
  return {
    visitor: {
      IfStatement(path, state) {
        console.log(path);
        path.replaceWith(
          t.stringLiteral("Got Here")
          /* t.expressionStatement(
           *     t.callExpression(
           *       t.arrowFunctionExpression(
           *         [],
           *         t.blockStatement(
           *           t.stringLiteral("Got Here");
           *         )
           *       )
           *     )
           *   )*/
        );
      },
    }
  };
};
