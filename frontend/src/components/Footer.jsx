const Footer = () => {
  return (
    <footer
      id="contact-section"
      className="w-full bg-gray-100 px-6 py-12"
    >
      <div className="mx-auto flex max-w-3xl items-start justify-center gap-6 text-slate-900">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-sky-100 text-xs font-semibold text-sky-900">
          G03
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Kontakt Informasjon</h2>
          <p className="text-base">
            <span className="font-semibold">Tlf:</span> +47 918 62 892
          </p>
          <p className="text-base">
            <span className="font-semibold">E-postadresse:</span>{' '}
            <a href="mailto:contact@tingtun.no">contact@tingtun.no</a>
          </p>
          <p className="text-base italic text-slate-600">
            Utviklet i samarbeid med Gruppe 03 og Tingtun
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
