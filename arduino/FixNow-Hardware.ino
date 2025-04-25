#include "DHT.h"

#define DHTPIN 2

#define potenciometro A0

#define DHTTYPE DHT11 
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
  pinMode(potenciometro, INPUT);

}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float temp1 = analogRead(potenciometro);
  float temp2 = random(0, 100);
  temp1 = map(temp1, 0, 1023, 0, 100);

  Serial.print("{\"temperatura1\":");
  Serial.print(temp1);
  Serial.print(", \"temperatura2\":");
  Serial.print(temp2);
  Serial.println("}");

  delay(1000);

}
