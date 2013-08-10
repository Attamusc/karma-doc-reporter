# karma-spec-reporter

> Spec reporter for karma.

## Installation

The easiest way is to keep `karma-spec-reporter` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-spec-reporter": "git://github.com/Attamusc/karma-spec-reporter#master"
  }
}
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    reporters: ['progress', 'junit'],
  });
};
```

You can pass list of reporters as a CLI argument too:
```bash
karma start --reporters spec,dots
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
