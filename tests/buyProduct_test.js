Feature('buyProduct')
const output = require('codeceptjs').output;
const FilerReader = require("../helpers/fileReader");

const checkout = 'http://opencart.qatestlab.net/index.php?route=checkout/checkout'

const USER = {
    email: '192404122022@test.com',
    password: 'Temp1234%',
}

const products = new DataTable(['url']);
const productsFromFile = FilerReader.readFileContent().split(/\r\n/g);
productsFromFile.forEach(url => products.add([url]));

Before(({ I }) => {
    I.openStore()
    I.login(USER)
})

Data(products.filter(product => !product.url.includes('45')))
    .Scenario('test buying product', async ({ I, productPage, checkoutPage, current }) => {
        await checkoutPage.doCleanCart()
        I.amOnPage(current.url)
        await productPage.doSelectColorOption()
        await productPage.doSelectSizeOption()
        const price = await productPage.doGetPrice()
        await productPage.doAddToCard()
        I.amOnPage(checkout)
        if (await I.grabCurrentUrl() === 'http://opencart.qatestlab.net/index.php?route=checkout/cart') {
            output.print('This product is unavailable');
            return;
        }
        await checkoutPage.doCompleteCheckoutSteps()
        const shippingRate = await checkoutPage.doGetShippingRate()
        const totalPrice = await checkoutPage.doGetTotal()
        output.print('Total price in UAH: ' + await checkoutPage.doConvertToUah(totalPrice))
        await I.assertEqual(shippingRate + price, totalPrice)
        checkoutPage.doConfirmOrder()
        I.see('Your order has been placed!')
    })
