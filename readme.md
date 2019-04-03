# Combined projects

This is a repository of multiple webpages.
Each webpage has its own folder in the root folder.
Each webpage's folder has an index file that will be served when a folder is accessed

There is limited SSD capacity at the server side. Combining all web applications' node modules in an attempt to save space
Each application should have a readme file that contains a list of node modules said application uses for better management


# Development

* Info
- Projects can be found from ./public/
- React components are in ./public/shared_assets
- Ensure you are using dev branch!
- You don't ever have to make changes in master branch, only in dev and feature branches, which are based on dev branch!


* Not a project
- .well-known - https://tools.ietf.org/html/rfc5785
- robots.txt - http://www.robotstxt.org/


* Before you can develop
```
git clone https://github.com/MikezuGe/combined_projects.git
git checkout dev
# Ensure you are using dev branch
npm i -g yarn
yarn
```


* Creating a new project
```
# Ensure you are using dev branch
# Add a folder of desired project name to ./public/
# Add a folder named src to your project folder
# Add app.js file to your project's src folder
# Use the created app.js file as the root of you new project
# Unfortunately you have to run 'yarn start' twice, so the index.html served by the server includes new project link
yarn start
```


* To develop
```
# Ensure you are using dev branch
yarn start
```


* Committing
```
# Ensure you are using dev branch
git add .
git commit -m "commit message"
git push
```



# Production

- Ensure you are using dev branch
- Commit your changes
```
# Hox! Use npm instead of yarn
- npm run deploy --combined_projects:defveract={patch(default)|minor|major}
```
