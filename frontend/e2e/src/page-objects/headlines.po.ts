import { browser, ElementFinder, element, by, promise, ElementArrayFinder } from "protractor";

export class HeadlinesPage {
    navigateToHeadlinesPage() { 
        return browser.get('/dashboard/view/trending');
    }
    // get current URL
    getCurrentURL() {
        return browser.getCurrentUrl();
    }

     navigateToFavouritesPage() { 
        return browser.get('/dashboard/view/favourites');
    }

    getSearchTextbox(): ElementFinder { 
        return element(by.className('searchinput'));
    }
    getSearchSubmitButton(): ElementFinder {
        return element(by.name('searchbutton'));
    }

    getTrendingLink(): ElementFinder {
        return element(by.className('trending'));
    }

    getFavouritesLink(): ElementFinder {
        return element(by.className('favourites'));
    }

    getCategoriesMenuContainer(): ElementFinder {
        return element(by.className('categories-parent'));
    }

    getCategoriesMenu(): ElementFinder {
        return element(by.className('categories-menu'));
    }

    getLogOffButton(): ElementFinder {
        return element(by.className('logoff'));
    }

    isSearchFormPresent(): promise.Promise<boolean> {
        return this.getSearchTextbox().isPresent() && this.getSearchSubmitButton().isPresent();
    }

    isTrendingLinkPresent(): promise.Promise<boolean> {
        return this.getTrendingLink().isPresent();
    }

    isFavouritesLinkPresent(): promise.Promise<boolean> {
        return this.getFavouritesLink().isPresent();
    }

    isCategoriesMenuPresent():promise.Promise<boolean>{
        return this.getCategoriesMenuContainer().isPresent() && this.getCategoriesMenu().isPresent();
    }

    isLogOffButtonPresent():promise.Promise<boolean>{
        return this.getLogOffButton().isPresent();
    }

    logOff(): promise.Promise<void>{
       return this.getLogOffButton().click();
    }

    addSearchKey(){
        return this.getSearchTextbox().sendKeys("cup");
    }

    triggerSearch(){
        return this.getSearchSubmitButton().click();
    }

    getFirstNewsElement() :ElementFinder{
        return element.all(by.tagName(`app-note`)).get(0);
    }

    getFirstNewsElementTitle(){
        return this.getFirstNewsElement().element(by.tagName(`mat-card-title`)).getText();
    }

    getFirstNewsElementButton() :ElementFinder{
        return this.getFirstNewsElement().element(by.tagName(`button`));
    }

}