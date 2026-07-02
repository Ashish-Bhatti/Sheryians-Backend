import React from 'react'

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-title-group">
        <div className="header-title">
          Battle Arena
          <span className="header-title-badge">⚡ LIVE</span>
        </div>
        <div className="header-subtitle">Two AIs enter. One solution wins.</div>
      </div>
      <div className="header-actions">
        <button className="header-btn" title="Notifications">🔔</button>
        <button className="header-btn" title="Settings">⚙️</button>
      </div>
    </header>
  )
}

export default Header
