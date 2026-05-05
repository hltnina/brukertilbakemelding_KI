import { useState } from 'react'
import InputField from './InputField'
import TextAreaField from './TextAreaField'
import Loader from './Loader'


const createEmptyIssue = (index) => ({
  id: `issue-${index}-${Date.now()}`,
  title: '',
  description: '',
  files: [],
})

const getFileCategoryLabel = (fileName) => {
  const extension = fileName.split('.').pop()?.toLowerCase()

  if (!extension) {
    return 'Fil'
  }

  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(extension)) {
    return 'Bilde'
  }

  if (['mp4', 'mov', 'avi', 'webm', 'mkv'].includes(extension)) {
    return 'Video'
  }

  if (extension === 'pdf') {
    return 'PDF-dokument'
  }

  if (['doc', 'docx', 'txt', 'rtf', 'odt'].includes(extension)) {
    return 'Dokument'
  }

  return 'Fil'
}

function ReportForm({ issues, setIssues, onSubmit, setIsLoading, setLoadingText }) {
  const [errors, setErrors] = useState({})

  const handleIssueChange = (issueId, field, value) => {
    const errorKey = `${issueId}-${field}`

    setErrors((currentErrors) => {
      if (!currentErrors[errorKey]) {
        return currentErrors
      }

      const updatedErrors = { ...currentErrors }
      delete updatedErrors[errorKey]
      return updatedErrors
    })

    setIssues((currentIssues) =>
      currentIssues.map((issue) =>
        issue.id === issueId ? { ...issue, [field]: value } : issue
      )
    )
  }

  const handleUploadClick = (issueId) => {
    const fileInput = document.getElementById(`report-file-${issueId}`)
    fileInput?.click()
  }

  const handleFileChange = (issueId, event) => {
    const selectedFiles = Array.from(event.target.files ?? [])

    if (selectedFiles.length === 0) {
      return
    }

    setIssues((currentIssues) =>
      currentIssues.map((issue) =>
        issue.id === issueId
          ? {
              ...issue,
              files: [
                ...issue.files,
                ...selectedFiles.map((file) => ({
                  id: `${issueId}-${file.name}-${file.size}-${Date.now()}-${Math.random()
                    .toString(36)
                    .slice(2, 8)}`,
                  file,
                  fileName: file.name,
                  filePreviewUrl: URL.createObjectURL(file),
                })),
              ],
            }
          : issue
      )
    )

    event.target.value = ''
  }

  const handleRemoveFile = (issueId, fileId) => {
    setIssues((currentIssues) =>
      currentIssues.map((issue) => {
        if (issue.id !== issueId) {
          return issue
        }

        const fileToRemove = issue.files.find((file) => file.id === fileId)

        if (fileToRemove?.filePreviewUrl) {
          URL.revokeObjectURL(fileToRemove.filePreviewUrl)
        }

        return {
          ...issue,
          files: issue.files.filter((file) => file.id !== fileId),
        }
      })
    )
  }

  const handleAddIssue = () => {
    setIssues((currentIssues) => [
      ...currentIssues,
      createEmptyIssue(currentIssues.length + 1),
    ])
  }

  const handleRemoveIssue = (issueId) => {
    setErrors((currentErrors) => {
      const updatedErrors = { ...currentErrors }
      delete updatedErrors[`${issueId}-title`]
      delete updatedErrors[`${issueId}-description`]
      return updatedErrors
    })

    setIssues((currentIssues) =>
      currentIssues.filter((issue) => issue.id !== issueId)
    )
  }

  const handleSubmit = async () => {
    const nextErrors = {}
    let firstInvalidFieldId = null

    issues.forEach((issue) => {
      if (issue.description.trim() === '') {
        nextErrors[`${issue.id}-description`] =
          'Du må fylle inn problembeskrivelse.'
        if (!firstInvalidFieldId) {
          firstInvalidFieldId = `report-description-${issue.id}`
          }

          return
        }

        if (issue.description.trim().length < 15) {
            nextErrors[`${issue.id}-description`] =
                'Beskrivelsen er for kort. Vennligst beskriv problemet mer detaljert.'
            if (!firstInvalidFieldId) {
                firstInvalidFieldId = `report-description-${issue.id}`
            }
        }
    })

    setErrors(nextErrors)

    if (firstInvalidFieldId) {
      window.requestAnimationFrame(() => {
        const field = document.getElementById(firstInvalidFieldId)
        field?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        field?.focus()
      })
      return
      }

      setLoadingText('Genererer analyse med KI...')
      setIsLoading(true)

      try {
          const updatedIssues = []

          for (const issue of issues) {
              const formData = new FormData()
              formData.append("description", issue.description)
              formData.append("title", issue.title)


              for (const fileObj of issue.files) {
                  formData.append("files", fileObj.file)
              }

              console.log("sender request...")


              const response = await fetch("/api/gemini-service", {
                  method: "POST",
                  body: formData,
              })

              console.log("Response status:", response.status)

              const data = await response.json()

              if (!response.ok || !data.message) {
                  console.error("Gemini feilet:", data)
                  continue
              }

              console.log("=== DATA FRA BACKEND ===", data)

               const updatedIssue = {
                  ...issue,
                  title: issue.title.trim() !== ''
                    ? issue.title
                    : data.generatedTitle || 'Tilgjengelighetsproblem',
                  aiResponse: data.message,
                  wcagLabel: data.wcagLabel,
              }
                updatedIssues.push(updatedIssue)
          }

          // oppdater state og send videre i ett steg
          setIssues(updatedIssues)
          onSubmit(updatedIssues)


      } catch (error) {
        console.error("Feil ved innsending", error)
      } finally {
        setIsLoading(false)
      }
    
  }

  return (
    <div className="report-form-shell">
          <h3>Konfigurasjon</h3>

          <div className="privacy-notice">
             
              <p>
                  Unngå å inkludere personopplysninger eller sensitiv informasjon i beskrivelser og vedlegg.
              </p>
          </div>

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
              label="Tittel på sak"
              id={`report-title-${issue.id}`}
              placeholder="Tittel på sak..."
              value={issue.title}
              error={errors[`${issue.id}-title`]}
              onChange={(event) =>
                handleIssueChange(issue.id, 'title', event.target.value)
              }
                />

                

            <TextAreaField
              label="Problembeskrivelse*"
              id={`report-description-${issue.id}`}
              placeholder="Legg inn din beskrivelse..."
              value={issue.description}
              error={errors[`${issue.id}-description`]}
              onChange={(event) =>
                handleIssueChange(issue.id, 'description', event.target.value)
              }
            />

            <div className="upload-group">
                    <p>Last opp vedlegg (i form av fil eller bilde)</p>

                    
              <input
                id={`report-file-${issue.id}`}
                type="file"
                className="upload-input"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                onChange={(event) => handleFileChange(issue.id, event)}
              />
              <button
                type="button"
                className="upload-button"
                onClick={() => handleUploadClick(issue.id)}
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
              {issue.files.length > 0 ? (
                <div className="upload-file-list">
                  {issue.files.map((file) => (
                    <div key={file.id} className="upload-file-name-row">
                      <a
                        href={file.filePreviewUrl || '#'}
                        className="upload-file-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="upload-file-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" focusable="false">
                            <path
                              d="M8 3.5h6l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5Z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14 3.5V8h4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 12h6M9 15h4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <span className="upload-file-meta">
                          <span className="upload-file-name">{file.fileName}</span>
                          <span className="upload-file-type">
                            {getFileCategoryLabel(file.fileName)}
                          </span>
                        </span>
                      </a>
                      <button
                        type="button"
                        className="remove-file-button"
                        onClick={() => handleRemoveFile(issue.id, file.id)}
                        aria-label={`Fjern fil ${file.fileName} for problem ${index + 1}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
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

      <button
        type="button"
        className="submit-button"
        onClick={handleSubmit}
      >
        Send inn
      </button>
    </div>
  )
}

export default ReportForm
