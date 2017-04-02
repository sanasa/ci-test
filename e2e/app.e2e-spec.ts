import { CiTestPage } from './app.po';

describe('ci-test App', () => {
  let page: CiTestPage;

  beforeEach(() => {
    page = new CiTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
