import { useEffect, useRef, useState } from 'react'

function AnalysisResult({ issues, onSaveIssue, onSubmitSingle, onSubmitAll }) {
  const [submittedIssues, setSubmittedIssues] = useState([])
  const [editingIssueId, setEditingIssueId] = useState(null)
  const [draftTitle, setDraftTitle] = useState('')
  const [draftDescription, setDraftDescription] = useState('')
  const [editError, setEditError] = useState('')
  const hasTriggeredAutoConfirmation = useRef(false)

  const handleSingleSubmit = (issue) => {
    setSubmittedIssues((currentSubmittedIssues) => {
      if (
        currentSubmittedIssues.some(
          (submittedIssue) => submittedIssue.id === issue.id,
        )
      ) {
        return currentSubmittedIssues
      }

      return [...currentSubmittedIssues, issue]
    })

    onSubmitSingle(issue)
  }

  const getOriginalIssueNumber = (issueId) =>
    issues.findIndex((issue) => issue.id === issueId) + 1

  const handleStartEdit = (issue) => {
    setEditingIssueId(issue.id)
    setDraftTitle(issue.title)
    setDraftDescription(issue.description)
    setEditError('')
  }

  const handleCancelEdit = () => {
    setEditingIssueId(null)
    setDraftTitle('')
    setDraftDescription('')
    setEditError('')
  }

  const handleSaveEdit = (issueId) => {
    if (!draftDescription.trim()) {
      setEditError('Problembeskrivelse må fylles ut før du kan lagre.')
      return
    }

    onSaveIssue(issueId, {
      title: draftTitle,
      description: draftDescription,
    })

    handleCancelEdit()
  }

  const visibleIssues = issues.filter(
    (issue) =>
      !submittedIssues.some((submittedIssue) => submittedIssue.id === issue.id),
  )

  const displayedIssues = editingIssueId
    ? visibleIssues.filter((issue) => issue.id === editingIssueId)
    : visibleIssues

  useEffect(() => {
    if (
      submittedIssues.length > 0 &&
      visibleIssues.length === 0 &&
      !hasTriggeredAutoConfirmation.current
    ) {
      hasTriggeredAutoConfirmation.current = true
      onSubmitAll(issues)
    }
  }, [issues, onSubmitAll, submittedIssues.length, visibleIssues.length])

  return (
    <div className="analysis-shell">
      <h3>Generert analyse</h3>

      {displayedIssues.length > 0 ? (
        <div className="analysis-list">
          {displayedIssues.map((issue) => (
            <article
              key={issue.id}
              className={`analysis-card${editingIssueId === issue.id ? ' analysis-card-editing' : ''}`}
            >
              <div className="analysis-card-header">
                <h4>Problem {getOriginalIssueNumber(issue.id)}</h4>
              </div>

              {editingIssueId === issue.id ? (
                <>
                  <div className="analysis-edit-form">
                    <button
                      type="button"
                      className="analysis-back-button"
                      onClick={handleCancelEdit}
                    >
                      ← Tilbake til alle analyser
                    </button>

                    <div className="analysis-edit-header">
                      <span className="analysis-edit-badge">Redigerer</span>
                      <div className="analysis-edit-copy">
                        <h5>Oppdater denne saken</h5>
                        <p>
                          Gjør endringer direkte her. Når du lagrer, oppdateres
                          analysekortet uten at du mister resten av oversikten.
                        </p>
                      </div>
                    </div>

                    <div className="analysis-field">
                      <label htmlFor={`analysis-title-${issue.id}`}>
                        Tittel på sak
                      </label>
                      <input
                        id={`analysis-title-${issue.id}`}
                        className="analysis-edit-input"
                        type="text"
                        value={draftTitle}
                        onChange={(event) => setDraftTitle(event.target.value)}
                        placeholder={`Problem ${getOriginalIssueNumber(issue.id)}`}
                      />
                    </div>

                    <div className="analysis-field">
                      <label htmlFor={`analysis-description-${issue.id}`}>
                        Problembeskrivelse
                      </label>
                      <textarea
                        id={`analysis-description-${issue.id}`}
                        className="analysis-edit-textarea"
                        value={draftDescription}
                        onChange={(event) =>
                          setDraftDescription(event.target.value)
                        }
                        placeholder="Beskriv problemet"
                      />
                    </div>

                    {editError ? (
                      <p className="analysis-edit-error">{editError}</p>
                    ) : null}
                  </div>

                  <div className="analysis-actions">
                    <button
                      type="button"
                      className="analysis-edit-button"
                      onClick={handleCancelEdit}
                    >
                      Avbryt
                    </button>
                    <button
                      type="button"
                      className="analysis-submit-button"
                      onClick={() => handleSaveEdit(issue.id)}
                    >
                      Lagre endringer
                    </button>
                  </div>
                </>
              ) : (
                <>
                              <div className="analysis-field">
                                  <label>Tittel på sak</label>
                                  <div className="analysis-value-box">
                                      {issue.title || `Problem ${getOriginalIssueNumber(issue.id)}`}
                                  </div>
                              </div>

                              <div className="analysis-field">
                                  <label>Issue Labels</label>
                                  <div className="analysis-tags">
                                  <div className="analysis-tag">Universell utforming</div>
                                      {issue.wcagLabel ? (
                                          <div className={`analysis-tag analysis-tag--${issue.wcagLabel.replace('WCAG-', '').toLowerCase()}`}>
                                              {issue.wcagLabel}
                                              </div>
                                      ) : (
                                          <div className="analysis-tag">WCAG-nivå ukjent</div>
                                      )}
                                  </div>
                              </div>

                              <div className="analysis-field">
                                  <label>Analyse</label>
                                  <div className="analysis-text-box">
                                      {issue.aiResponse ? (
                                          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
                                              {issue.aiResponse}
                                          </pre>
                                      ) : (
                                          <p>Ingen analyse tilgjengelig.</p>
                                      )}
                                  </div>
                              </div>

                              <div className="analysis-actions">
                                  <button
                                      type="button"
                                      className="analysis-edit-button"
                                      onClick={() => handleStartEdit(issue)}
                                  >
                                      Rediger
                                  </button>
                                  <button
                                      type="button"
                                      className="analysis-submit-button"
                                      onClick={() => handleSingleSubmit(issue)}
                                  >
                                      Send inn
                                  </button>
                              </div>
                              </>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="analysis-empty-state">
          Alle problemene er markert som sendt inn. Du sendes videre til
          bekreftelsen.
        </div>
      )}

      {submittedIssues.length > 0 && !editingIssueId ? (
        <div className="analysis-submitted-list">
          <h4>Sendte problemer</h4>
          {submittedIssues.map((issue) => (
            <div key={issue.id} className="analysis-inline-confirmation">
              <span className="analysis-inline-confirmation-badge">Sendt</span>
              <span>
                Problem {getOriginalIssueNumber(issue.id)}:{' '}
                <strong>{issue.title || 'Uten tittel'}</strong> er markert som
                sendt inn.
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {issues.length > 1 && visibleIssues.length > 0 && !editingIssueId ? (
        <div className="analysis-submit-all">
          <button
            type="button"
            className="analysis-submit-button"
            onClick={() => onSubmitAll(issues)}
          >
            Send inn alle
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default AnalysisResult
