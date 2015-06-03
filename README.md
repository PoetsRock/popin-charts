## Prerequisites
Make sure you have installed all these prerequisites on your development machine.

- Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager, if you encounter any problems, you can also use this [Github Gist](https://gist.github.com/isaacs/579814) to install Node.js.

- MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
    - [Ubuntu](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)
    - [Mac](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
    - [Windows](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
    - [Other Versions of Linux](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
From here, you can install everything else from your terminal with the Node package manager.

- Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:  
```
$ npm install -g bower
```  


- Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process, in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:  
```
$ sudo npm install -g grunt-cli
```

## Quick Install
Begin by installing the Node.js dependencies (the full list of dependencies can be found in the `package.json` file).  Go to your application folder and run in the command line:

```
$ npm install
```
It appears that, on occasion, you need to run the `npm install` command two or three times to get all of the dependencies.  

Now, install your front end dependencies (found in `bower.json`) by running:

```
$ bower install
```

## Running The Charts App
After the install process is over, you'll be able to run your application using Grunt. From the command line in your the root folder, run:

```
$ grunt
```

Ok! Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000)
                            
That's it!... hopefully. ;)