void setup() {
  // put your setup code here, to run once:

}

void loop() {
  // put your main code here, to run repeatedly:

}/*Reads the value from a Real Time Clock (RTC) DS1307 and displays it in the serial monitor
*
*Created by D. Sjunnesson 1scale1.com d.sjunnesson (at) 1scale1.com
*
*Created with combined information from 
*http://www.arduino.cc/cgi-bin/yabb2/YaBB.pl?num=1180908809
*http://www.arduino.cc/cgi-bin/yabb2/YaBB.pl?num=1191209057
*
*
*Big credit to  mattt (please contact me for a more correct name...) from the Arduino forum 
*which has written the main part of the library which I have modified
*
*/

#include <WProgram.h>
#include <Wire.h>
#include <DS1307.h> // written by  mattt on the Arduino forum and modified by D. Sjunnesson

void setup()
{
 Serial.begin(57600);
 Serial.println ("Hit a key to start");     // signal initalization done
 while(Serial.available() == 0){}
                             // Hit upload about 10 seconds before selected time
 RTC.stop();
 RTC.set(DS1307_SEC,0);        //set the seconds
 RTC.set(DS1307_MIN,28);       //set the minutes
 RTC.set(DS1307_HR,23);        //set the hours   note 24 hour clock
 RTC.set(DS1307_DOW,5);        //set the day of the week
 RTC.set(DS1307_DATE,13);      //set the date
 RTC.set(DS1307_MTH,1);        //set the month
 RTC.set(DS1307_YR,11);         //set the year   
 RTC.start();   
}

void loop()
{

 Serial.print(RTC.get(DS1307_HR,true)); //read the hour and also update all the values by pushing in true
 Serial.print(":");
 Serial.print(RTC.get(DS1307_MIN,false));//read minutes without update (false)
 Serial.print(":");
 Serial.print(RTC.get(DS1307_SEC,false));//read seconds
 Serial.print("      ");                 // some space for a more happy life
 Serial.print(RTC.get(DS1307_DATE,false));//read date
 Serial.print("/");
 Serial.print(RTC.get(DS1307_MTH,false));//read month
 Serial.print("/");
 Serial.print(RTC.get(DS1307_YR,false)); //read year 
 Serial.println();

 delay(1000);

}


