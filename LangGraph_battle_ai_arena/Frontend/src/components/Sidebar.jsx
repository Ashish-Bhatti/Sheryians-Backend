import React from 'react'

const NAV_ITEMS = [
  { icon: '⚔️', label: 'New Battle', active: false },
  { icon: '🏛️', label: 'Arena Lounge', active: false },
  { icon: '🤖', label: 'Fighter Stables', active: false },
  { icon: '📜', label: 'Battle History', active: false },
]

const Sidebar = ({ history, onNewBattle }) => {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">⚔️</div>
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-title">Neural Arena</span>
          <span className="sidebar-logo-sub">v2.4 Command</span>
        </div>
      </div>

      {/* New Battle Button */}
      <button className="sidebar-new-battle" onClick={onNewBattle}>
        <span>+</span>
        <span>New Battle</span>
      </button>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-label">Main Menu</div>
        {NAV_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className={`sidebar-nav-item ${item.active ? 'active' : ''}`}
            onClick={idx === 0 ? onNewBattle : undefined}
          >
            <span className="sidebar-nav-item-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Recent Battles History */}
      <div className="sidebar-history">
        {history.length > 0 && (
          <>
            <div className="sidebar-history-label">Recent Battles</div>
            {history.map((item) => (
              <div key={item.id} className="sidebar-history-item">
                <div className="sidebar-history-item-dot" />
                <span className="sidebar-history-text">{item.text}</span>
              </div>
            ))}
          </>
        )}

        {history.length === 0 && (
          <div style={{ padding: '16px 12px' }}>
            <div className="sidebar-nav-label">Recent Battles</div>
            {['Quantum Ethics', 'Rust Performance', 'Creative Writing'].map((label, idx) => (
              <div key={idx} className="sidebar-history-item">
                <div className="sidebar-history-item-dot" style={{ opacity: 0.3 }} />
                <span className="sidebar-history-text" style={{ opacity: 0.4 }}>{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-status">
          <div className="status-dot" />
          <span>NEURAL ARENA SYSTEM v2.4 // Awaiting input</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
