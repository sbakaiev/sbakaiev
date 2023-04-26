Feature('buyProduct')

const product = 'http://opencart.qatestlab.net/index.php?route=product/product&product_id=47'
const cart = 'http://opencart.qatestlab.net/index.php?route=checkout/cart'
const checkout = 'http://opencart.qatestlab.net/index.php?route=checkout/checkout'

const USER = {
    email: '192404122022@test.com',
    password: 'Temp1234%',
}

Scenario('test buying product', async ({ I, productPage, checkoutPage }) => {
    I.login(USER)
    await checkoutPage.doCleanCart()
    I.amOnPage(product)
    await productPage.doSelectColorOption()
    await productPage.doSelectSizeOption()
    const price = await productPage.doGetPrice()
    await productPage.doAddToCard()
    I.amOnPage(checkout)
    await checkoutPage.doCompleteCheckoutSteps()
    const shippingRate = await checkoutPage.doGetShippingRate()
    const totalPrice = await checkoutPage.doGetTotal()
    await I.assertEqual(shippingRate + price, totalPrice)
    checkoutPage.doConfirmOrder()
    I.see('Your order has been placed!')
})
