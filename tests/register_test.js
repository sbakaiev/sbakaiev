Feature('register');

const NEW_USER = {
    firstName: "Bob",
    lastName: 12345,
    email: Date.now() + '@test.com',
    phone: '+380661111111',
    password: 'qweQWE1!'
};

Scenario('register new user',  ({ I, basePage, registerPage }) => {
    I.openStore();
    basePage.clickMyAccountSpoiler();
    basePage.clickMyRegisterLink();
    registerPage.verifyRegisterPage();
    registerPage.fillNewUserForm(NEW_USER);
    registerPage.confirmPrivacy();
    I.submitForm();
    I.see('Your Account Has Been Created!')
});
