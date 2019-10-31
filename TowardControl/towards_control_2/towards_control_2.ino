

//All the sensors are in higher range

//All the variables of analog_Sensor_1_preferbally for Co2 You Wont need to change the variables
float rawCountCo2; //create global variable for reading from A/D converter (0-1023)
float voltageCo2; //create global variable for voltage (0-5V)
float slopeCo2_ppm = 25000;
float interceptCo2_ppm = 200 ;
float sensorValueCo2_ppm ;


//All the variable of analog_Sensor_2,preferbally for o2 You Wont need to change the variables
float rawCountO2; //create global variable for reading from A/D converter (0-1023)
float voltageO2; //create global variable for voltage (0-5V)
float slopeO2_ppm = 65625 ;
float interceptO2_ppm = 0 ;
float sensorValueO2_ppm;

//Declaring baseline variables
float BaselineO2_value = (212768+213729+213409+212448)/4;
float BaselineCo2_value = (444.14+566.14)/2;

// Declaring num and den
float num,den;


float ratio;

 
//measuring computational time for both sensors
float timefor_co2;
void setup() {
  Serial.begin(9600); //setup communication to display
  pinMode(13, OUTPUT);
  


  
}
 
void loop() {

      
  // Calculation of a1 sensor
  rawCountCo2 = analogRead(A0); 
  voltageCo2 =rawCountCo2/1024*5; 
  sensorValueCo2_ppm = slopeCo2_ppm*voltageCo2+interceptCo2_ppm ;
timefor_co2 = millis();
 Serial.println("time for co2 computation");
  Serial.println(timefor_co2);

   // Calculation of a2 sensor
  rawCountO2 = analogRead(A2); 
  voltageO2 =rawCountO2/1024*5; 
  sensorValueO2_ppm = slopeO2_ppm*voltageO2+interceptO2_ppm ;

  //Calculation of diffrence;
  num = (sensorValueCo2_ppm - BaselineCo2_value);
  den = ( BaselineO2_value - sensorValueO2_ppm );
  

  //Calcuation of ratio;
  ratio = num/den;
   
   Serial.print("sensorValueCo2_ppm"); Serial.print("\t");    Serial.print(sensorValueCo2_ppm);  Serial.print("\t");
    Serial.print("sensorValueO2_ppm"); Serial.print("\t");  Serial.print(sensorValueO2_ppm);   Serial.print("\t");
    Serial.print("BaselineCo2_value");Serial.print("\t");  Serial.print(BaselineCo2_value);       Serial.print("\t");
    Serial.print("BaselineO2_value"); Serial.print("\t");  Serial.print(BaselineO2_value);      Serial.print("\t");
   Serial.print("num");               Serial.print("\t");  Serial.print(num);   Serial.print("\t");
  Serial.print("den");        Serial.print("\t");    Serial.print(den);   Serial.print("\t");
   Serial.print("CO2/O2 Ratio in ppm");    Serial.print("\t");    Serial.println(ratio,6);
   delay(500);

   if (ratio >= 1.10)
   {digitalWrite(13, HIGH);
   
   
   
   }
   else               {digitalWrite(13, LOW);}
 


  
  
 }

 

  
  
  
  
  
  

  


  
  
  //wait half second
  
 
  
  

