# styleguide-starter-kit

[Style guide generated from the stater kit](https://ssk-tester.firebaseapp.com)

[Demo using the style guide](https://ssk-tester.firebaseapp.com/demo.html)

## What is it?
It is boilerplate style guide. It includes the following:
- boilerplate pattern library in CSS (includes CSS for colors, type, buttons, cards, spinners, layouts, layers,...). 
This can be edited to match your product's branding.
- postcss-style-guide for generating a style guide from the pattern library
- gulp as task runner to monitor for changes in CSS and regenerate style guide

## How is the pattern library a.k.a stylesheets structured? 
They are grouped in to three categories:
* **Atoms** -  Colors, Typography, Buttons
* **Molecules** - Cards, Spinners, Input Controls, Tabs
* **Infrastructure** - Layouts, Layers

## How do I use it? 
- ``` npm i -g styleguide-starter-kit```
- In the project directory, run: ```styleguide-starter-kit```

It generates a styleguide folder in your project with the following: 
- **styles**: includes all the pattern library CSS
- **styleguide-template**: template used for generating the style guide
- **gulpfile**: task runner
- **public**: includes the styleguide, a demo with the styleguide and the styleguide.min.css if you want to consume all of it in your site.

### See it in action
- Go in to the styleguide folder and try ```npm run start```
- You can now view your style guide in ```http://localhost:4500```
- There is also a demo in ```http://localhost:4500/demo```

### Set it up to run within your project
You can include the following in your package.json to include the style guide tasks as well:
```
"scripts": {
   "start": "node ./index.js & npm run start --prefix ./styleguide"
 },
```

## Report Issues
[Please log issues here](https://github.com/archana-s/styleguide-starter-kit/issues)



