const { I } = inject()

module.exports = {
  estimateShipping: { xpath: '//*/a[@href="#collapse-shipping"]' },
  shippingRate: { xpath: '//*[text()="Flat Shipping Rate:"]/../../td[2]' },
  total: { xpath: '//*[text()="Total:"]/../../td[2]' },
  cart: '//*[@id="cart"]/button',
  cartProducts: { xpath: '//*[@id="cart"]/ul/li[@class="product"]' },
  cleanCart: { xpath: '//li[@class="product"][1]//button[2]' },
  usdRate: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json',
  checkout: {
    paymentAddress: { xpath: '//*[@id="button-payment-address"]' },
    shippingAddress: { xpath: '//*[@id="button-shipping-address"]' },
    shippingMethod: { xpath: '//*[@id="button-shipping-method"]' },
    confirmCheck: { xpath: '//*[@id="agree1"]' },
    paymentMethod: { xpath: '//*[@id="button-payment-method"]' },
    submitOrder: { xpath: '//*[@id="button-confirm"]' }
  },

  doEstimateShipping() {
    I.click(this.estimateShipping)
  },

  async doGetShippingRate() {
    const price = await I.grabTextFrom(this.shippingRate)
    return I.parsePrice(price)
  },

  async doCompleteCheckoutSteps() {
    I.click(this.checkout.paymentAddress)
    I.click(this.checkout.shippingAddress)
    I.click(this.checkout.shippingMethod)
    I.click(this.checkout.confirmCheck)
    I.click(this.checkout.paymentMethod)
  },

  async doGetTotal() {
    const price = await I.grabTextFrom(this.total)
    return I.parsePrice(price)
  },

  async doCleanCart() {
    I.click(this.cart)
    let productsInCart = await I.grabNumberOfVisibleElements(this.cartProducts)

    while (productsInCart > 0) {
      I.click(this.cleanCart)
      productsInCart -= 1
      I.wait(1)
    }
  },

  doConfirmOrder() {
    I.click(this.checkout.submitOrder)
  },

  async doConvertToUah(price) {
    const response = await I.sendGetRequest(this.usdRate)
    I.seeResponseCodeIs(200)
    const usdRate = response.data[0].rate

    return price * usdRate;
  }
}
