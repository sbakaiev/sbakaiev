const STORE_URL = "http://opencart.qatestlab.net/index.php";

module.exports = function() {
  return actor({
    openStore() {
      this.amOnPage(STORE_URL);
    }
  });
}