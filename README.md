<h1 align="center">MarsFood 🍔</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img alt="Heroku CI" src="https://img.shields.io/badge/Heroku-CI_%E2%9C%93-success?labelColor=7c5e9e" />
  <a href="https://pastebin.com/gYMtjdTZ" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Food Delivery Application 

<p>
MarsFood is a food ordering webapp where consumers can register, browse through the food gallery, order food, review food and track their order history. MarsFood also enables restaurants to take their business online by uploading their dishes and keeping a record of their previous orders.
</p>

<div align="center" width="100%">
    <a href="https://marsfood.herokuapp.com">
        <img src="https://res.cloudinary.com/dw6xcovsv/image/upload/v1666698313/userdata/Screenshots/marsfood-branding-with-logo_gdi1tl.png" width=256/>
    </a>
</div>

<br>

---

## Table of Content
- [Table of Content](#table-of-content)
- [Screenshots](#screenshots)
- [Hosted URL](#hosted-url)
- [Features](#features)
  - [**Frontend-Features**](#frontend-features)
  - [**Backend-Features**](#-backend-features)
- [Technologies](#technologies)
  - [**Primary Tech Stack**](#primary-tech-stack)
  - [**node_modules**](#node_modules)
  - [**Other technologies/services**](#other-technologiesservices)
- [How to setup a local environment?](#how-to-setup-a-local-environment)
- [Team of developers](#team-of-developers)

---

<a name="screenshots"></a>
## Screenshots

[Click here to view screenshots](https://bit.ly/marsfood-screenshots)

<a name="url"></a>
## Hosted URL


<p>


Click the badge or open the link
</p>

<a href="https://marsfood.herokuapp.com">
    <img src="https://img.shields.io/badge/Marsfood-red" />
</a>

https://marsfood.herokuapp.com

<a name="feature"></a>
## Features
---

### **Frontend-Features**
***• for consumers***
  - Login/Signup page
    >There are two seperate pages for user login and user signup. The pages follows a color scheme which represents marsfood's brand identity

- Homepage of the website
    > The homepage of the website contains the most popular restaurants on our website, the most popular dishes and also all the dishes uploaded on the website. The page also has indicators on all dishes to show if they are veg or non veg. The homepage also has a filter to display either dishes or restaurants.

- Dashboard
    > The user has their own dashboard where they can change their password if they desire to do so. They also have a record of their previous orders if they ever wish to look back or re order one of their past ordered dishes.

- Pages for dishes and restaurants
    > All the dishes and restaurants have their own unique page. The dish page also shows other dishes by the restaurant thus making at attempt at upselling. The dish page adapts it's color theme according to the image of the dish making sure the images appear vibrat and poppy. 
    Eg:
    <p float='left'>
      <img src="https://res.cloudinary.com/dw6xcovsv/image/upload/v1666705907/userdata/Screenshots/Screenshot_20221025_071732_fjatzi.png" width=500>  
      <img src="https://res.cloudinary.com/dw6xcovsv/image/upload/v1666705908/userdata/Screenshots/Screenshot_20221025_072130_gni3wd.png" width=500>
    </p>

- Search Page
    > The website has a search page which displays the search results almost instantly as soon as the user types in a query. This is done without reloading the page and without preloading the data, thus saving the user's and the server's bandwidth.

- Cart
    > The user can see all the items they have added to their cart on this page. They can also change the quantity of the particular items and also remove them if the user so desires. The page also comes with the option to checkout.
    
- Dark Mode
    > Dark mode has also been implemented which can be toggled at the press of a button and it acts site-wide


***• for restaurants***
- Login/Signup page
    > There is one page for the restaurants to be able to login and signup from. The page also encourages the restaurants to signup by displaying the current stats of the site and by having a message trying to upsell to restaurants.

- Dashboard
    > The restaurants have their own dashboards where they can change their password, look at the dishes which they are currently selling and delete them if they wish to do so.

- Orders
    > This page tells the restaurants about the orders which they have to fulfil and the orders which they have successfully completed in the past.

- New dish
    > There exists a seperate page where the restaurants can upload new dishes to the website. They can also upload the image for the dish and also specify if the dish is veg or non veg.


***• misc. features***
- Help page
    > There exists a help page which is supposed to help consumers and restaurants navigate around the website.

- Confirmation page
    > Whenver an order has been confirmed the user is redirected to this page to show that the order has been successfully placed.

- Dark mode
    >A toggle button is added floating on the bottom left which toggles light/dark mode across the website

---
### **• Backend-Features**

- The website has a home grown authentication system which stores the users in the postgresql powered database and the passwords are **sh256 encrypted** to ensure the user's privacy even if somehow the database were to malfunction.
- The api endpoints are secured by api keys and access is also allowed to authenticated requests _i.e: if the incoming request is coming from a browser where the website has been logged into by a registered user or restaurnant_. Api keys allow access to CLI commands or custom front end development and also allows other developers to implement marsfood into their programs without causing a security flaw to marsfood. Any developer may request an api key with custom quotes and max limits by contacting ***[marsfood.online@gmail.com](mailto:marsfood.online@gmail.com)***. The API comes with understandable endpoint structure and URL structure.
- All endpoints are categorised into their respective HTTP types _(i.e: GET, POST, PUT & DELETE)_ with proper status codes depending upon what happens in the request. also important endpoints have an extra layer of security by making sure changes to crucial data can only be made if the request is made by the proper author. Eg: a logged in restaurant still won't be able to just go to delete dish endpoint and inject custom headers and be able to delete aur modify the data of another restaurant, the same goes for users.
- When checking out, the user can autofill the address by allowing location access to the website.
- All endpoints are secured from being accessed by non logged in users and restaurants are prevented from hitting user endpoints and vice versa.
- The site heavily focuses on keeping the environment secure which is important for an ecommerce app as it deals with actual real life trades
- It is made sure that during registration users input valid names and emails, this is achieved by simple regEx checks. this is also done for restaurants.
- Images are uploaded to cloudinary when the restaurants are uploading a dish image. The images are restricted to be less than 2.5 megaBytes and this is achieved by fileuplaod express middleware.
- Images have the `loading=lazy` property on the pages with a lot of images to make sure not to waste the user's bandwidth and to make sure the site loads quickly _(this property ensures that images are loaded only if they are visible on the screen, otherwise the request to load the images is not made which save's the user's data consumption and bandwidth)_
- The express router has custom functions such as renderHTML which allows to enter parameters when rendering the html files and which are accessible both via html and js `#%=<parameter name>` in HTML and `params.<paramater name>` in JS. This somewhat of a custom templating/rendering engine allows custom components to be devloped reducing the codebase and making customization a lot easier. `$%=<component name>` into the html inserts the component into the page also loading the component's respective css and js. the css is loaded in a top to bottom order to make sure page specific styling can be applied to components. This exploits the cascading behaviour of CSS.
- All parent routes have their own seperate router files and router objects thus allowing easy changes and also making sure no unnecesarry middleware is used when it's not required.
- Emphasis has been put on making the site load faster thus opening the prospects of turning it into a PWA if required. The website is completely responsive and mobile loading times have also been taken into consideration. Special meta tags are inserted into all html files before serving them (this is done by the custom rendering functions discussed earlier) to make sure the webapp can access all hardware capabilites a mobile phone has to offer.
The lighthouse scores are as shown :
<img src="https://res.cloudinary.com/dw6xcovsv/image/upload/v1666710849/userdata/Screenshots/Screenshot_20221025_083415_ihcgos.png" />
- The website judges the top dishes and restaurants on not just the basis of their overall review but also the amout review they have _(i.e: a dish with 5 star rating but only 2 reviews would rank lower than a dish with 4 stars but 10 total reviews)_ thus making sure quantity and quality are both taken into account.
This score is assigned by algorithmicly by the backend before serving the api requests asking for ratings of particular dishes/restaurants. Restaurants also are given a rating by considering the reviews of each of their dishes and averaging them. The thumbnaisl of restaurants are the same as the thumbnail of their top rated dish (again, taking into consideration the aforementioned algorithmic score).
- Searching algorithm is implemented and it works even when the user makes a typing mistake or describes even a broad category.


<a name="technologies"></a>
## Technologies 
### ***Primary Tech Stack***

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40" style="max-width:100%;">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40" style="max-width:100%;">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGmD516uFGZ30mm9sWyUER8rzfunzU1h6uA&usqp=CAU" alt="javascript" width="40" height="40" style="max-width:100%;">
<img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" alt="nodejs" width="40" height="40" style="max-width:100%;">
<a href="https://expressjs.com" target="_blank"> <img src="https://assets.website-files.com/61ca3f775a79ec5f87fcf937/6202fcdee5ee8636a145a41b_1234.png" alt="express" height="40"/> </a>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40" style="max-width:100%;">

### ***node_modules***
Here are the dependencies in the package.json file:
<img src="https://res.cloudinary.com/dw6xcovsv/image/upload/v1666711373/userdata/Screenshots/Screenshot_20221025_085219_wzzsqr.png" />

> Cloudinary is used _only and only_ to store the thumbnails of the dishes 

> dotenv is used for storing the api keys and other secrets in a private environment variable

> express is used for serving all requests (routing and api endpoints)

> express-fileupload is an express middleware which we have used for bringing the image uploaded in the frontend over to the backend and then later upload

> express-session is an express middleware which is used for storing session variables (cookies)

> nodemailer is used for sending emails to the users whenever a password recovery is requested

> pg is a connecter for node which allows nodeJs to communicate to our postgresql database

> serve-favicon is a simple express middleware with the sole purpose of serving the favicon for the website

### ***Other technologies/services***
<img alt="Heroku CI" src="https://img.shields.io/badge/Heroku-CI_%E2%9C%93-success?labelColor=7c5e9e" />
<img alt="Cloudinary" src="https://img.shields.io/badge/Cloudinary-☁-success?labelColor=3448c5" />
<img alt="google-fonts" src="https://img.shields.io/badge/Google-fonts-DB4437?labelColor=4285F4">

- Heroku is used for continous integration and deployment
- Cloudinary stores images
- opencage API is used to get the user's current location for auto-filling the address in the checkout option
- Google fonts have been used for getting the fonts _('Monsterrat','Roboto','Nunito')_

<a name="setup"></a>
## How to setup a local environment?

1. Clone the repository 
  
   `git clone https://github.com/marsian83MarsFood.git`
  
2. Install the required node_modules
   
   `npm i`

<a name="developers"></a>
## Team of developers

<div class="photos">
<div class="photo">
<a href="https://www.github.com/marsian83"> 
  <img src="https://avatars.githubusercontent.com/u/114365550?v=4">
  <p>Spandan Barve</p>
</a> 
</div>
<div class="photo">
<a href="https://www.github.com/jriyyya"> 
  <img src="https://avatars.githubusercontent.com/u/96080203?v=4"> 
  <p>Riya Jain</p>
</a> 
</div>
</div>

