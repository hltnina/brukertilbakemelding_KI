function Loader({ text }) {
  return (
    <div className="analysis-loader-card">
      <div className="analysis-loader-inner">
        <h2 className="analysis-loader-title">{text}</h2>

        <div className="analysis-loader-panel">
          <div className="skeleton skeleton-heading" />
          <div className="skeleton skeleton-input" />

          <div className="analysis-loader-tags">
            <div className="skeleton skeleton-tag" />
            <div className="skeleton skeleton-tag" />
          </div>

          <div className="skeleton skeleton-box" />
          <div className="skeleton skeleton-box" />
        </div>
      </div>
    </div>
  )
}

export default Loader