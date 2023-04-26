/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type basePage = typeof import('./pages/base.js');
type registerPage = typeof import('./pages/register.js');
type productPage = typeof import('./pages/product.js');
type checkoutPage = typeof import('./pages/checkout.js');
type Transform = import('./helpers/transform.js');
type ChaiWrapper = import('codeceptjs-chai');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, basePage: basePage, registerPage: registerPage, productPage: productPage, checkoutPage: checkoutPage }
  interface Methods extends Playwright, Transform, ChaiWrapper {}
  interface I extends ReturnType<steps_file>, WithTranslation<Transform>, WithTranslation<ChaiWrapper> {}
  namespace Translation {
    interface Actions {}
  }
}
