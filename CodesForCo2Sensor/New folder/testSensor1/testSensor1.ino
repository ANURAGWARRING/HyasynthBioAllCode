/* VernierLibTutorialAnalogRead (v2017)
 * This sketch reads a data point from a Vernier Analog (BTA) 
 * sensor once every half second and prints the sensor reading 
 * with units to the Serial Monitor.
 * 
 * Plug the sensor into the Analog 1 port on the Vernier Arduino 
 * Interface Shield or into an Analog Protoboard Adapter wired 
 * to Arduino pin A0.
 */
 
#include "VernierLib.h"
#include "Arduino.h"
#include <Wire.h>/
VernierLib co2;
 
float sensorReading;//create global variable to store sensor reading
unsigned long time;
void setup() {
  Serial.begin(9600); //setup communication to display
  Serial.println("Co2 Readings");
  co2.autoID(); //identify the sensor being used
}
 
void loop() {
  sensorReading = co2.readSensor(); //read one data value
  
  Serial.print(sensorReading); //print data value 
  Serial.print(" "); //print a space
  Serial.println(co2.sensorUnits());//print units and skip to next line
  If 
  delay(500); //wait half second

  
}
