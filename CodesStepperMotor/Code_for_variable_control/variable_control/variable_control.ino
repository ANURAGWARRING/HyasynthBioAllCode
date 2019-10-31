//Stepper Motor Control Code
//Using AccelStepper Library


#include <AccelStepper.h>
#include <Adafruit_MotorShield.h>
Adafruit_MotorShield AFMS = Adafruit_MotorShield();

// include AccelStepper library
 //Using alternate AccelStepper constructor so need this

// two stepper motors one on each port

Adafruit_StepperMotor*motor1 = AFMS.getStepper(200, 2);

int movement = 0; // Used to seperate the seperate functions for testing
//Will be replaced with sensor readings
const int MOTION = 500; //Test amount of steps for craft to move to

// you can change these to DOUBLE or INTERLEAVE or MICROSTEP!
// wrappers for the first motor!
//Just defines how it will move
void forwardstep1() {
  motor1->onestep(FORWARD, SINGLE);
}
void backwardstep1() {
  motor1->onestep(BACKWARD, SINGLE);
}

// Motor shield has two motor ports, now we'll wrap them in an AccelStepper object
AccelStepper stepperLeft(forwardstep1, backwardstep1);


void setup() { // set up the two objects; default pos is 0 as per docs
  stepperLeft.setMaxSpeed(200);
  stepperLeft.setAcceleration(200);
  
  Serial.begin(9600);
}

void moveLeft(int steps) // Spins one stepper backwards X amount of steps
{
  
  stepperLeft.moveTo(-steps);
  stepperLeft.setSpeed(50); // need to set speed for this as we want
  // a constant speed for the motors; same for all subseq functions
  //moveTo changes the speed so we need to redefine it here
}



void moveForward()
{

  stepperLeft.moveTo(MOTION);
  stepperLeft.setSpeed(50);
 
  // this SHOULD work the same way as above; tells steppers to move
  //500 steps in the clockwise direction, as it's moveTo
  //it's an Absolute Position; meaning it is always 500 steps from the 0
  //setSpeed same use as before
}

void moveBackward()
{
  stepperLeft.moveTo(-MOTION);
  stepperLeft.setSpeed(50);
  
  //same as above but in the counter clockwise way
}

void reset()
{
  
  stepperLeft.stop();
 
  stepperLeft.setCurrentPosition(0);
  movement += 1;
  //This functions resets the entire process; stops steppers
  //fixes their current position as the new 0
  //the movement +=1 increments it to tick the
  //loop to next move function;
}

void loop() {
  int steps = random(0, 500);
  int steps2 = random(0, 500); //generate random step increments for moveLeft/Right
  Serial.print("Current Left Pos:"); //testing
  Serial.println(stepperLeft.currentPosition());
  
  Serial.print("Current distance to go:");
  Serial.println(stepperLeft.distanceToGo()); //testing
  if (stepperLeft.distanceToGo() == 0 )
  {
    //This as far as I can tell works exactly how I've written it;
    //in that if either stepper has reached the target distance,
    //then it will call reset and stop the motors
    reset();
  }

  if (movement == 0) {
    moveBackward(); //Run them backward first
  }

  if (movement == 1)
  {
    moveForward(); //after first successful run, run them forward
  }

  else {
   
    moveLeft(steps2); // make them turn randomly at same time
  }
 //Docs say this will only do stuff when theres a step
  stepperLeft.run(); //to be completed; therefore, as moveTo is absolute
  // and reset sets target at 0, these will only do stuff
  // when theres actual distance to cover (as assigned above)
}
