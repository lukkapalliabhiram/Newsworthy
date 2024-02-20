# Newsworthy - A Modern News Aggregator App

**Summary:**  
Newsworthy is a dynamic news aggregation application that delivers up-to-date news from various categories to users. Developed with a focus on modern web technologies, the app utilizes Angular for its responsive frontend and ASP.NET Core for a robust backend, supported by a SQL Server database. Featuring JWT-based authentication, Newsworthy offers a secure and personalized news browsing experience. This project, initially created for academic purposes, has been migrated to a personal GitHub repository to showcase my development skills and versatility in handling both client and server-side technologies.

## Project Overview

**Frontend:** Angular 5/6/7  
**Backend:** ASP.NET Core with SQL Server  
**Authentication:** JWT for secure access

## Development Environment

**Serve Locally:** Run `ng serve` and navigate to `http://localhost:4200/`. Live reloading is enabled for active development.  
**Code Generation:** Use `ng generate component component-name` for scaffolding new components and other Angular constructs like directives, pipes, services, classes, and modules.  
**Build Production:** Execute `ng build` to compile the project. The output is stored in the `wwwroot/` directory, ready for deployment.  
**Linting:** Ensure code quality by running `npm run lint`, leveraging ESLint.  
**Unit Testing:** Run `npm run test` to execute tests with Mocha and Karma.  
**End-to-End Testing:** With `ng e2e`, Protractor runs through end-to-end tests, ensuring the app functions as expected. Make sure the app is being served via `ng serve`.

## Getting Help

For additional support with Angular CLI, run `ng help` or refer to the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Using NEWS API as a Data Source

**Trending News:** `https://newsapi.org/v2/top-headlines?country=in&apikey=YOUR_API_KEY&page=1`  
**Category-wise News:** `https://newsapi.org/v2/top-headlines?category=CATEGORY&apikey=YOUR_API_KEY&page=1`  
**Search News:** `https://newsapi.org/v2/everything?q=SEARCH_TEXT&apiKey=YOUR_API_KEY&language=en&page=1`  

> **Note:** Replace `YOUR_API_KEY` with your generated API key from [NEWSAPI](https://newsapi.org/register).

## API Key Registration

To utilize the NEWS API, register at [NEWSAPI](https://newsapi.org/register) to receive your API key.

## Estimated Development Time

The estimated effort to complete this project is 20-25 hours, making it an ideal portfolio piece that demonstrates the ability to create full-stack web applications.

---

This project represents a significant effort in web development, showcasing skills in both frontend and backend technologies. By transitioning this project from my university enterprise account to my personal account, I aim to highlight my individual contributions and growth as a developer.
