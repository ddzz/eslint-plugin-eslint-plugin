# Disallow usage of deprecated methods on rule context objects (no-deprecated-context-methods)

✔️ The `"extends": "plugin:eslint-plugin/recommended"` property in a configuration file enables this rule.

⚒️ The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#--fix) can automatically fix some of the problems reported by this rule.

This rule disallows the use of deprecated methods on rule `context` objects.

The deprecated methods are:

* `getSource`
* `getSourceLines`
* `getAllComments`
* `getNodeByRangeIndex`
* `getComments`
* `getCommentsBefore`
* `getCommentsAfter`
* `getCommentsInside`
* `getJSDocComment`
* `getFirstToken`
* `getFirstTokens`
* `getLastToken`
* `getLastTokens`
* `getTokenAfter`
* `getTokenBefore`
* `getTokenByRangeStart`
* `getTokens`
* `getTokensAfter`
* `getTokensBefore`
* `getTokensBetween`

Instead of using these methods, you should use the equivalent methods on [`SourceCode`](https://eslint.org/docs/developer-guide/working-with-rules#contextgetsourcecode), e.g. `context.getSourceCode().getText()` instead of `context.getSource()`.

## Rule Details

Examples of **incorrect** code for this rule:

```js
module.exports = {
  create(context) {
    return {
      Program(ast) {
        const firstToken = context.getFirstToken(ast);
      },
    };
  },
};
```

Examples of **correct** code for this rule:

```js
module.exports = {
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      Program(ast) {
        const firstToken = sourceCode.getFirstToken(ast);
      },
    };
  },
};
```

## When Not To Use It

If you need to support very old versions of ESLint where `SourceCode` doesn't exist, you should not enable this rule.

## Further Reading

* [`SourceCode` API](https://eslint.org/docs/developer-guide/working-with-rules#contextgetsourcecode)
