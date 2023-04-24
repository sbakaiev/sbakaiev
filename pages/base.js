const { I } = inject();

module.exports = {
  myAccountSpoiler: { xpath: '//*[@id="top-links"]/ul/li/span/span' },
  registerLink: { xpath: '//*[@id="top-links"]/ul/li/ul/li[1]/a' },

  clickMyAccountSpoiler() {
    I.click(this.myAccountSpoiler);
  },

  clickMyRegisterLink() {
    I.click(this.registerLink);
  },
}