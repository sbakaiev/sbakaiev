const { I } = inject()

module.exports = {
  colorControl: { xpath: '//label[text()="Color"]/../div/a[1]' },
  colorOption: { xpath: '//label[text()="Color"]/../div/ul/li[2]' },
  sizeControl: { xpath: '//label[text()="Size"]/../div/a[1]' },
  sizeOption: { xpath: '//label[text()="Size"]/../div/ul/li[2]' },
  price: { xpath: '//*[@id="content"]//div[@class="price"]/span' },
  addToCard: { xpath: '//*[@id="button-cart"]' },

  async doGetPrice() {
    const price = await I.grabTextFrom(this.price)
    const priceColor = await this.doGetOptionPrice(this.colorOption)
    const priceSize = await this.doGetOptionPrice(this.sizeOption)

    return await I.parsePrice(price)
      + await I.parsePrice(priceColor)
      + await I.parsePrice(priceSize)
  },

  async checkOptionExists(option) {
    return await tryTo(() => I.seeElement(option))
  },

  async doGetOptionPrice(option) {
    if (await this.checkOptionExists(option)) {
      return await I.grabTextFrom(option)
    }
    return '0'
  },

  async doSelectColorOption() {
    if (await this.checkOptionExists(this.colorControl)) {
      I.click(this.colorControl)
      I.click(this.colorOption)
    }
  },

  async doSelectSizeOption() {
    if (await this.checkOptionExists(this.sizeControl)) {
      I.click(this.sizeControl)
      I.click(this.sizeOption)
    }
  },
  doAddToCard() {
    I.click(this.addToCard)
    I.waitForVisible({ xpath: '//*[text()=" Success: You have added "]' }, 5)
  }
}
