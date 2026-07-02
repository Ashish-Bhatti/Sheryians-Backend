import React, { useState, useRef, useCallback } from 'react'

const InputBar = ({ onSend, isLoading }) => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  const handleSend = useCallback(() => {
    if (message.trim() && !isLoading) {
      onSend(message.trim())
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }, [message, isLoading, onSend])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = (e) => {
    setMessage(e.target.value)
    // Auto-resize textarea
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }

  const canSend = message.trim().length > 0 && !isLoading

  return (
    <div className="input-bar">
      <div className="input-bar-inner">
        <textarea
          ref={textareaRef}
          className="input-textarea"
          placeholder="Command your AIs... (Enter to battle, Shift+Enter for new line)"
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isLoading}
        />
        <button
          className={`input-send-btn ${isLoading ? 'loading' : ''}`}
          onClick={handleSend}
          disabled={!canSend}
          title="Start Battle (Enter)"
        >
          {isLoading ? '⏳' : '⚔️'}
        </button>
      </div>
      <div className="input-hint">
        <span className="input-hint-text">
          {isLoading ? '⚡ AI models are competing...' : '🎯 Ask any coding question or challenge'}
        </span>
        <span className="input-hint-shortcut">
          <span className="input-hint-key">Enter</span> to battle &nbsp;
          <span className="input-hint-key">Shift+Enter</span> new line
        </span>
      </div>
    </div>
  )
}

export default InputBar
