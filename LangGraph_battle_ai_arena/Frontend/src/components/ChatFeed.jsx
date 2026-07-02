import React, { forwardRef } from 'react'
import BattleEntry from './BattleEntry'

const ChatFeed = forwardRef(({ battles, isLoading, examplePrompts, onExampleClick }, ref) => {
  const isEmpty = battles.length === 0 && !isLoading

  return (
    <div className="chat-feed" ref={ref}>
      {isEmpty ? (
        <WelcomeScreen prompts={examplePrompts} onPromptClick={onExampleClick} />
      ) : (
        <>
          {battles.map((battle, idx) => (
            <BattleEntry key={battle.id} battle={battle} index={idx} />
          ))}
          {isLoading && <LoadingIndicator />}
        </>
      )}
    </div>
  )
})

ChatFeed.displayName = 'ChatFeed'

const WelcomeScreen = ({ prompts, onPromptClick }) => (
  <div className="welcome-screen fade-in">
    <div className="welcome-icon">⚔️</div>
    <h1 className="welcome-title">AI Battle Arena</h1>
    <p className="welcome-subtitle">
      Submit your coding challenge or question. Two AI models will compete head-to-head
      and our judge will declare the winner.
    </p>
    <div className="welcome-chips">
      {prompts.map((prompt, idx) => (
        <button
          key={idx}
          className="welcome-chip"
          onClick={() => onPromptClick(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  </div>
)

const LoadingIndicator = () => (
  <div className="battle-entry fade-in">
    <div
      className="battle-status"
      style={{ maxWidth: '320px' }}
    >
      <div className="battle-status-spinner" />
      <span>AIs are battling... please wait</span>
    </div>
    <div className="fighter-arena">
      <SkeletonFighterCard fighter="1" />
      <SkeletonFighterCard fighter="2" />
    </div>
  </div>
)

const SkeletonFighterCard = ({ fighter }) => (
  <div className={`fighter-card fighter-${fighter}`}>
    <div className="fighter-card-header">
      <div className="fighter-card-id">
        <div className="fighter-avatar" />
        <div className="fighter-info">
          <div style={{
            width: '80px', height: '12px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '4px',
            animation: 'pulse-skeleton 1.5s ease-in-out infinite'
          }} />
          <div style={{
            width: '50px', height: '10px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '4px',
            marginTop: '4px',
            animation: 'pulse-skeleton 1.5s ease-in-out infinite 0.2s'
          }} />
        </div>
      </div>
    </div>
    <div className="thinking-dots">
      <div className="thinking-dot" />
      <div className="thinking-dot" />
      <div className="thinking-dot" />
    </div>
  </div>
)

export default ChatFeed
