import InputField from './InputField'
import TextAreaField from './TextAreaField'

function ReportForm({ onSubmit }) {
  return (
    <div className="report-form-shell">
      <h3>Konfigurasjon</h3>

      <InputField
        label="Tittel på sak*"
        id="report-title"
        placeholder="Tittel på sak..."
      />

      <TextAreaField
        label="Problembeskrivelse*"
        id="report-description"
        placeholder="Legg inn din beskrivelse..."
      />

      <div className="option-group">
        <p>Eller velg et av følgende alternativ</p>

        <div className="option-buttons">
          <button type="button">Opprett feilmelding</button>
          <button type="button">Foreslå forbedring</button>
          <button type="button">Alvorlighetsgrad</button>
        </div>
      </div>

      <div className="upload-group">
        <p>Last opp vedlegg (i form av fil, bilde eller video)*</p>
        <button type="button" className="upload-button">
          Last opp
          <svg
            className="upload-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M12 16V4M12 4L7 9M12 4L17 9M5 15L5 18C5 19.1046 5.89543 20 7 20H17C18.1046 20 19 19.1046 19 18V15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <button type="button" className="submit-button" onClick={onSubmit}>
        Send inn
      </button>
    </div>
  )
}

export default ReportForm
