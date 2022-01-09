# ToDo list - Jan 2021

This project is a full-stack web app to practice and build proficiency with a variety of technologies, including HTML, CSS, bootstrap, JQuery, Express, Node.JS and postgreSQL.

## Description

This project can track to-do list items. Full functionality is featured, including adding & removing tasks, and marking tasks as complete. The "completed date" is automatically entered into the table as "now" when the item is marked as completed. I decided against too much customization of time completed or for marking things back as uncompleted, to limit the scope of the user experience and to limit edge cases. It's perfectly functional as is right now, but customization of those two areas is one place where more work could be done. 

Additionally, this was more of an exercise with the backend routing set up than of particular CSS tricks or UI elements.

## Getting Started

### Dependencies

Requires postgreSQL to be up & running on your computer. Requires npm. All other dependencies will auto install with ```npm install```. I used VSCode to create, run and edit my project.

### Installing

Fork, clone and run command ```npm install```. This project requires postgreSQL to be running on your computer with a databse called ```todo_sql_jan21```, on ```localhost``` with port 5432. These specific database details can be changed in the ```const config``` portion of the todo.router.js file. Within that database, the information about and the SQL queries to set up the table can be found in the ```database.sql``` file included in this repo. 

### Executing program

Fork repo, clone code & run command ```npm start``` within VSCode to start the website.

## Authors

This project is based on @primeAcademy's week 8 weekend challenge. All code was written by me, except small portions that are specifically noted in comments.
