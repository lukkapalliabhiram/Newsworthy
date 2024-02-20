import { HeadlinesPage } from "./page-objects/headlines.po";
import { FavouritesPage } from "./page-objects/favourites.po";

describe('Top headlines page', () => {

    let headlines: HeadlinesPage;
    let favourites: FavouritesPage;

    beforeEach(() => {
        headlines = new HeadlinesPage();
        favourites = new FavouritesPage();
    });

    // it(`should add news to favourites`, () => {
    //     headlines.navigateToHeadlinesPage();
    //     headlines.getFirstNewsElementTitle().then(newsTitle =>{
    //         headlines.getFirstNewsElementButton().click();
    //         headlines.navigateToFavouritesPage();
    //         expect(favourites.getNewsElementWithTitle(newsTitle)).toBeTruthy();
    //     }); 
    // });

});