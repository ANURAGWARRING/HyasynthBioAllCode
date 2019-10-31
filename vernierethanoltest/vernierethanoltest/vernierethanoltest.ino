//variables for analog pin 0
float rawCountEtoh0; //create global variable for reading from A/D converter (0-1023)
float voltageEtoh0; //create global variable for voltage (0-5V)
float sensorValueEtoh0[10];

//variables for analog pin 1
float rawCountEtoh1; //create global variable for reading from A/D converter (0-1023)
float voltageEtoh1; //create global variable for voltage (0-5V)
float sensorValueEtoh1[10];


//variables for analog pin 2
float rawCountEtoh2; //create global variable for reading from A/D converter (0-1023)
float voltageEtoh2; //create global variable for voltage (0-5V)
float sensorValueEtoh2[10];



float sum0,sum1,sum2;
float avg0,avg1,avg2;
int i;

void setup() {
 Serial.begin(9600);

}

void loop() {
   sum0=0;sum1=0;sum2=0;
  for (i=0;i<9;i++)
  { 

    //sensor in Analog Pin 0
  rawCountEtoh0 = analogRead(A0); 
  voltageEtoh0 = rawCountEtoh0/(256*5);
  sensorValueEtoh0[i] =  (2.995*pow(voltageEtoh0,-0.995));
  sum0 = sum0 + sensorValueEtoh0[i];

  //sensor in analog Pin 1
  rawCountEtoh1 = analogRead(A1); 
  voltageEtoh1 = rawCountEtoh1/(256*5);
  sensorValueEtoh1[i] =  (2.995*pow(voltageEtoh1,-0.995));
  sum1 = sum1 + sensorValueEtoh1[i];


  //sensor in analog Pin 2
  rawCountEtoh2 = analogRead(A2); 
  voltageEtoh2 = rawCountEtoh2/(256*5);
  sensorValueEtoh2[i] =  (2.995*pow(voltageEtoh2,-0.995));
  sum2 = sum2 + sensorValueEtoh2[i];

  
  delay(500);
  }
  avg0 = sum0/10;  avg1 = sum1/10; avg2 = sum2/10;
  Serial.print ("A0 Sensor");Serial.print ("   "); Serial.print(avg0/100);   Serial.print ("A1 Sensor");Serial.print ("   "); Serial.print(avg1/100); Serial.print ("A2 Sensor");Serial.print ("   "); Serial.println(avg2/100);
  }

  
