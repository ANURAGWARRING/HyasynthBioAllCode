float rawCountEtoh; //create global variable for reading from A/D converter (0-1023)
float voltageEtoh; //create global variable for voltage (0-5V)
float slopeEtoh = 25000;
float interceptEtoh = 200 ;
float sensorValueEtoh ;


void setup() {
 Serial.begin(9600);

}

void loop() {
   rawCountEtoh = analogRead(A0); 
  voltageEtoh = rawCountEtoh/(1024*5);
  sensorValueEtoh =  (-2.995 * pow(voltageEtoh,0.9054))+0.70;
   Serial.println(sensorValueEtoh/2);
  delay(500);
  }
