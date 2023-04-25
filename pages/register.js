const { I } = inject();

module.exports = {
  firstNameField: { xpath: '//*[@id="input-firstname"]' },
  lastNameField: { xpath: '//*[@id="input-lastname"]' },
  emailField: { xpath: '//*[@id="input-email"]' },
  phoneField: { xpath: '//*[@id="input-telephone"]' },
  passwordField: { xpath: '//*[@id="input-password"]' },
  passwordConfirmField: { xpath: '//*[@id="input-confirm"]' },
  confirmPrivacyControl: {xpath: '//*[@id="content"]/form/div/div/input[1]'},

  verifyRegisterPage() {
    I.see('Register Account');
  },
  
  verifyRegistrationSuccess() {
    I.see('Your Account Has Been Created!')
  },

  fillNewUserForm(user) {
    I.fillField(this.firstNameField, user.firstName);
    I.fillField(this.lastNameField, user.lastName);
    I.fillField(this.emailField, user.email);
    I.fillField(this.phoneField, user.phone);
    I.fillField(this.passwordField, user.password);
    I.fillField(this.passwordConfirmField, user.password);
  },
  
  confirmPrivacy() {
    I.click(this.confirmPrivacyControl);
  }
}
