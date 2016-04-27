# Simple-Quiz
A very simple, self-contained quiz theme for WordPress that lets you build small, fun quizzes.

[View the Demo](http://variano.site/)

## Plugins Used
This plugin was built using Advanced Custom Fields Pro. The code could be modified to be used with the standard version, but would just be a bit less flexible when setting up quizzes (due to lack of build-in repeater fields).

WordPress REST API (Version 2) and ACF to REST API (Version 2) were also used to check answers via AJAX.

## Relevant Files
Many of the files in this project are leftover boilerplate files that will be updated or removed. Most of the quiz functionality comes from:

*include/quiz-model.php* – Creates the quiz model, which allows you to write intro text, add an unlimited number of questions, add an unlimited number of answers for each question, define correct answers (multiple correct answers are allowed), write a unique success message based on the answer, and write outro text. Please note that, on the demo site, the model is created via plugin data rather than from within the theme itself. You will need to update functions.php to include this file.

*front-page.php* – Creates the quiz view, assembling the question data from the quiz into individual panels.

*js/quiz-controller.js* – Controls the ability to flip through panels upon answering questions, and checks the answer you select against the correct answer via AJAX (using the WordPress REST API).

## CSS Styles
Some of the CSS was borrowed from Atakan Goktepe's ["Multi Step Form" demo](http://codepen.io/atakan/pen/gqbIz) and Angela Velasquez's ["CSS Styling Radio Button" demo](http://codepen.io/AngelaVelasquez/pen/Eypnq) on Codepen.
