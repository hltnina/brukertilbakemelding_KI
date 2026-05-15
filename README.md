# Brukertilbakemelding_KI

Dette repositoryet inneholder arbeidet vårt med bachelorprosjektet **Brukertilbakemelding_KI**, utviklet i samarbeid med **Tingtun AS**. Prosjektet undersøker hvordan **kunstig intelligens (KI)** kan brukes til å analysere og kategorisere brukertilbakemeldinger relatert til **universell utforming og WCAG**.

Prosjektet er gjennomført som en del av bachelorstudiet **IT og informasjonssystemer** ved **Universitetet i Agder**.


## Innholdsfortegnelse

- [Om prosjektet](#om-prosjektet)
- [Problemstilling](#problemstilling)
- [Mål](#mål)
- [Teknologier](#teknologier)
- [Prosjektstruktur](#prosjektstruktur)
- [Installasjon](#installasjon)
- [Kjøre prosjektet](#kjøre-prosjektet)
- [Datasett](#datasett)
- [Funksjonalitet](#funksjonalitet)
- [Resultater](#resultater)
- [Videre arbeid](#videre-arbeid)
- [Bidragsytere](#bidragsytere)



## Om prosjektet

Mange organisasjoner mottar store mengder brukertilbakemeldinger, men det kan være krevende å analysere og strukturere disse manuelt. I dette prosjektet undersøker vi hvordan kunstig intelligens kan brukes til å analysere tekstbaserte tilbakemeldinger og identifisere relevante mønstre og kategorier.

Formålet med prosjektet er å utvikle en prototype som kan bidra til å:

- analysere brukertilbakemeldinger automatisk
- identifisere mønstre i tekstdata
- kategorisere tilbakemeldinger etter type tilgjengelighetsproblem
- støtte arbeid med universell utforming og WCAG



## Problemstilling

Hvordan kan kunstig intelligens brukes til å analysere og kategorisere brukertilbakemeldinger på en måte som støtter arbeid med universell utforming og WCAG?



## Mål

Prosjektet har følgende hovedmål:

- Analysere tekstbaserte brukertilbakemeldinger
- Utforske bruk av KI og maskinlæring for tekstanalyse
- Kategorisere tilbakemeldinger basert på type problem
- Strukturere data slik at de blir enklere å analysere
- Utvikle en prototype som kan brukes som grunnlag for videre utvikling



## Teknologier

Prosjektet benytter følgende teknologier: React.js, Node.js, JavaScript, Express.js, Google Gemini API, GitHub API, Git, GitHub, Vercel og Render

Andre biblioteker og verktøy kan brukes for dataanalyse og modellutvikling.



## Prosjektstruktur

Prosjektet er delt inn i frontend og backend. Frontend er nettsiden brukeren ser og bruker for å skrive inn tilgjengelighetsfunn og laste opp bilder eller filer. Backend håndterer kommunikasjonen mellom nettsiden, KI-tjenesten og GitHub API.Når brukeren sender inn et funn, blir informasjonen sendt til backend som videre sender den til Google Gemini API for analyse. Deretter får brukeren opp forslag til GitHub Issues som kan leses gjennom og endres før de sendes videre til GitHub. Prosjektet er laget som en fullstack webapplikasjon med React i frontend og Node.js i backend.



## Installasjon 

For å kjøre nettsiden må repositoryet først klones fra GitHub. Etter dette må nødvendige pakker installeres med npm install. Frontend startes ved å gå inn i frontend-mappen og kjøre kommandoen npm run dev. Backend startes ved å gå inn i backend-mappen og kjøre npm start. Når både frontend og backend kjører, kan nettsiden åpnes i nettleseren og brukes lokalt på maskinen.



## Kjøre prosjektet

Prosjektet kjøres lokalt ved å starte både frontend og backend. Frontend kjøres fra frontend-mappen med kommandoen npm run dev, mens backend kjøres fra backend-mappen med kommandoen npm start. Når begge delene av prosjektet kjører, kan nettsiden åpnes i nettleseren gjennom den lokale lenken som vises i terminalen. Her kan brukeren skrive inn tilgjengelighetsfunn, laste opp filer og få forslag til GitHub Issues generert av KI.



## Datasett

Det blir brukt tekstbaserte brukertilbakemeldinger og tilgjengelighetsfunn fra Testfest. Tilbakemeldingene kan inneholde beskrivelser, bilder og annen informasjon om problemer på nettsider og digitale tjenester. Dataene blir sendt inn gjennom nettsiden og brukt av vår KI-tjeneste for å analysere innholdet og lage forslag til GitHub Issues. Målet med dataene er å gjøre tilbakemeldinger mer oversiktlige og enklere å jobbe videre med.



## Funksjonalitet 

Nettsiden gjør det mulig for brukerne å skrive inn et tilgjengelighetsfunn og laste opp bilder eller filer som viser problemet. Når brukeren sender inn funnet, blir innholdet analysert av KI. Etter analysen får brukeren forslag til et GitHub-issue. Forslaget kan inneholde beskrivelse av problemet, mulig WCAG-klassifisering og forslag til løsning. Brukeren kan lese gjennom og endre teksten før den sendes videre til GitHub. Løsningen er laget sånn at KI hjelper med å strukturere innholdet, men brukeren har fortsatt kontroll over hva som faktisk blir sendt inn.



## Resultater 

Dette resulterte i en fungerende prototype som kan analysere brukertilbakemeldinger og lage forslag til strukturerte GitHub-issues ved hjelp av KI. Løsningen viser hvordan kunstig intelligens kan brukes som støtte i arbeid med universell utforming og tilgjengelighet. Gjennom prosjektet fikk gruppen utviklet en fullstack webapplikasjon hvor brukeren kan sende inn tilgjengelighetsfunn, få forslag generert av KI og sende videre innholdet til GitHub. Resultatene viste også at KI kan bidra til å redusere manuelt arbeid og gjøre tilbakemeldinger mer oversiktlige og enklere å jobbe videre med. I tillegg viste prosjektet at menneskelig kontroll fortsatt er viktig for å sikre kvalitet og riktige forslag før informasjon sendes videre.



## Videre arbeid

Videre i prosjektet kan løsningen muligens utvikles med flere funksjoner og forbedringer. Blant annet så kan det legges til innlogging og brukerhåndtering for å gjøre systemet mer sikkert og tilpasset ulike brukere. Det er også mulig å videreutvikle KI-analysen slik at forslagene blir mer presise og detaljerte. Støtte for flere språk og bedre håndtering av større filer og video kan også være nyttig i en videre versjon av løsningen. I tillegg kan systemet forbedres med mer testing, bedre sikkerhet og flere funksjoner knyttet til GitHub og håndtering av tilgjengelighetsfunn.



## Bidragsytere

Prosjektet er utviklet av Christoffer Staupe, Erlend Falkeid, Nina Huynh, Mahsa Rasoli og Tringa Konxheli som en del av bachelorstudiet i IT og informasjonssystemer ved Universitetet i Agder. Prosjektet er gjennomført i samarbeid med Tingtun AS våren 2026.
