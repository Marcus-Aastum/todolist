# Dynamic TODO-list with HTML/CSS/JS
This is a TODO-list which can be shared with anyone you want with what's called a friend code. Use it to share a shopping list with your family, share project progress with coworkers, or anything else! Anyone with your friend code can see and edit this list, so use a unique name. 
## Usage
- You can access the site using https://skole.aastum.no
- In the add friend code field, write the code you've been provided or create your own. Anyone with this code can edit your list, so choose a unique code carefully
- When you've entered a code, press "add", it'll then appear under the input field
- To add a new task, navigate to the add task field and write your task, then press the "+" button
- To check off a task as done, press the circular button to the left of the task
  > on mobile the button is above
- To delete a task, press the "delete" button to the right of the task
  > on mobile, the button is below

## Self hosting
***If you wish to host the todo-list yourself, follow these steps:***
1. Clone/download the github repo to your machine/server (make sure to use the dynamic branch)
2. [Download NodeJS](https://nodejs.org/en/download) on your machine
3. Download the necessary packages using these commands in the cloned folder
    1. ```npm install express```
    2. ```npm install ip```
    3. ```npm install --save cookie-parser```
4. Create a subfolder called "data"
5. Run the webserver using this command from the cloned repository location:
    1. ```node backend.js```
6. The website is now hosted on your local ip on port 80

## Progress

- [x] Create backend that serves website
- [x] Add field for share-link
- [x] Save seperate tasklists for seperate share-link
- [x] Send and recieve data correctly between backend and website
- [x] Add check-uncheck functionality
- [x] Add delete functionality
- [ ] Style Friend code field
