# Require rules to implement a `meta.schema` property (require-meta-schema)

✔️ The `"extends": "plugin:eslint-plugin/recommended"` property in a configuration file enables this rule.

💡 Some problems reported by this rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

Defining a schema for each rule allows eslint to validate that configuration options are passed correctly. Even when there are no options for a rule, a schema should still be defined (as an empty array) so that eslint can validate that no data is mistakenly passed to the rule.

## Rule Details

This rule requires ESLint rules to have a valid `meta.schema` property.

Examples of **incorrect** code for this rule:

```js
/* eslint eslint-plugin/require-meta-schema: error */

module.exports = {
  meta: {},
  create(context) {
    /* ... */
  },
};

module.exports = {
  meta: { schema: null },
  create(context) {
    /* ... */
  },
};

module.exports = {
  meta: { schema: [] },
  create(context) {
    const options = context.options; /* using options when schema is empty */
  },
};
```

Examples of **correct** code for this rule:

```js
/* eslint eslint-plugin/require-meta-schema: error */

module.exports = {
  meta: { schema: [] }, // ensures no options are passed to the rule
  create(context) {
    /* ... */
  },
};

module.exports = {
  meta: {
    schema: [
      {
        type: 'object',
        properties: {
          exceptRange: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    /* ... */
  },
};
```

## Options

This rule takes an optional object containing:

* `boolean` — `requireSchemaPropertyWhenOptionless` — Whether the rule should require the `meta.schema` property to be specified (with `schema: []`) for rules that have no options. Defaults to `true`.

## Further Reading

* [working-with-rules#options-schemas](https://eslint.org/docs/developer-guide/working-with-rules#options-schemas)
