# High-Card
This is a simple JavaScript High Card game. A user plays agains a computer component. Each round the user and computer draw cards.  The high card wins.  Once all cards have been drawn, a winner is determined. For this game, I created 3 different JavaScript solutions. This was a challenge to make myself explore the different possibilites of the JavaScript language. 

#app.js
For the first approach I created a simple game object, that contained the basic game properties.  I then created a series of functions that interact with the object. One of the issues I see with this approach is that there is no decoupling.  Game logic and UI elements are dependent on each other and intertwined.

#app-2.js
In this approach, I used more of a MVC model.  I basically created 3 controllers.  One that controlles the game logic, one that controlls the UI, and the last one acts as the go between. This approach relies on closures and IIFEs to achieve its goals. 

#app-3.js
In my final approach, I relied heavily on prototypal inheritance.  I created a Game and UI object then added methods to each prototype.  
