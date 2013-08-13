var ANSI = {
  color_map : {
    "green" : 32,
    "red"   : 31
  },
  colorize_text : function(text, color) {
    var color_code = this.color_map[color];
    return "\u001b[" + color_code + "m" + text + "\u001b[0m";
  }
};

var DocReporter = function(baseReporterDecorator, config, emitter, logger, helper, formatError) {
  var karmaLog = logger.create('reporter.doc');

  this.started = false;
  this.finished = false;

  baseReporterDecorator(this);

  this.onRunStart = function(browsers) {
    this.started = true;
    this.start_time = (new Date()).getTime();
    this.executed_specs = 0;
    this.passed_specs = 0;
    this.executed_asserts = 0;
    this.passed_asserts = 0;
  };

  this.onSpecStart = function(spec) {
    this.executed_specs++;
  };

  this.specSuccess = this.specSkipped = this.specFailure = function(browser, result) {
    var resultText = "FAILED",
        errorMessage = '',
        passed;

    if (result.skipped) {
      return;
    }

    if (result.success) {
      this.passed_specs++;
      resultText = "PASSED";
    }
    else {
      errorMessage = '\n' + result.log.join('\n');
    }

    this.log(resultText, result.suite.join(' ') + " " + result.description + errorMessage, resultText === "FAILED" ? 'red' : 'green');
  };

  this.onRunComplete = function(browsers, results) {
    var dur = (new Date()).getTime() - this.start_time,
        total = results.success + results.failed,
        spec_str = total + (total === 1 ? " spec, " : " specs, "),
        fail_str = results.failed + (results.failed === 1 ? " failure in " : " failures in "),
        success_str = results.success + (results.success === 1 ? " assertion, " : " assertions, "),
        color = results.failed > 0 ? 'red' : 'green';

    if (total) {
      this.log(spec_str + success_str + fail_str + (dur/1000) + "s.", null, color);
    }
    else {
      this.log('---NO SPECS RUN---');
    }

    this.finished = true;
  };

  this.log = function(result, str, color) {
    var text = color !== undefined ? ANSI.colorize_text(result, color) : result;

    if (color === 'red') {
      karmaLog.error(text + (str ? " - " + str : ""));
    }
    else {
      karmaLog.info(text + (str ? " - " + str : ""));
    }
  };
};

DocReporter.$inject = ['baseReporterDecorator', 'config.junitReporter', 'emitter', 'logger',
    'helper', 'formatError'];

module.exports = {
  'reporter:doc': ['type', DocReporter]
};
