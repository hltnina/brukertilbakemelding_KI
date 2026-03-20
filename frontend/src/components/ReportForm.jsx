import { useRef, useState } from 'react'
import InputField from './InputField'
import TextAreaField from './TextAreaField'

const createEmptyIssue = (index) => ({
  id: `issue-${index}-${Date.now()}`,
  title: '',
  description: '',
  template: '',
})

const promptTemplates = {
  bug: {
    label: 'Opprett feilmelding',
    text: 'Beskriv feilen du opplever, hvor den oppstår, hva du gjorde da den oppsto, og hva du forventet skulle skje.',
  },
  improvement: {
    label: 'Foreslå forbedring',
    text: 'Beskriv hva som kan forbedres, hvorfor det vil hjelpe brukeren, og hvor i løsningen denne forbedringen gjelder.',
  },
  severity: {
    label: 'Alvorlighetsgrad',
    text: 'Beskriv hvor alvorlig problemet er, hvem det påvirker, og om det hindrer bruk av tjenesten helt eller delvis.',
  },
}

function ReportForm({ issues, setIssues, onSubmit }) {
  const fileInputRef = useRef(null)
  const [selectedFileName, setSelectedFileName] = useState('')

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    setSelectedFileName(file ? file.name : '')
  }

  const handleIssueChange = (issueId, field, value) => {
    setIssues((currentIssues) =>
      currentIssues.map((issue) =>
        issue.id === issueId ? { ...issue, [field]: value } : issue
      )
    )
  }

  const handleApplyTemplate = (issueId, templateKey) => {
    setIssues((currentIssues) =>
      currentIssues.map((issue) =>
        issue.id === issueId
          ? issue.template === templateKey
            ? {
                ...issue,
                description: '',
                template: '',
              }
            : {
                ...issue,
                description: promptTemplates[templateKey].text,
                template: templateKey,
              }
          : issue
      )
    )
  }

  const handleAddIssue = () => {
    setIssues((currentIssues) => [
      ...currentIssues,
      createEmptyIssue(currentIssues.length + 1),
    ])
  }

  const handleRemoveIssue = (issueId) => {
    setIssues((currentIssues) =>
      currentIssues.filter((issue) => issue.id !== issueId)
    )
  }

  return (
    <div className="report-form-shell">
      <h3>Konfigurasjon</h3>

      <div className="issue-list">
        {issues.map((issue, index) => (
          <section key={issue.id} className="issue-card">
            <div className="issue-card-header">
              <h4>Problem {index + 1}</h4>
              {issues.length > 1 ? (
                <button
                  type="button"
                  className="remove-issue-button"
                  onClick={() => handleRemoveIssue(issue.id)}
                >
                  Fjern
                </button>
              ) : null}
            </div>

            <InputField
              label="Tittel på sak*"
              id={`report-title-${issue.id}`}
              placeholder="Tittel på sak..."
              value={issue.title}
              onChange={(event) =>
                handleIssueChange(issue.id, 'title', event.target.value)
              }
            />

            <TextAreaField
              label="Problembeskrivelse*"
              id={`report-description-${issue.id}`}
              placeholder="Legg inn din beskrivelse..."
              value={issue.description}
              onChange={(event) =>
                handleIssueChange(issue.id, 'description', event.target.value)
              }
            />

            <div className="option-group">
              <p>Eller velg et av følgende alternativ</p>

              <div className="option-buttons">
                {Object.entries(promptTemplates).map(([templateKey, template]) => (
                  <button
                    key={templateKey}
                    type="button"
                    className={issue.template === templateKey ? 'is-active' : ''}
                    onClick={() => handleApplyTemplate(issue.id, templateKey)}
                  >
                    {template.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        ))}

        <div className="add-issue-panel">
          <p>
            Har du funnet flere problemer? Trykk på + for å legge
            til flere problemer.
          </p>
          <button
            type="button"
            className="add-issue-button"
            onClick={handleAddIssue}
          >
            <span className="add-issue-icon" aria-hidden="true">
              +
            </span>
            Legg til et nytt problem
          </button>
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
        {selectedFileName ? (
          <span className="upload-file-name">Valgt fil: {selectedFileName}</span>
        ) : null}
      </div>

      <button
        type="button"
        className="submit-button"
        onClick={() => onSubmit(issues)}
      >
        Send inn
      </button>
    </div>
  )
}

export default ReportForm
