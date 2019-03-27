# **robot-express-ng**
## **Coding Challenge**
___

### PROJECT INFO
Received : Monday, March 11 @ 1:23 PM<br>
Received : Monday, March 18 @ 7:45 AM<br>
Original Assignment : [ASSIGNMENT.md](./ASSIGNMENT.md)

### DELIVERABLES DESCRIPTION
The contents of this deliverables package are intended to demonstrate significant understanding and skill in problem solving, application design considerations, and the MEAN web technology stack.  There are main parts to the application with some suplimentary scripts for supporting the deployment for local development and remote staging (if desired.) See the included  document [Initialization and Setup](SETUP.md) for development and staging deployment.  The parts are arranged in the following subfolders : 

#### **[bot-express/](./bot-express/)**
  - An Express/Node API project that supplies endpoints for consumption.

#### **[bot-ng/](./bot-ng/)**
  - An Angular SPA for interaction with the API and application as a whole

### SOLUTION OVERVIEW
Chosen Language : JavaScript

*'robot-express-ng'* is an application with a visually simple front-end that hides some significantly complex back-end logic. The app navigation is along the top.  Three "pages" make up the SPA; _Leaderboard_, _Robots_, and _Manage_.

  - Leaderboard presents the top four robots according to their total task score tally
  - Robots presents a styled list of all robots being tracked
  - Manage allows the user to submit a new robot form with a name and robot type

At the bottom of the page is a section for status messages that will update and run asynchronously while the application is running.

### CORE OBJECTIVES MET
  1. Collecting input (robot name, and robot type) from user for robot creation
  2. On creation, new robots receive 5 tasks, at random, from the list of example tasks
  3. Tasks are completed according to the seqence of durations for each particularly assigned task.

### ADDED FUNCTIONALITY
  1. Robots are able to be created while other robots are finishing tasks.  The new robots tasks are added to the queue asynchronously
  2. Implemented leaderboard of highest scoring robots
  3. Tasks are restricted according to robot type using a flexible solution
  4. Persistance has been implemented using MongoDB for tasks, bots, and leaderboard functionality.

### ADDITIONAL HIGHLIGHTS
  - The custom logo has been rendered out as an SVG and included as `image-data` for native browser support and scalability
  - The entire application has been concieve and implemented using an `MVC` methodology (`API/Front-end separation, Observables/Subscribers, Controllers, Services, and Models`)
  - A remote MongoDB document store, through mLab, has been provided for previewing without local `mongodb` install.

### FUTURE / NICE TO HAVE
Given more time a few things that I would like to implement and explore with this project.

  1. Implement more robust error loging 
  2. Consider using an adapter pattern to sit between the API `services` and some of the more complex `control` logic areas
  3. User accounts, authentication, and authorization controls
  4. More style treatment on the front-end

  <sub>Solution written and produced by [Ben Nowak](https://bennowak.github.io/)</sub>

  <sub>Original Challenge Authors
  <br>Scott Hoffman <https://github.com/scottshane>
  <br>Olivia Osby <https://github.com/oosby></sub>
