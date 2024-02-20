 import { FavouritesPage } from "./page-objects/favourites.po";
 import { LoginPage } from './page-objects/login.po';

describe('Favourites', () => {
    let favourites: FavouritesPage;
    let login: LoginPage;

    beforeEach(() => {
        login = new LoginPage();
        favourites = new FavouritesPage();
    });

    it('should contain a search form', () => {  
        favourites.navigateToFavourites();
        expect(favourites.isSearchFormPresent()).toBeTruthy("Error");
    });




});