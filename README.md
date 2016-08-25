# ThingsHub
## CLI IoT interface monitor

ThingsHub is een cli interface gebaseerde applicatie, gekoppeld aan hardware. ThingsHub biedt de mogelijkheid om meerdere interfaces toe te voegen, en hier de data van te verzamelen. De data kan niet enkel worden weergegeven maar ook worden weggeschreven naar een extern bestand.
Momenteel zijn de mogelijke interfaces een seriele poort (USB) en een MQTT topic.

#### Auteurs
* Kevin van de Mieroop - <kevin.vandemieroop@student.ap.be>
* Michiel Mulder - <michiel.mulder@student.ap.be>

#### Leerkracht
* Maarten Luyts - <maarten.luyts@ap.be>

## Installatie

Vooraleer gebruik te maken van de applicatie dienen de nodige dependencies te worden geinstalleerd. Ook moet de prefix/package name globaal worden gelinked zodat de thingshub command overal en altijd gebruikt kan worden.

    npm install

    npm link

### Dependencies

De gebruikte dependencies worden hieronder opgelijst:

#### Node modules

  * *Commander* - library voor het maken van commands; geeft eveneens de mogelijkheid om er options aan te koppelen
  * *MQTT* - MQTT library om een connectie te maken met een bepaalde broker, en te subscriben op een topic ervan
  * *Serialport* - npm module die de mogelijkheid biedt om de seriele poorten te gebruiken (openen, sluiten, oplijsten)
  * *ShellJS* - creeert de mogelijkheid om unix shell commands te gebruiken binnen de Node.JS interface
  * *json-stringify-safe* - maakt het mogelijk om circulaire objecten te converteren naar json objecten

#### Files

  * *thingshub.js* - main file van de package, bevat alle code van de applicatie zelf
  * *things.json* - config file waarin alle gekoppelde interfaces worden opgeslagen
  * *data.json* - elk datapoint wordt hierin weggeschreven als een apart object

## Gebruik

Hier zal het gebruik van elke command worden uitgelegd.

  * **thingshub list-available-interfaces** - lijst alle open seriele poorten op en geeft zowel de naam ervan als de manufacturer van de peripheral.
  * **thingshub attach < INTERFACE > [ --dissect <DISSECTOR>] [ --silent ]** - koppelt een interface aan de applicatie. De naam van de interface dient mee met de command te worden meegegeven. Eventuele opties zijn een parser toevoegen (-d) of silent mode. In silent mode wordt de data niet gelogd, maar wel weggeschreven in het data.json bestand. De interface wordt dan, samen met de opties, opgeslagen als een apart object binnen het things.json bestand.
  * **thingshub watch < INTERFACE >** - logt de binnenkomende data van 1 meegegeven interface. Meer wordt er niet met de data gedaan.
  * **thingshub start** - start de applicatie. Er wordt gekeken naar het things.json bestand om de gekoppelde interfaces op te halen, en de opties die erbij horen. Ze worden dan allemaal tegelijk geopend. De command kan gestopt worden aan de hand van control-C; hierdoor sluiten de poorten en de MQTT connecties.
