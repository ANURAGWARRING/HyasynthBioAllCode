
//assign digital pins
int EN = 2;
int S0 = 3;
int S1 = 4;
int S2 = 5;
int S3 = 6;
//create output number calls
void out0()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, LOW);
 digitalWrite (S1, LOW);
 digitalWrite (S2, LOW);
 digitalWrite (S3, LOW);
}
void out1()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, HIGH);
 digitalWrite (S1, LOW);
 digitalWrite (S2, LOW);
 digitalWrite (S3, LOW);
}
void out2()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, LOW);
 digitalWrite (S1, HIGH);
 digitalWrite (S2, LOW);
 digitalWrite (S3, LOW);
}
void out3()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, HIGH);
 digitalWrite (S1, HIGH);
 digitalWrite (S2, LOW);
 digitalWrite (S3, LOW);
}
void out4()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, LOW);
 digitalWrite (S1, LOW);
 digitalWrite (S2, HIGH);
 digitalWrite (S3, LOW);
}
void out5()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, HIGH);
 digitalWrite (S1, LOW);
 digitalWrite (S2, HIGH);
 digitalWrite (S3, LOW);
}
void out6()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, LOW);
 digitalWrite (S1, HIGH);
 digitalWrite (S2, HIGH);
 digitalWrite (S3, LOW);
}
void out7()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, HIGH);
 digitalWrite (S1, HIGH);
 digitalWrite (S2, HIGH);
 digitalWrite (S3, LOW);
}
void out8()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, LOW);
 digitalWrite (S1, LOW);
 digitalWrite (S2, LOW);
 digitalWrite (S3, HIGH);
}
void out9()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, HIGH);
 digitalWrite (S1, LOW);
 digitalWrite (S2, LOW);
 digitalWrite (S3, HIGH);
}
void out10()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, LOW);
 digitalWrite (S1, HIGH);
 digitalWrite (S2, LOW);
 digitalWrite (S3, HIGH);
}
void out11()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, HIGH);
 digitalWrite (S1, HIGH);
 digitalWrite (S2, LOW);
 digitalWrite (S3, HIGH);
}
void out12()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, LOW);
 digitalWrite (S1, LOW);
 digitalWrite (S2, HIGH);
 digitalWrite (S3, HIGH);
}
void out13()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, HIGH);
 digitalWrite (S1, LOW);
 digitalWrite (S2, HIGH);
 digitalWrite (S3, HIGH);
}
void out14()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, LOW);
 digitalWrite (S1, HIGH);
 digitalWrite (S2, HIGH);
 digitalWrite (S3, HIGH);
}
void out15()
{
 digitalWrite (EN, HIGH);
 digitalWrite (S0, HIGH);
 digitalWrite (S1, HIGH);
 digitalWrite (S2, HIGH);
 digitalWrite (S3, HIGH);
}
//bypass mux
void bypass()
{
 digitalWrite (EN, HIGH);
}
//test mux
int pinCount;
//
void setup()
{
 //open serial for monitor, set pinMode
 Serial.begin (9600);
 pinMode (EN, OUTPUT);
 pinMode (S0, OUTPUT);
 pinMode (S1, OUTPUT);
 pinMode (S2, OUTPUT);
 pinMode (S3, OUTPUT);
}
//
void loop()
{
 void out15();
}
