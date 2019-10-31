4+0 //create global variable for reading from A/D converter (0-1023)
float voltageO2; //create global variable for voltage (0-5V)
float slopeO2_ppm = 65625 ;
float interceptO2_ppm = 0 ;
float sensorValueO2_ppm;
int period = 5000; int period2 = 5000;
unsigned long time_now = 0;   unsigned long time_now2 = 0;
float  O2_before_avg[10]; float rawCountO2[10];float sum = 0; float avg;
int i, j;
 

void setup()
{
  Serial.begin(9600);
}

void loop()

 {
 for  (i=0;i<9;i++) { time_now = millis(); rawCountO2[i] = analogRead(A0);  voltageO2 =rawCountO2[i]/1024*5;  O2_before_avg[i] = slopeO2_ppm*voltageO2+interceptO2_ppm ;
                      while(millis() < time_now + period){}   Serial.print(i); Serial.print("value is");  Serial.println(  O2_before_avg[i]) ;  sum= sum + O2_before_avg[i];
                      }  //to read values and feed it into array
                     
                     
                      
                          Serial.print(" Sum is:");   Serial.print(sum);  Serial.print(" avg is:");   Serial.println(sum/10);
                          
  
                                                                                                                                                                                                                               

                                                                                                           
                                                                                                          
                                                                                                          
                                                                                                           
                                                                                                                                                                                         
                                          }  //1st while closed 

