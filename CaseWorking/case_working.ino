
byte b;
float baseline_of_co2;
float baseline_of_o2;


void setup() {
    
  Serial.begin(9600);
  Serial.println("Enter 1 if you are inside reactor");
Serial.println("Enter 2 if you are inside airtank");
  
  

}

void loop() {

  while (Serial.available() == 0){}
  b = Serial.read() - 48;
  //Serial.println(b);
 
switch (b)
{
    case 1:    
      Serial.println("You are inside reactor");
     baseline_of_co2 = 925;
     baseline_of_o2 =  222061.15;
       Serial.println(baseline_of_co2);
      break;
    case 2:    
      Serial.println("You are inside airtank");
      baseline_of_co2  = 566;
      baseline_of_o2 =  218566;
      Serial.println(baseline_of_co2);
      break;
    
  }
  delay(1);    




}
