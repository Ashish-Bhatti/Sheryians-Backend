- package.json
     it only shows or tells which packages we used in our app

- package-lock.json
    it shows and tells which packages are been used in our whole app
    like we used cat-me npm but cat-me is also using some packages and those packages also using some other packages

- node_modules
    it store all the install packages and packages of packages which are depended on each other

-------------------------------------
1. package.json — The Menu
It lists the main "dishes" (packages) you chose to order for your project. It shows the names of the tools you are using and the general version range you want.

2. package-lock.json — The Exact Recipe
It lists every single "ingredient" (sub-dependencies) required to make those dishes. It locks down the exact version of every package so the project works perfectly every time someone else installs it.

3. node_modules/ — The Pantry
This is the physical storage room where all the ingredients are kept. It holds the actual code files for every package. It is huge, messy, and you usually don't need to look inside it—you just let the computer grab what it needs.

-----------------------------------
=> how to create server

- Initialize server
    npm init -y
- install express
    npm i express
- create js file
    app.js

- require - Import  ->  Express	Gives you the tools to build.
- app = express()	->  Initialize	Creates the "brain" of your server. (create server)
- app.get()       ->	Define Route	Decides what happens when a user visits. (define route)
- app.listen()    ->	Start Server	Opens the doors for traffic. (start server)