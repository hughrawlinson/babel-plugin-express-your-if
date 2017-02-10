# Express Your If

[![Build Status](https://travis-ci.org/hughrawlinson/babel-plugin-express-your-if.svg?branch=master)](https://travis-ci.org/hughrawlinson/babel-plugin-express-your-if)

I got really annoyed one day that if statements in Javascript couldn't be used as expressions, so I went ahead and made Babel do it.

## Example

```javascript
const type = 'artist';
console.log(if (type === 'track') { 'It\'s a track' } else if (type === 'artist') { 'It\'s an artist' } else { 'It\'s invalid' });
```
becomes
```javascript
const type = 'artist';
console.log((()=>{
  if (type === 'track') {
    return 'It\'s a track'
  } else if (type === 'artist') {
    return 'It\'s an artist'
  } else {
    return 'It\'s invalid'
  }
})());
```

## Usage

This plugin will be published as `babel-plugin-express-your-if` on npm. See the [Babel guide](http://babeljs.io/docs/setup/#installation) on how to use plugins in your `.babelrc` file.

## Why?

I don't really like nested ternary expressions, and `if` is an expression in some other languages. I'm not sure it's even a good idea to use this, I certainly won't be asking my team to use it in production. I have been looking for an excuse to learn Babel plugins for a while, and this seemed like a justifiable one.
