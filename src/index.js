import template from 'babel-template';

const prepareConsequent = (t, node) => {
  if (t.isBlockStatement(node)) {
    if (!t.isExpressionStatement(node.body[node.body.length-1])) {
      return null;
    } else {
      return t.blockStatement(
        node.body
            .slice(0,-1)
            .concat([
              t.returnStatement(node.body[node.body.length-1].expression)
            ]));
    }
  } else if (t.isExpressionStatement(node)) {
    return t.returnStatement(node.expression);
  } else {
    return null;
  }
};

const prepareAlternate = (t, node) => {
  if (node) {
    if (node.type === "IfStatement") {
      return prepareIf(t,node);
    } else {
      const a = prepareConsequent(t,node);
      return !a ? null : a;
    }
  } else {
    return null;
  }
};

const prepareIf = (t, node) => {
  return Object.assign({
      shouldSkip: true
    },
    t.ifStatement(
      node.test,
      prepareConsequent(t,node.consequent),
      prepareAlternate(t,node.alternate))
  );
};

export default function({
  types: t
}) {
  return {
    visitor: {
      IfStatement(path, state) {
        if (!path.node.shouldSkip){
          path.replaceWith(
            template(`(()=>{BODY})()`)({
              BODY: prepareIf(t, path.node)
            })
          );
        }
      }
    }
  };
};
