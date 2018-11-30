### Description ###

This is a searchable API for the year 1943 in the New York Times' Archive API. Users can search for articles based on titles,
save articles to a database for reference on future logins, comment on articles, and check analytics for the frequency of appearance of various 
subjects. 

### Structure ###

All code for this project is contained within the "server" directory. Back-end code exists directly within this directory, while a "client" folder within the directory holds the front-end code.

### Tech Stack ###

This app was coded with Node.js on the back end and React on the front end. Redux was used for front-end state management, and Mocha & Jest were used for back-end and front-end tests, respectively. 

### Usage ###

To run this application, please follow the below steps:

1) Clone the repo to your computer.
2) Navigate into the "server" folder.
3) Run "npm run dev" to start both the front end and back end simultaneously.
4) A browser tab will be opened with the front end of the application. Go to this tab, and click "Sign In". Sign in with username "demo" and password "password". Then navigate to "Articles". 
5) Please wait until the articles complete loading. Due to the size of the database, this may take a few moments. Article headlines will appear after loading.
6) Click a headline to open the article, or enter a keyword/date range at the top to filter the number of articles displayed.
7) Click "Saved Articles", then enter a category title and click "Save New Category". Return to the Article Index and click a an article. Then, on the Article Details, select the created category from the drop-down, and click "Save". Return to Saved Articles. The article will now be visible. To remove the category, click "Delete Category". 
8) Click "Analytics" to view a chart of the most common article keywords (as provided by the NYT) for the selected date range. Change the date range or keywords as desired. 
