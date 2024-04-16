Web verzija Videoteca. FrontEnd: Angular.
Ideja: Zaradi velikega števila posnetih filmov na različnih zunanjih diskih, sem želel voditi seznam filmov in njihovo lokacijo. Tako sem lahko z to aplikacijo hitro najdel določen filem.
Uporablja MSSqlServer14 za hrambo.
(SpringBoot BE) http://localhost:8080/
(Angular FE) http://localhost:4200/

Pot http://localhost:4200/ vodi na Videoteca, kot neprijavljen uporabik.
Neprijavljen uporabnik lahko le gleda seznam naloženih lilmov:
![image](https://github.com/damko81/AngularVideotekaFE/assets/162964541/cb01d540-96d0-4615-a3ad-5ee5cdd7f203)

Novi uporabnik izvede registracijo z klikom na Register:

![image](https://github.com/damko81/AngularVideotekaFE/assets/162964541/737d9b0e-995b-4d31-aff7-3eabc9fc95e1)

Ob prijavi z registriranim uporabnikom:

![image](https://github.com/damko81/SprVideotekaBE/assets/162964541/29015b0e-21cd-482f-82e1-0d8f3b79ba68)

Se odprejo razširjene možnosti videoteke:

![image](https://github.com/damko81/AngularVideotekaFE/assets/162964541/0b2f8bb3-b708-45f9-947b-e46d4be29745)

Izberem možnost Load movies, kjer vpišemo direktorij z filmi.
Filmi, ki so na izbranem direktoriju, se uvozijo v MSSqlServer14. Podatki o filmih se napolnejo preko IMDB parserja, ki je ročno narejen, torej se lahko z časom spreminja. Ta akcija je edina, ki mora vsebovati internetno povezavo, vse ostale akcije delujejo nad obstoječo podatkovno bazo in interneta več ne potrebuje.

![image](https://github.com/damko81/SprVideotekaBE/assets/162964541/09e718f4-1ce0-46f7-b96c-7fea530c40a7)

Prijava z autenticiranim uporabnikom admin:

![image](https://github.com/damko81/AngularVideotekaFE/assets/162964541/73196116-37c9-4296-b523-288930423fd7)

Odprejo se administracijske možnosti, npr. Users za urejanje registriranih uporabnikov:

![image](https://github.com/damko81/AngularVideotekaFE/assets/162964541/65b00b5e-c528-4ae9-a044-d3b3837e82c6)

Pregled Users:

![image](https://github.com/damko81/AngularVideotekaFE/assets/162964541/1d7a495f-9a89-42a9-a156-8f962313ef90)

Edit:

![image](https://github.com/damko81/AngularVideotekaFE/assets/162964541/bc240fcc-74fb-450c-8104-5d8edddf6a13)

Popravljanje uporabniškega profila prijavljenega uporabnika:

![image](https://github.com/damko81/SprVideotekaBE/assets/162964541/53350985-757e-4748-b4cc-5f74aea2bdc5)

![image](https://github.com/damko81/SprVideotekaBE/assets/162964541/58759df1-9df9-4c89-a8ad-943582b11c5a)


