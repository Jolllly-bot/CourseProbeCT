# Milestone 3

For your last and final assignment for this class, you'll put together one more project using the tools that you've learned, and some new tools (like better login & persisting data) that are meant to help take you from 0 to 60.

## Requirements

### App

At a high level, the requirements for this project are:

- Your app should have at least one public page, a way to login, and something private that your users see after login.
- Your app should have Create/Read/Update/Delete functionality for any user-supplied data (text, images, etc).
- If you really want to do a native mobile app you can, but you're on your own in terms of support.

### Group work

Group work is optional - so it's up to you. Here are the rules:

- Max 3 people.
- All work needs to be submitted to the shared codebase.
- Each member of the team is responsible for at least 1 feature that creates, reads, and updates some data. This does NOT mean that one person can work on creating data, another person works on viewing data, etc.
- If you use Firebase to host your app, the Firebase account can only be owned by one person.
- If your group is having problems or some people are not contributing, please email me and let me know ASAP.

### Part 1 - Prototype It

For Part 1 - you'll make a rough prototype of your idea - enough to answer the question - "What is your app, and what does it do?"

If you're working on a project as part of another course, you can see if it meets the criteria above. The only additional requirement I have is that I need to be able to see your work (commits + code).

If you've got your own idea for a project you want to build, fantastic!

If you don't have your own idea, you can use one of these 2:

- Social Media Image/Message Sharing app
- Chatroom App

You can't do these:

- To-Do app
- Notes app
- Milestone 2 app

Once you've chosen what you want to build, it's time to put together your product overview.

#### Submission

- Create a rough wireframe using Figma to describe your app visually and include a link to a publicly viewable Figma wireframe.
- Submit a 1-pager product overview document describing the features of your app idea as shown in your Figma wireframe, some of the use cases that it addresses, and how some of the features are used on each page.

### Part 2 - Build It

If you're working on a team - each member of the team is responsible for at least 1 feature AND you need to show this via Git commits. You'll only receive credit if I can see each person's Git commits.

- There should be a way of logging in - we'll be using Firebase Auth during the class.
- There should be a form or some inputs that are shown to the user, and you send the data to your backend - we'll be using Firebase Firestore during the class.
- You should be able to save the user's data and display it back to them - we'll be using React for this.
- Once you've built your feature, setup hosting for your site and deploy your changes to your live environment. Grading will be based on your live environment.

#### Submission

- Submit a link to your Github repository containing the work, as well as screenshots of the application and a brief description of how your features work so that I can review it.
- If you're working on a team, each person should have their own commits in their repo
- Submit a screenshot showing some of the data in your Firestore Collection. If you're using a different database, submit a screenshot wherever your data may be.
- Submit a link to your public URL

### Part 3 - Run It

#### Submission

Once you've deployed your site, it's time to be able to review your running application. Navigate around your app to generate some traffic and data, and submit screenshots and a short answer for each question below.

If you wind up deploying to a different hosting platform, you should still be able to find all this information, it'll just be different than what you find on Firebase.

Review traffic to your app:

- How many requests did you receive?
- How do you know if it was human or a bot?

Measuring frontend performance:

- What is the max CPU usage of your page?
- What is the max memory that it uses?
- How fast did your page load?
- How much data was transferred?

Measuring backend performance:

- How many requests did you make to your database?

## Grading

| Criteria                 | Ratings             | Pts |
|--------------------------|---------------------|-----|
| **Prototype & Wireframes** | **Exceptional**    | 5 pts|
|                           | **Meets Expectations** | 4 pts|
|                           | **No Marks**         | 0 pts|
| **Building an App**        | **Exceptional**    | 10 pts|
|                           | **Meets Expectations** | 8 pts|
|                           | **Below Expectations** | 5 pts|
|                           | **No Marks**         | 0 pts|
| **Hosting & Running the App** | **Full Marks**  | 5 pts|
|                           | **No Marks**         | 0 pts|
| **Total Points:**         |                     | 20 pts|

## Submissions

We'll use Github Classroom once more, but there's no template in this repo. You are free to copy files over from Milestone 2 if you'd like to use that structure. If you'd like to use your own tech stack, that's fine too. One advantage of using GH Classroom once more is that it takes care of group permissions so that I don't have to.

You can always move your repo or your code out of Github Classroom so you can continue working on it after the semester is over.

GH Classroom is configured for Group assignments, so if you'd like to work solo, create a group with your Cornell ID in it, i.e. "da335". If you're going to work in a group, name your group or select an already created group. If you join a group accidentally, there doesn't seem to be a way of fixing it in GH Classroom, so please email me to let me know.

Once you're ready, start by accepting your GH Classroom Invite - [https://classroom.github.com/a/ye0j79O4](https://classroom.github.com/a/ye0j79O4).

Note: Submissions are disabled until groups get imported into Canvas for grading.
