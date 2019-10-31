
#include <Adafruit_MotorShield.h> //All the libraries
#include<AccelStepper.h>


Adafruit_MotorShield AFMS = Adafruit_MotorShield(); 
Adafruit_StepperMotor *myMotor = AFMS.getStepper(200, 2); //Constructor_orientation



void forwardstep1() {  
  myMotor->onestep(BACKWARD, DOUBLE);     //declaring class inside function
}

void backwardstep1() {  
  myMotor->onestep(FORWARD, DOUBLE);
}


AccelStepper Astepper1(forwardstep1,backwardstep1); //  constructor


void setup()

{  
   Serial.begin(9600);           // set up Serial library at 9600 bps
   Serial.println("Stepper test!");
  
   AFMS.begin();  // create with the default frequency 1.6KHz
   //AFMS.begin(1000);  // OR with a different frequency, say 1KHz
   
   //Astepper1.setSpeed(10000);
   //1 step == 1.8 degree which s the minimum a motor can turn 
   Astepper1.setSpeed(1000);
      
}

void loop()
{
 
  GreatMotor();//Use 
  
}
void GreatMotor()
{
  for (;;){
  Astepper1.move(-2000000000000);                                
  while (Astepper1.currentPosition()%10 != 0)                             
    Astepper1.run();
  Astepper1.stop(); // Stop as fast as possible: sets new target
  delay(5000);
  Astepper1.runToPosition(); 
  
  }
  }




 

  
  
