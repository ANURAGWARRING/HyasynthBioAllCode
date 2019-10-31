
int x = 250000;
int y = 10;
void setup() {
  pinMode(13, OUTPUT);
}
void loop() {
  digitalWrite(13, HIGH);   
  delay(y);              
  digitalWrite(13, LOW);   
  delay(y-120000); 
              
}








