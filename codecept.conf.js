const {
  setHeadlessWhen,
  setCommonPlugins
} = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://opencart.qatestlab.net/index.php',
      show: true,
      browser: 'chromium'
    }
  },
  include: {
    I: './steps_file.js',
    basePage: "./pages/base.js",
    registerPage: "./pages/register.js"
  },
  name: 'sbakaiev'
}