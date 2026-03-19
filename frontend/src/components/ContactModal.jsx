import { useEffect, useState } from 'react'

const CONTACT_EMAIL = 'contact@tingtun.no'

function ContactModal({ isOpen, onClose }) {
  const [fromEmail, setFromEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [showNotice, setShowNotice] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      setFromEmail('')
      setSubject('')
      setMessage('')
      setShowNotice(false)
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setShowNotice(true)
  }

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="contact-modal-header">
          <h2 id="contact-modal-title">Skriv ny e-post</h2>
          <button
            type="button"
            className="contact-modal-close"
            onClick={onClose}
            aria-label="Lukk kontaktvindu"
          >
            ×
          </button>
        </div>

        <form className="contact-modal-form" onSubmit={handleSubmit}>
          <label className="contact-modal-field">
            <span>Til</span>
            <input type="text" value={CONTACT_EMAIL} readOnly />
          </label>

          <label className="contact-modal-field">
            <span>Fra</span>
            <input
              type="email"
              value={fromEmail}
              onChange={(event) => setFromEmail(event.target.value)}
              placeholder="din.epost@eksempel.no"
              required
            />
          </label>

          <label className="contact-modal-field">
            <span>Emne</span>
            <input
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Skriv inn emne"
            />
          </label>

          <label className="contact-modal-field contact-modal-message">
            <span>Melding</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Skriv meldingen din her"
            />
          </label>

          {showNotice ? (
            <p className="contact-modal-notice">
              Kontaktboksen er oppdatert med avsenderadresse. For faktisk
              sending trenger nettsiden fortsatt en kobling til en e-posttjeneste
              eller backend.
            </p>
          ) : null}

          <div className="contact-modal-actions">
            <button
              type="button"
              className="contact-modal-secondary"
              onClick={onClose}
            >
              Lukk
            </button>
            <button type="submit" className="contact-modal-primary">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactModal
