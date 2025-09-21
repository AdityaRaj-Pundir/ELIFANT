## Inspiration
As college students, we understand the struggle of not always having access to nutritious food but having exponential hunger. Too often, we open the fridge to find mismatched ingredients and feel overwhelmed or uninspired. Eating out can be expensive, and cooking can feel intimidating when time and energy are limited.
This project was born from the idea of turning that challenge into an opportunity. By simply snapping a picture of what’s in the fridge, students can get quick, creative recipes tailored to what they already have. Our goal is to make cooking feel approachable, while also reducing food waste and encouraging healthier eating.
## What it does

ELIFant accurately identifies the ingredients from refrigerator contents by scanning photos of the contents using image recognition technology. Following item recognition, the algorithm consults a large recipe database to recommend meals based on available ingredients. The program helps users plan their meals more conveniently, save time, and reduce food waste by offering personalized recipe recommendations.

## How we built it
We built the project as a simple web application using **HTML, CSS, and JavaScript**.
 - **HTML** provides the basic structure of the webpage, including the upload button, a place for the recipe to appear, and some simple navigation.

 - **CSS** makes the page look aesthetic and easy to use, with styled buttons, backgrounds, and clean layouts.

 - **JavaScript** is the “brain” of the app. It takes the picture uploaded by the user, converts it into a format that can be sent over the internet, and communicates with the **Gemini API**.

The **Gemini API (Gemini 2.5 Flash model)** is the intelligence behind the project. Once JavaScript sends the fridge photo along with a short prompt, the model analyzes what’s inside and generates a recipe in plain text. JavaScript then takes that response and displays it back inside the webpage so the user can follow along.

## Challenges we ran into

 - Most of our team members had never used HTML, CSS, or JavaScript before this project, which significantly increased the time taken for the project. We were able to overcome this challenge by viewing several sites and using AI to learn about different tags and attributes in HTML and CSS, and several programming concepts in JavaScript.
 - We ran into issues with the Gemini API and prompt engineering. Our team had to revise our prompt several times to ensure we got the required output format from Gemini.
 - We could not figure out how to forward ports on WebStorm’s Code With Me feature, which unfortunately did not let collaborators preview HTML files on their own devices. We later fixed this by using GitHub Pages to share HTML files.
 - We were unable to figure out how to use Firebase Studio to store a user-inputted image file, so we had to resort to JavaScript’s DOM Manipulation to get the src of the user-inputted image.


## Accomplishments that we're proud of

We loved that we were able to implement an impactful and valuable objective that could genuinely be beneficial for others. We were proud when we finally centered the recipe container div, and when we learned how to use valuable skills like implementing the Gemini API, learning web development, and creating a meaningful brand identity, including our name, logo, motto, and overall theme. We are also proud of completing our first hackathon as freshmen, and we look forward to the journey ahead.

## What we learned

 - Combining JavaScript, CSS, and HTML to implement an interactive and impactful design to ensure our ideas are efficiently delivered to those who need them.  
 - How to implement APIs into our program by using JavaScript with an API key to communicate with Gemini and return recipes relevant to the user’s needs.
 - Using Webstorm to collaborate with others to effectively make changes to our website in real time.
 - Using GitHub to push, pull, and commit changes to store an accessible version of our program while debugging and implementing new code.  

## What's next for ELIFant | Every Leftover Inspires Flavor

ELIFant's plans center on growing its influence and capabilities. In order to further reduce food waste, future developments will include enhancing the accuracy of ingredient recognition, adding more diverse cuisines and dietary requirements to the recipe database, such as gluten-free or vegetarian options, and incorporating detailed sustainability advice. In order to make the program more accessible to both households and college students, we also plan to create a mobile-friendly version. In the end, ELIFant wants to encourage more intelligent food use, cut down on waste, and make cooking more sustainable and pleasurable.


