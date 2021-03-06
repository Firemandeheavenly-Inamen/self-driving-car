import { getObstacleEvents } from './computer-vision';


 //Types & interfaces.

interface AutonomousCar {
	isRunning?: boolean;
	respond: (events: Events) => void;
}
interface AutonomousCarProps {
	isRunning?: boolean;
	steeringControl: Steering;
	speedControl: Speed;
}
interface Events {
	[event: string] : boolean
}
interface Control {
	execute: (command:string) => void;
}
interface Steering extends Control {
	turn: (direction:string) => void;
}
interface Speed extends Control {
	adjustSpeed: (direction:string) => void;
}

//Car Class

class Car implements AutonomousCar {

	isRunning;
	steeringControl;
	speedControl;

	constructor(props: AutonomousCarProps) {
		this.isRunning = props.isRunning;
		this.steeringControl = props.steeringControl;
		this.speedControl = props.speedControl;
	}

	respond(events: Events) {

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
class SteeringControl implements Steering {

	execute (command: string) {
		console.log(`Executing: ${command}`);
	}

	turn (direction: string) {
		this.execute(`turn ${direction}`);
	}

}



//SpeedControl class to adjust Car's speed
class SpeedControl implements Speed {

	execute (command: string) {
		console.log(`Executing: ${command}`);
	}

	adjustSpeed (direction: string) {
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

for (let i = 0; i < 5; i++) {
	autonomousCar.respond(getObstacleEvents());
}
