import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const FIGHTER_CONFIG = {
  1: {
    avatar: '🔵',
    label: 'Fighter #1',
    color: 'var(--blue-accent)',
    class: 'fighter-1',
  },
  2: {
    avatar: '🟣',
    label: 'Fighter #2',
    color: 'var(--primary)',
    class: 'fighter-2',
  },
}

const FighterCard = ({ fighterNum, name, content, score }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const config = FIGHTER_CONFIG[fighterNum]

  return (
    <div className={`fighter-card ${config.class} fade-in-up`}>
      {/* Card Header */}
      <div className="fighter-card-header">
        <div className="fighter-card-id">
          <div className="fighter-avatar">{config.avatar}</div>
          <div className="fighter-info">
            <span className="fighter-name">{name}</span>
            <span className="fighter-label">{config.label}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {score != null && (
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              color: config.color,
              background: `color-mix(in srgb, ${config.color} 15%, transparent)`,
              border: `1px solid color-mix(in srgb, ${config.color} 30%, transparent)`,
              borderRadius: '6px',
              padding: '2px 8px',
            }}>
              {score}/10
            </span>
          )}
          <div className="fighter-status-dot" />
        </div>
      </div>

      {/* Card Body with Markdown */}
      <div className={`fighter-card-body ${isExpanded ? '' : 'collapsed'}`}
        style={{ maxHeight: isExpanded ? '800px' : '350px', transition: 'max-height 0.4s ease' }}
      >
        {content ? (
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: '10px 0',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      border: '1px solid rgba(255,255,255,0.07)',
                      background: '#0d0b14',
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <div className="thinking-dots">
            <div className="thinking-dot" />
            <div className="thinking-dot" />
            <div className="thinking-dot" />
          </div>
        )}
      </div>

      {/* Expand/Collapse toggle */}
      {content && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            width: '100%',
            padding: '8px',
            background: 'rgba(255,255,255,0.03)',
            border: 'none',
            borderTop: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 150ms ease',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.05em',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          {isExpanded ? '▲ COLLAPSE' : '▼ EXPAND FULL SOLUTION'}
        </button>
      )}
    </div>
  )
}

export default FighterCard
