import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/home');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  =  'Angular2 & NgRedux2 & Webpack Starter assembled By Tal Gvili';
    expect(subject).toEqual(result);
  });

  it('should have counter buttons', () => {
    // Set Up
    let incrementButton = element(by.css('#incrementCounter')).isPresent();
    let redoButton = element(by.css('#redoCounter')).isPresent();
    let undoButton = element(by.css('#undoCounter')).isPresent();

    // Test
    expect(incrementButton).toBe(true);
    expect(redoButton).toBe(true);
    expect(undoButton).toBe(true);
  })
});
