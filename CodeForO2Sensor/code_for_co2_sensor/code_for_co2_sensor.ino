


char rx_byte = 0;
//All the variables of analog_Sensor_1_preferbally for Co2 You Wont need to change the variables
float rawCountA1; //create global variable for reading from A/D converter (0-1023)
float voltageA1; //create global variable for voltage (0-5V)
float slopeA1_ppm  ;
float interceptA1_ppm ;
float sensorValueA1_ppm;


//All the variable of analog_Sensor_2,preferbally for o2 You Wont need to change the variables
float rawCountA2; //create global variable for reading from A/D converter (0-1023)
float voltageA2; //create global variable for voltage (0-5V)
float slopeA2_ppm ;
float interceptA2_ppm ;
float sensorValueA2_ppm;


float ratio;
 //Select your units
 

void setup() {
  Serial.begin(9600); //setup communication to display
   Serial.println("Select your units based on the following table:");
   Serial.println("For ppm select 1: ");
   Serial.println("For pp10m select 2: ");
   Serial.println("For percentage select 3 ");
  



  
}
 
void loop() {
 if (Serial.available() > 0)
 rx_byte = Serial.read(); 
 if (rx_byte >= '1') {
  
  slopeA1_ppm = 2500 ;
    interceptA1_ppm = 20;
    slopeA2_ppm = 65625;
    interceptA2_ppm = 0;
      
  // Calculation of a2 sensor
  rawCountA2 = analogRead(A2); 
  voltageA2 =rawCountA2/1024*5; 
  sensorValueA2_ppm = slopeA2_ppm*voltageA2+interceptA2_ppm ;

// Calculation of a1 sensor
  rawCountA1 = analogRead(A0); 
  voltageA1 =rawCountA1/1024*5; 
  sensorValueA1_ppm = slopeA1_ppm*voltageA1+interceptA1_ppm ;

  //Calcuation of ratio;
  ratio = sensorValueA1_ppm/ sensorValueA2_ppm;

  Serial.print(sensorValueA1_ppm);
  Serial.print("\t");
  Serial.print(sensorValueA2_ppm);
  Serial.print("\t");
  Serial.print("CO2/O2 Ratio in ppm");
  Serial.print("\t");
  Serial.println(ratio,6);
   delay(500); 
  
  }

  
 rx_byte = Serial.read(); 
 if (rx_byte >= '2') {
  slopeA1_ppm = 25000 ;
   interceptA1_ppm = 200;
     slopeA2_ppm = 656250;
    interceptA2_ppm = 0;
      
  // Calculation of a2 sensor
  rawCountA2 = analogRead(A2); 
  voltageA2 =rawCountA2/1024*5; 
  sensorValueA2_ppm = slopeA2_ppm*voltageA2+interceptA2_ppm ;

// Calculation of a1 sensor
  rawCountA1 = analogRead(A0); 
  voltageA1 =rawCountA1/1024*5; 
  sensorValueA1_ppm = slopeA1_ppm*voltageA1+interceptA1_ppm ;

  //Calcuation of ratio;
  ratio = sensorValueA1_ppm/ sensorValueA2_ppm;

  Serial.print(sensorValueA1_ppm);
  Serial.print("\t");
  Serial.print(sensorValueA2_ppm);
  Serial.print("\t");
  Serial.print("CO2/O2 Ratio in ppm");
  Serial.print("\t");
  Serial.println(ratio,6);
   delay(500); 
  
 }

 rx_byte = Serial.read(); 
 if (rx_byte >= '3')
  {
  slopeA1_ppm = 2.5 ;
    interceptA1_ppm = 0.2;
    slopeA2_ppm = 65625;
    interceptA2_ppm = 0;
      
  // Calculation of a2 sensor
  rawCountA2 = analogRead(A2); 
  voltageA2 =rawCountA2/1024*5; 
  sensorValueA2_ppm = slopeA2_ppm*voltageA2+interceptA2_ppm ;

// Calculation of a1 sensor
  rawCountA1 = analogRead(A0); 
  voltageA1 =rawCountA1/1024*5; 
  sensorValueA1_ppm = slopeA1_ppm*voltageA1+interceptA1_ppm ;

  //Calcuation of ratio;
  ratio = sensorValueA1_ppm/ sensorValueA2_ppm;

  Serial.print(sensorValueA1_ppm);
  Serial.print("\t");
  Serial.print(sensorValueA2_ppm);
  Serial.print("\t");
  Serial.print("CO2/O2 Ratio in ppm");
  Serial.print("\t");
  Serial.println(ratio,6);
   delay(500); 
  
  }
  
  
  
  
  
  
  

  


  
  
  //wait half second
  
 
  
  
}
