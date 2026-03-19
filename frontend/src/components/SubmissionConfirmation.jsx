function SubmissionConfirmation({
  onReset,
  submissionMode,
  submittedIssue,
  submittedIssues,
  createdGithubIssues,
}) {
  const isBulkSubmission = submissionMode === 'all'
  const issueTitle = submittedIssue?.title?.trim() || 'den valgte saken'

  return (
    <div className="confirmation-shell">
      <h3>Bekreftelse på innsending</h3>

      <div className="confirmation-message-box">
        {isBulkSubmission ? (
          <>
            <p>
              Dine innsendinger er nå sendt inn til Github Issues som egne saker.
            </p>

            <p>
              Se de opprettede Github-sakene under, eller start en ny analyse
              ved å trykke på <strong>“Ny sak”</strong>.
            </p>

            {createdGithubIssues?.length ? (
              <div className="confirmation-issue-list">
                {createdGithubIssues.map((issue, index) => (
                  <div key={issue.id} className="confirmation-issue-item">
                    <div className="confirmation-issue-copy">
                      <span className="confirmation-issue-badge">
                        Problem {index + 1}
                      </span>
                      <span>
                        <strong>{issue.title || 'Uten tittel'}</strong> er sendt
                        inn som <strong>Github Issue #{issue.githubIssueNumber}</strong>.
                      </span>
                    </div>
                    <a
                      className="confirmation-issue-link"
                      href={issue.githubIssueUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Se issue #{issue.githubIssueNumber}
                    </a>
                  </div>
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <>
            <p>
              Innsendingen for <strong>{issueTitle}</strong> er nå sendt inn til
              Github Issues, og har <strong>saksnummeret #1.</strong>
            </p>

            <p>
              Se saken i Github Issues ved å trykke på{' '}
              <strong>“Se Github Issue #1”</strong>, eller generer en analyse av
              en ny sak ved å trykke på <strong>“Ny sak”</strong>.
            </p>
          </>
        )}
      </div>

      <div className="confirmation-actions">
        <button
          type="button"
          className="confirmation-home-button"
          onClick={onReset}
        >
          Ny sak/Hjem
        </button>
        {!isBulkSubmission ? (
          <button type="button" className="confirmation-issue-button">
            Se Github Issue #1
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default SubmissionConfirmation
