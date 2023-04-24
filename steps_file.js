const base = require("./pages/base");
const STORE_URL = "http://opencart.qatestlab.net/index.php";

module.exports = function() {
  const submitButton = { xpath: '//input[@type="submit"]'};

  return actor({
    openStore() {
      this.amOnPage(STORE_URL);
    },
    submitForm() {
      this.click(submitButton)
    }
  });
}