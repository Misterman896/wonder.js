// Dynamically load p5.js and p5.sound
function loadScript(src, callback) {
    let script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

// Load p5.js first, then p5.sound, then initialize Wonder
loadScript("https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.1/p5.js", () => {
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.1/addons/p5.sound.min.js", () => {
        // Disable page scrolling
        const style = document.createElement("style");
        style.textContent = `
            html, body {
                overflow: hidden !important;
                height: 100% !important;
                margin: 0;
                padding: 0;
            }
        `;
        document.head.appendChild(style);

        initializeWonder();
    });
});

let packages = [];
let objects = [];
let uis = [];

// Package system
class Package {
    constructor(callback) {
        this.callback = callback;
        packages.push(this);
    }
}

// Object system
class GameObject {
    constructor(x, y, z, textureImg, callback) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.textureImg = textureImg;
        this.callback = callback;
        objects.push(this);
    }

    render() {
        push();
        translate(this.x, this.y, this.z);
        if (this.textureImg) {
            texture(this.textureImg);
        }
        this.callback();
        pop();
    }
}

class UI {
    constructor(callback) {
        this.callback = callback;
        uis.push(this);
    }
}

// Built-in package for light system
new Package(() => {
    ambientLight(225);
    directionalLight(225, 225, 225, 0, 1, 0);
});

// Initialize Wonder
function initializeWonder() {
    // Allow developers to redefine `start` before setup
    window.start = window.start || function () {};  // Default empty function if not defined

    // Now that p5.js is loaded, define setup
    window.setup = function () {
        createCanvas(windowWidth, windowHeight, WEBGL);
        noStroke();
        window.start(); // Run the start function if defined by developer
        console.log("Get ready for the Wonder.");
    };
    
    window.bg = 0;

    // Define draw function to execute packages and objects in order
    window.draw = function () {
        background(window.bg); // Clear screen each frame
        
        // Run all packages (e.g. built-in light system)
        for (let pkg of packages) {
            pkg.callback();
        }
        
        // Render all objects
        for (let obj of objects) {
            obj.render();
        }

        resetMatrix();

        // Render all UI callbacks
        for (let ui of uis) {
            ui.callback();
        }
    };
}

// Resize canvas on window resize
window.windowResized = function () {
    resizeCanvas(windowWidth, windowHeight);
}

// Utility to get if a key is pressed
function getKey(k) {
    return keyIsPressed && key == k;
}
