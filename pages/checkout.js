const { I } = inject()
const output = require('codeceptjs').output
const Converter = require("../helpers/converter")

module.exports = {
  estimateShipping: { xpath: '//*/a[@href="#collapse-shipping"]' },
  shippingRate: { xpath: '//*[text()="Flat Shipping Rate:"]/../../td[2]' },
  total: { xpath: '//*[text()="Total:"]/../../td[2]' },
  cart: '//*[@id="cart"]/button',
  cartProducts: { xpath: '//*[@id="cart"]/ul/li[@class="product"]' },
  cleanCart: { xpath: '//li[@class="product"][1]//button[2]' },
  billing: {
    firstName: {xpath: '//*[@id="input-payment-firstname"]'},
    lastName: {xpath: '//*[@id="input-payment-lastname"]'},
    address1: {xpath: '//*[@id="input-payment-address-1"]'},
    city: {xpath: '//*[@id="input-payment-city"]'},
    postcode: {xpath: '//*[@id="input-payment-postcode"]'},
    country: {xpath: '//*[@id="input-payment-country"]'},
    state: {xpath: '//*[@id="input-payment-zone"]'},
  },
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
    await this.doFillBillingAddress()
    I.click(this.checkout.paymentAddress)
    I.click(this.checkout.shippingAddress)
    I.click(this.checkout.shippingMethod)
    I.click(this.checkout.confirmCheck)
    I.click(this.checkout.paymentMethod)
  },

  async doFillBillingAddress() {
    if(await I.grabNumberOfVisibleElements(this.billing.firstName) > 0) {
      I.fillField(this.billing.firstName, 'Tom')
      I.fillField(this.billing.lastName, 'Rid')
      I.fillField(this.billing.address1, 'street,  1')
      I.fillField(this.billing.city, 'Mykolaiv')
      I.fillField(this.billing.postcode, '54007')
      I.selectOption(this.billing.country, 'Ukraine')
      I.selectOption(this.billing.state, "Mykolayivs'ka Oblast'")
    } 
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
    const priceInUah = await Converter.convertToUah(price)

    output.print(`Total price in UAH: ${priceInUah}`)
  }
}
