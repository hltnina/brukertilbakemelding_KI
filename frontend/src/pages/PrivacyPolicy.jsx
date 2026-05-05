const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="mx-auto max-w-3xl bg-white p-8 rounded-xl shadow-md space-y-6">

                <h1 className="text-3xl font-bold">Personvernerklæring</h1>

                <p>
                    Denne løsningen er utviklet som en del av et bachelorprosjekt og har som formål
                    å samle inn og analysere tilbakemeldinger knyttet til universell utforming.
                </p>

                <div>
                    <h2 className="text-xl font-semibold">Hvilken informasjon samles inn?</h2>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Beskrivelse av problemet (fritekst)</li>
                        <li>Eventuelle vedlegg (bilder eller dokumenter)</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Hvordan brukes informasjonen?</h2>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Analyse av tilgjengelighetsproblemer ved hjelp av KI</li>
                        <li>Opprettelse av saker (issues) i GitHub for videre oppfølging</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Deling av data</h2>
                    <p className="mt-2">
                        For å analysere innholdet benytter vi en ekstern KI-tjeneste (Google Gemini API).
                        Dette innebærer at tekst og eventuelle bilder sendes til Google for behandling.{" "}

                        <a
                        href="https://ai.google.dev/gemini-api/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                        >
                          Les mer om hvordan Google behandler data her.
                        </a>
                         

                        
                        
                    </p>
                    <p className="mt-2">
                        I tillegg sendes informasjon videre til GitHub via GitHub API for å opprette en sak (issue).
                        Denne saken kan inneholde beskrivelse og analyse av problemet.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Lagring av data</h2>
                    <p className="mt-2">
                        Systemet lagrer ikke data i en egen database. Informasjonen behandles midlertidig
                        i forbindelse med analyse, og sendes deretter videre til GitHub dersom en sak opprettes.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Personvern og ansvar</h2>
                    <p className="mt-2">
                        Brukere oppfordres til å ikke inkludere sensitiv eller personlig informasjon i
                        beskrivelser eller vedlegg. Data som sendes til eksterne tjenester (Google og GitHub)
                        behandles i henhold til deres respektive personvernerklæringer.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Informasjonskapsler (cookies)</h2>
                    <p className="mt-2">
                        Denne løsningen bruker ikke cookies til sporing eller analyse.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">Kontakt</h2>
                    <p className="mt-2">
                        Dersom du har spørsmål om personvern i løsningen, ta kontakt med utviklingsteamet.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default PrivacyPolicy