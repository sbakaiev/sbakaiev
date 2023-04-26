/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type basePage = typeof import('./pages/base.js');
type registerPage = typeof import('./pages/register.js');
type productPage = typeof import('./pages/product.js');
type Transform = import('./helpers/transform_helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, basePage: basePage, registerPage: registerPage, productPage: productPage }
  interface Methods extends Playwright, Transform {}
  interface I extends ReturnType<steps_file>, WithTranslation<Transform> {}
  namespace Translation {
    interface Actions {}
  }
}
