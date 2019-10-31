//variables for analog pin 0
float rawCountEtoh0; //create global variable for reading from A/D converter (0-1023)
float voltageEtoh0[10]; //create global variable for voltage (0-5V)
float sensorValueEtoh0[10];

//variables for analog pin 1
float rawCountEtoh1; //create global variable for reading from A/D converter (0-1023)
float voltageEtoh1[10]; //create global variable for voltage (0-5V)
float sensorValueEtoh1[10];


//variables for analog pin 2
float rawCountEtoh2; //create global variable for reading from A/D converter (0-1023)
float voltageEtoh2[10]; //create global variable for voltage (0-5V)
float sensorValueEtoh2[10];


//variables for sum & avg
float sum0,sum1,sum2;
float sum0p,sum1p,sum2p;
float avg0,avg1,avg2;
float avg0p,avg1p,avg2p;

//variables for loops
int i,count=0;
float countprgrm;
void setup() {
 Serial.begin(9600);

}

void loop() {
 
   sum0=0;sum2=0;sum1=0;
   sum0p=0;sum1p=0,sum2p=0;
   
   
  for (i=0;i<9;i++)
  {

    //sensor in Analog Pin 0
  rawCountEtoh0 = analogRead(A0);
  voltageEtoh0[i] = rawCountEtoh0/1024*5;
  sensorValueEtoh0[i] =  (pow(voltageEtoh0[i]/1.5272,(-1/0.277)));
  sum0 = sum0 + voltageEtoh0[i];
   sum0p = sum0p + sensorValueEtoh0[i];


  //sensor in Analog Pin 1
  rawCountEtoh1 = analogRead(A1);
  voltageEtoh1[i] = rawCountEtoh1/1024*5;
  sensorValueEtoh1[i] =  (pow(voltageEtoh1[i]/0.836,(1/-0.318)));
  sum1 = sum1 + voltageEtoh1[i];
  sum1p = sum1p + sensorValueEtoh1[i];
 
 
 
 
  //sensor in analog Pin 2
  rawCountEtoh2 = analogRead(A2);
  voltageEtoh2[i] = rawCountEtoh2/1024*5;
  sensorValueEtoh2[i] =  (0.83*pow(voltageEtoh2[i]/2.89,(1/-0.164)));
  sum2 = sum2 +  voltageEtoh2[i];
   sum2p = sum2p + sensorValueEtoh2[i];
   
   
 delay(500);




 

  }
   
   
  avg0 = sum0/10;  avg1 = sum1/10; avg2 = sum2/10;
  avg0p = sum0p/10;  avg1p = sum1p/10; avg2p = sum2p/10;
   countprgrm++;
 
Serial.print (",");Serial.print(countprgrm*5); Serial.print (","); Serial.print ("  ");Serial.print ("A0V");Serial.print (","); Serial.print ("  "); Serial.print(avg0);Serial.print (","); Serial.print ("  ");Serial.print ("A1V");Serial.print (","); Serial.print ("  "); Serial.print(avg1); Serial.print (","); Serial.print ("  ");   Serial.print ("A2v");Serial.print (","); Serial.print ("  "); Serial.print(avg2);
   Serial.print (","); Serial.print ("  ");Serial.print ("A0 Sensor");Serial.print (","); Serial.print ("  "); Serial.print(avg0p);Serial.print (","); Serial.print ("  ");Serial.print ("A1 Sensor");Serial.print (","); Serial.print ("  "); Serial.print(avg1p); Serial.print (","); Serial.print ("  ");   Serial.print ("A2 Sensor");Serial.print (","); Serial.print ("  "); Serial.print(avg2p);Serial.print (","); Serial.println ("  ");  
 
 //if (avg0p  >= 0.23)

 // {    
  //  digitalWrite(13, HIGH);
 //   Serial.print("Pump A0 is OFF");  Serial.print(" ");
 // }
   
                 
  //else           //    {digitalWrite(13, LOW);
                         
                      //    Serial.print("timewhilePumpisOn:");Serial.print (","); Serial.print(count*2); Serial.print (","); Serial.print(" ");  Serial.println("s");
                   //       count++;
 
//  }


 // if (avg0p  >= 0.23)

 // {    
  //  digitalWrite(12, HIGH);
 //   Serial.print("Pump A1 is OFF");
 // }
   
                 
  //else              // {digitalWrite(12, LOW);
                         
                          //Serial.print("timewhilePumpisOn:");Serial.print (","); Serial.print(count*2); Serial.print(" ");  Serial.println("s");
                        //  count++;
 
 // }

 


   //if (avg0p  >= 0.23)

 // {    
    //digitalWrite(8, HIGH);
   // Serial.println("Pump A2 is OFF     "); Serial.println(" ");
  //}
   
                 
//  else               {digitalWrite(8, LOW);
                         
                       //   Serial.print("timewhilePumpisOn:"); Serial.print(count*2); Serial.print(" ");  Serial.println("s");
                       //   count++;
 
  //}





}

