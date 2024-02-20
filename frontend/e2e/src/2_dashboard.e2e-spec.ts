import { DashboardPage } from "./page-objects/dashboard.po";
import { currentId } from "async_hooks";

describe('dashboard', () => {
    let dashboard: DashboardPage;

    beforeEach(() => {
        dashboard = new DashboardPage();
    });

    // it('should contain a search form', () => { 
    //     dashboard.navigateToDashboard();
    //     expect(dashboard.getSearchTextbox().isPresent()).toBeFalsy("Error");
    // });
    it(`should load topheadlines view by default`, () => {
        dashboard.navigateToDashboard();
        dashboard.getCurrentURL().then(url => {
            expect(url.indexOf(`/dashboard/view/trending`) > -1).toBeTruthy();
        })
    });



});