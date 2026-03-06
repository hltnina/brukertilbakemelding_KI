export default function Home() {
  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      {/* Navbar */}
      <header className="px-6 pt-8">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl bg-white px-10 py-5 shadow-md">
          <div className="flex items-center gap-4">
            <img src="/vite.svg" alt="Logo" className="h-10 w-10" />
            <span className="text-2xl font-semibold text-[#1f1f1f]">
              Gruppe 03
            </span>
          </div>

          <div className="flex gap-4">
            <button className="rounded-full border border-gray-300 bg-white px-6 py-2 text-lg text-[#1f1f1f]">
              Hjem
            </button>
            <button className="rounded-full border border-gray-300 bg-white px-6 py-2 text-lg text-[#1f1f1f]">
              Om oss
            </button>
            <button className="rounded-full border border-gray-300 bg-white px-6 py-2 text-lg text-[#1f1f1f]">
              Kontakt
            </button>
            <button className="rounded-full border border-gray-300 bg-white px-6 py-2 text-lg text-[#1f1f1f]">
              Github
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="mt-6 min-h-[680px] bg-[#234f9b] px-6 py-24 text-center text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center">
          <h1 className="mb-8 text-6xl font-bold md:text-7xl">Velkommen</h1>

          <p className="mx-auto mb-14 max-w-4xl text-2xl leading-relaxed md:text-3xl">
            Fra tilbakemelding til ferdig GitHub-Issue! Vi analyserer dine filer
            og foreslår konkrete utbedringer.
          </p>

          <button className="rounded-xl bg-white px-14 py-4 text-2xl font-semibold text-[#234f9b] shadow-md">
            Start nå →
          </button>
        </div>
      </section>

      {/* Rapportseksjon */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-8 text-5xl font-bold text-[#1f1f1f] md:text-6xl">
            Send inn din rapport
          </h2>

          <p className="mx-auto mb-16 max-w-4xl text-2xl leading-relaxed text-[#1f1f1f]">
            Beskriv problemet eller velg en prompt-mal. Last opp vedlegg og send
            inn for umiddelbare svar! Se gjennom og send deretter direkte til
            Github issues.
          </p>
        </div>

        {/* Blå boks */}
        <div className="mx-auto max-w-5xl rounded-[28px] bg-[#6f99cf] px-14 py-16 shadow-sm">
          <h3 className="mb-12 text-5xl font-bold text-black">Konfigurasjon</h3>

          <div className="space-y-10">
            <div>
              <label className="mb-3 block text-2xl font-medium text-black">
                Tittel på sak*
              </label>
              <input
                type="text"
                placeholder="Tittel på sak..."
                className="w-full rounded-2xl bg-white px-5 py-4 text-xl shadow-md outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block text-2xl font-medium text-black">
                Problembeskrivelse*
              </label>
              <textarea
                rows="6"
                placeholder="Legg inn din beskrivelse..."
                className="w-full rounded-2xl bg-white px-5 py-4 text-xl shadow-md outline-none"
              />
            </div>

            <div>
              <p className="mb-5 text-2xl font-medium text-black">
                Eller velg et av følgende alternativ
              </p>

              <div className="flex flex-wrap gap-6">
                <button
                  type="button"
                  className="rounded-xl bg-white px-8 py-4 text-xl text-[#1f1f1f] shadow-md"
                >
                  Opprett feilmelding
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-white px-8 py-4 text-xl text-[#1f1f1f] shadow-md"
                >
                  Foreslå forbedring
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-white px-8 py-4 text-xl text-[#1f1f1f] shadow-md"
                >
                  Alvorlighetsgrad
                </button>
              </div>
            </div>

            <div>
              <label className="mb-3 block text-2xl font-medium text-black">
                Last opp vedlegg (i form av fil, bilde eller video)*
              </label>
              <input
                type="file"
                className="block rounded-xl bg-white px-4 py-3 text-lg shadow-md"
              />
            </div>

            <div className="pt-6 text-center">
              <button
                type="button"
                className="rounded-2xl bg-[#1f3d78] px-16 py-4 text-2xl font-semibold text-white shadow-md"
              >
                Send inn
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 bg-[#efefef] px-6 py-16">
        <div className="mx-auto flex max-w-4xl items-start gap-6">
          <img src="/vite.svg" alt="Logo" className="h-12 w-12" />

          <div className="text-[#1f1f1f]">
            <h4 className="mb-4 text-3xl font-semibold">Kontakt Informasjon</h4>
            <p className="mb-2 text-2xl">
              <strong>Tlf:</strong> +47 918 62 892
            </p>
            <p className="mb-4 text-2xl">
              <strong>E-postadresse:</strong> contact@tingtun.no
            </p>
            <p className="text-xl italic">
              Utviklet i samarbeid med Gruppe 03 og Tingtun
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}