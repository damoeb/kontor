import { KontorclientPage } from './app.po';

describe('kontorclient App', () => {
  let page: KontorclientPage;

  beforeEach(() => {
    page = new KontorclientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
