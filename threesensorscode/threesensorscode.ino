






float val0 = 0;
float val1 = 0;
float val2 = 0;  
float DIVval0;
float FinalOP0; 
void setup() {
  Serial.begin(9600);           //  setup serial
}

void loop() {
  val0 = analogRead(A0);  
 val1 = analogRead(A1);
  val2 = analogRead(A2);
 
  DIVval0 = val0/1024;
   FinalOP0 =  (2.995*pow(DIVval0, 0.9054));
  
  
  
  
  Serial.print(val0,2); Serial.print("lib value:");   Serial.println(FinalOP0,7);     
  //Serial.print(" "); Serial.print(DIVval,6);  Serial.print(" ");  Serial.println(FinalOP,6);
delay(2000);

}
