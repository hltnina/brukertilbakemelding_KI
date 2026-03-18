import { useRef, useState } from 'react'
import InputField from './InputField'
import TextAreaField from './TextAreaField'

function ReportForm({ onSubmit }) {
  const fileInputRef = useRef(null)
  const [selectedFileName, setSelectedFileName] = useState('')

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    setSelectedFileName(file ? file.name : '')
  }

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
        <input
          ref={fileInputRef}
          type="file"
          className="upload-input"
          accept="image/*,video/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="upload-button"
          onClick={handleUploadClick}
        >
          Last opp
        </button>
        {selectedFileName ? (
          <span className="upload-file-name">Valgt fil: {selectedFileName}</span>
        ) : null}
      </div>

      <button type="button" className="submit-button" onClick={onSubmit}>
        Send inn
      </button>
    </div>
  )
}

export default ReportForm
