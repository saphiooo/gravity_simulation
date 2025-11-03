# Gravity Simulation

This project simulates gravitational attraction and collisions between objects in a defined space. As the simulation runs, smaller bodies attract and merge into larger ones. The canvas dynamically resizes and re-centers to follow the most massive object as it grows. 

Access the simulaton on p5.js [here](https://editor.p5js.org/saphiooo/sketches/CTrpgik1B).

## How to Use

1. Set the simulation parameters by modifying the code in the editor on the left.
   - Number of initial bodies on the canvas.
   - Height and Width of the Canvas, or simulation space.
   - Velocity of the bodies on the canvas.
   For instance,
    ``` js
    // The total number of objects in the simulation.
    let totalObjects = 100;
    // Width and height of the Canvas.
    let width = 800;
    let height = 600;
    // Velocity of the objects.
    let velocity = 3.0;

   * **Width** and **Height:** define the simulation space.
   * **Number of Objects:** determines the number of initial bodies.
   * **Velocity:** sets the average starting speed of each object.
    ```
2. Run the simulation by clicking the Run button in the top right.

## Credits
This simulation was originally written for Processing by [Jason Galbraith](https://github.com/jasongalbraith). 

It was adapted for p5.js by [Sophia Wang](https://github.com/saphiooo).
