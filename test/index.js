import test from 'ava';
import {transform} from 'babel-core';
import ifExpress from '../dist/index.js';

test(t => {
  const result = transform("{if(true){}}", {
    plugins: [ ifExpress ]
  });

  const expectedResult = `{
  (() => {
    return "Got Here";
  })();
}`;

  t.is(result.code,expectedResult);
});
