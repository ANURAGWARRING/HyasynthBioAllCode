/* VernierLibTutorialAnalogRead (v2017)
 * This sketch reads a data point from a Vernier Analog (BTA) 
 * sensor once every half second and prints the sensor reading 
 * with units to the Serial Monitor.
 * 
 * Plug the sensor into the Analog 1 port on the Vernier Arduino 
 * Interface Shield or into an Analog Protoboard Adapter wired 
 * to Arduino pin A0.
 */
 
#include "VernierLib.h" //include Vernier functions in this sketch
VernierLib Vernier; //create an instance of the VernierLib library
 
float sensorReading; //create global variable to store sensor reading



float rawCountEtoh; //create global variable for reading from A/D converter (0-1023)
float voltageEtoh; //create global variable for voltage (0-5V)
float slopeEtoh = 25000;
float interceptEtoh = 200;
float sensorValueEtoh[10];
float sum;
float avg;
int i;

 
void setup() {
  Serial.begin(9600); //setup communication to display
  Vernier.autoID(); //identify the sensor being used
}
 
void loop() {
  sensorReading = Vernier.readSensor(); 
   
  
  
  
  
  Serial.print(sensorReading); //print data value 
  Serial.print(" "); //print a space
  Serial.println(Vernier.sensorUnits()); //print units and skip to next line
 
}
