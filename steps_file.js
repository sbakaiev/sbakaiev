const base = require("./pages/base");
const STORE_URL = "http://opencart.qatestlab.net/index.php";

module.exports = function() {
  const signInButton = {xpath: "//a[text()='Sign In']"};
  const emailField = {xpath: "//*[@id='input-email']"};
  const passwordField = {xpath: "//*[@id='input-password']"};


  return actor({
    openStore() {
      this.amOnPage(STORE_URL);
    },

    login(user) {
      this.openStore();
      this.click(signInButton);
      this.fillField(emailField, user.email);
      this.fillField(passwordField, user.password);
      base.submitForm();
      this.see("My Orders");
    }
  });
}
