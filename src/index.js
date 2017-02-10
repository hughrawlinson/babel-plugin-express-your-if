export default function({
  types: t
}) {
  return {
    visitor: {
      IfStatement(path, state) {
        path.replaceWith(
          t.expressionStatement(
            t.callExpression(
              t.arrowFunctionExpression(
                [],
                t.blockStatement(
                  [
                    t.returnStatement(
                      t.stringLiteral("Got Here")
                    )
                  ]
                )
              ),
            [])
          )
        );
      },
    }
  };
};
