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
int period = 10000;
unsigned long time_now = 0;

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
 
  GreatMotor();// Don't worry no delay function is used call it as manuy times as poosible.
  
}
void GreatMotor()
{
  for (int i=0;i<9;i++)
  {Astepper1.move((20+(20*i)));                                
                               
    Astepper1.runToPosition();
     delay(10000);
     Astepper1.stop(); // Stop as fast as possible: sets new target
  
        
     Astepper1.move(-(200+(20+(20*i))));                                
                               
    Astepper1.runToPosition();
     delay(10000);
     Astepper1.stop();

  }
   
  }
