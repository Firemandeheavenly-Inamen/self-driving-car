"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const computer_vision_1 = require("./computer-vision");
//Car Class
class Car {
    constructor(props) {
        this.isRunning = props.isRunning;
        this.steeringControl = props.steeringControl;
        this.speedControl = props.speedControl;
    }
    respond(events) {
        // Make sure car is running.
        if (!this.isRunning) {
            return console.log(`The car isn't running.`);
        }
        // Take action for counter the obstacle.
        Object.keys(events).forEach(eventKey => {
            if (!events[eventKey]) {
                return;
            }
            switch (eventKey) {
                case ('ObstacleLeft'):
                    this.steeringControl.turn("right");
                    break;
                case ('ObstacleRight'):
                    this.steeringControl.turn("left");
                    break;
                case ('Uphill'):
                    this.speedControl.adjustSpeed("accelerate");
                    break;
                case ('Downhill'):
                    this.speedControl.adjustSpeed("slow down");
                    break;
            }
        });
    }
}
//SteeringControl Class
class SteeringControl {
    execute(command) {
        console.log(`Executing: ${command}`);
    }
    turn(direction) {
        this.execute(`turn ${direction}`);
    }
}
//SpeedControl class to adjust Car's speed
class SpeedControl {
    execute(command) {
        console.log(`Executing: ${command}`);
    }
    adjustSpeed(direction) {
        this.execute(`${direction}`);
    }
}
//Working with Car class for execution purposes
let steering = new SteeringControl();
let speed = new SpeedControl();
let autonomousCar = new Car({
    isRunning: true,
    steeringControl: steering,
    speedControl: speed
});
for (let i = 0; i < 10; i++) {
    autonomousCar.respond(computer_vision_1.getObstacleEvents());
}
