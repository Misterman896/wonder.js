# wonder.js
a low level yet easy to use game engine for javascript

# **Wonder.js: A Comprehensive Guide to Game Development**

## **Introduction**
Wonder.js is a lightweight JavaScript game engine built on top of the p5.js framework. It simplifies the creation of interactive 3D applications by managing objects, lighting, and user interface elements. This guide provides a structured approach to using Wonder.js for game development, covering its main components, best practices for integration, and advanced techniques for optimization and performance enhancement.

---
## **1. Setting Up Wonder.js**
To begin using Wonder.js, include the following script references in your HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wonder.js Game</title>
</head>
<body>
    <script src="wonder.js"></script>
    <script src="game.js"></script>
</body>
</html>
```

The `wonder.js` file contains the game engine, while `game.js` is where you write your custom game logic. Make sure that both files are properly linked to ensure smooth execution.

---
## **2. Core Features of Wonder.js**
Wonder.js is structured around three fundamental components:
- **Packages**: These are reusable functions that apply game-wide effects, such as lighting, physics, or background music.
- **GameObjects**: These represent interactive 3D objects in the game world, such as characters, obstacles, or platforms.
- **UI Elements**: These handle text, buttons, and other interface elements, making it easier to communicate with the player.

### **2.1 Creating a GameObject**
A `GameObject` is any entity within the game world. The following example demonstrates how to create a basic player character using a 3D cube:

```js
let player;
let playerTexture;

preload = () => {
    playerTexture = loadImage("player.png");
};

window.start = () => {
    window.bg = "#4488FF"; // Set background color
    player = new GameObject(0, 0, 0, playerTexture, () => {
        box(50, 50, 50); // Render a cube
    });
};
```
This initializes a 3D cube that can function as a player character. To make it more interactive, you can apply movement mechanics and animations.

### **2.2 Adding UI Elements**
Wonder.js supports the addition of UI elements such as on-screen text and buttons:

```js
new UI(() => {
    fill(255);
    textSize(32);
    text("Welcome to Wonder.js!", 10, 30);
});
```
This ensures that text appears on the screen independently of the 3D environment. You can also add buttons to trigger specific events in the game.

### **2.3 Using Packages for Global Effects**
Packages allow developers to introduce game-wide effects, such as lighting and physics. It is common notation to use `objectName.packageName` for packages affecting specific objects, while global packages are typically created without assigning them to a variable:

```js
new Package(() => {
    ambientLight(150);
    directionalLight(255, 255, 255, 1, 1, -1);
});
```
This provides proper illumination within the game environment, enhancing visibility and realism.

---
## **3. Implementing Player Controls**
Wonder.js includes built-in support for handling keyboard input. The following example enables movement using the W, A, S, and D keys:

```js
if (getKey('W')) {
    player.y -= 2; // Move up
}
if (getKey('S')) {
    player.y += 2; // Move down
}
if (getKey('A')) {
    player.x -= 2; // Move left
}
if (getKey('D')) {
    player.x += 2; // Move right
}
```
This simple input system allows real-time interaction within the game world. For more advanced movement, you can implement physics-based mechanics such as gravity and jumping.

---
## **4. Expanding the Game World**
Additional game elements, such as platforms and obstacles, can be introduced using GameObjects:

```js
let platform = new GameObject(0, 100, 0, null, () => {
    box(200, 20, 20); // Create a platform
});
```
This allows players to interact with various objects within the game world. You can create multiple platforms at different heights to form a level.

### **4.1 Collision Detection**
A critical aspect of game development is ensuring objects interact with each other correctly. Collision detection can be implemented to prevent the player from falling through the ground or walking through obstacles.

```js
function checkCollision(obj1, obj2) {
    return (Math.abs(obj1.x - obj2.x) < 50 && Math.abs(obj1.y - obj2.y) < 50);
}
```
This simple function checks if two objects are overlapping, allowing you to create responses such as stopping movement or triggering an event.

---
## **5. Running and Optimizing Your Game**
To run your Wonder.js game, simply open the HTML file in a modern web browser. For better performance, consider the following optimization strategies:
- **Reduce unnecessary object instantiations**: Keep your scene optimized by only rendering objects that are necessary.
- **Use the package system for repeated computations**: Heavy calculations, such as physics simulations, should be offloaded to packages.
- **Leverage built-in p5.js optimizations**: Ensure smooth rendering by utilizing `requestAnimationFrame` and efficient data structures.

### **5.1 Implementing Sound Effects**
Adding sound effects can improve player immersion. Wonder.js integrates with p5.sound to handle audio playback:

```js
let soundEffect;

function preload() {
    soundEffect = loadSound("jump.mp3");
}

function playJumpSound() {
    soundEffect.play();
}
```
This function plays a sound whenever it is called, which can be useful for jump effects, collisions, or background music.

---
## **6. Advanced Features and Next Steps**
Once you have a basic game running, you can expand its functionality with additional features:
- **Physics-based movement**: Implement acceleration, friction, and gravity to enhance realism.
- **AI-driven NPCs**: Create non-player characters that move and react to the player.
- **Multiplayer capabilities**: Explore WebSockets to add real-time interactions between multiple players.

---
## **Conclusion**
Wonder.js is a versatile and lightweight JavaScript game engine that simplifies the creation of 3D games. By leveraging its GameObjects, UI components, and Package system, developers can build engaging interactive experiences. As you continue developing your game, consider incorporating additional features such as physics simulations, animations, and collision detection to enhance gameplay depth and complexity. The possibilities with Wonder.js are vast—so keep experimenting and building!

