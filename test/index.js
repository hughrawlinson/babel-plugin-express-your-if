import test from 'ava';
import {transform} from 'babel-core';
import ifExpress from '../src/index.js';

const applyExpressIf = code => transform(code, {
  plugins: [ifExpress]
});

test.skip(t => {
  const result = applyExpressIf("{if(true){}}");

  const expectedResult = `{
  (() => {
    return "Got Here";
  })();
}`;

  t.is(result.code,expectedResult);
});

test("Rewrites IfStatement without alternate", t => {
  const result = applyExpressIf("{if(true){true}}");

  const expectedResult = `{
  (() => {
    if (true) {
      return true;
    }
  })();
}`;

  t.is(result.code,expectedResult);
});

test("Rewrites IfStatement with alternate", t => {
  const result = applyExpressIf("{if(true){true}else{false}}");

  const expectedResult = `{
  (() => {
    if (true) {
      return true;
    } else {
      return false;
    }
  })();
}`;

  t.is(result.code,expectedResult);
});

test("Rewrites IfStatement with IfStatement Alternate", t => {
  const result = applyExpressIf("{if(true){true}else if(true){true}else{true}}");

  const expectedResult = `{
  (() => {
    if (true) {
      return true;
    } else if (true) {
      return true;
    } else {
      return true;
    }
  })();
}`;

  t.is(result.code, expectedResult);
});
