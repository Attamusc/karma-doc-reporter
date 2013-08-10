# karma-doc-reporter

> Doc reporter for karma.

## Installation

The easiest way is to keep `karma-doc-reporter` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-doc-reporter": "git://github.com/Attamusc/karma-doc-reporter#master"
  }
}
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    reporters: ['doc', 'progress'],
  });
};
```

You can pass list of reporters as a CLI argument too:
```bash
karma start --reporters doc,dots
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
