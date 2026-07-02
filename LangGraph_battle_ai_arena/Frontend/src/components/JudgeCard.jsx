import React, { useEffect, useState } from 'react'

const JudgeCard = ({ judge }) => {
  const {
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning,
  } = judge

  const [animatedScore1, setAnimatedScore1] = useState(0)
  const [animatedScore2, setAnimatedScore2] = useState(0)

  const winner =
    solution_1_score > solution_2_score
      ? 'Gemini Pro'
      : solution_2_score > solution_1_score
      ? 'GPT-4 Turbo'
      : 'TIE'

  const winnerColor =
    solution_1_score > solution_2_score
      ? 'var(--blue-accent)'
      : solution_2_score > solution_1_score
      ? 'var(--primary)'
      : 'var(--gold)'

  // Animate scores on mount
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimatedScore1(solution_1_score), 200)
    const timer2 = setTimeout(() => setAnimatedScore2(solution_2_score), 400)
    return () => { clearTimeout(timer1); clearTimeout(timer2) }
  }, [solution_1_score, solution_2_score])

  return (
    <div className="judge-card fade-in-up">
      {/* Header */}
      <div className="judge-card-header">
        <div className="judge-card-title">
          <span>⚖️</span>
          <span>System Verdict</span>
        </div>
        <div className="judge-card-winner" style={{ color: winnerColor, borderColor: winnerColor + '50' }}>
          {winner === 'TIE' ? '🤝 TIE GAME' : `${winner.toUpperCase()} WINS`}
        </div>
      </div>

      {/* Body */}
      <div className="judge-card-body">
        {/* Score Cards */}
        <div className="judge-scores">
          <ScoreItem
            label="Fighter #1 — Gemini Pro"
            score={solution_1_score}
            animatedScore={animatedScore1}
            colorClass="score-1"
            isWinner={solution_1_score > solution_2_score}
          />
          <ScoreItem
            label="Fighter #2 — GPT-4 Turbo"
            score={solution_2_score}
            animatedScore={animatedScore2}
            colorClass="score-2"
            isWinner={solution_2_score > solution_1_score}
          />
        </div>

        {/* Reasoning */}
        <div className="judge-reasoning">
          <ReasoningItem
            label="📘 Gemini Pro Analysis"
            text={solution_1_reasoning}
            colorClass="score-1"
          />
          <ReasoningItem
            label="💜 GPT-4 Turbo Analysis"
            text={solution_2_reasoning}
            colorClass="score-2"
          />
        </div>
      </div>
    </div>
  )
}

const ScoreItem = ({ label, score, animatedScore, colorClass, isWinner }) => (
  <div className={`judge-score-item ${colorClass}`}>
    <div className="judge-score-fighter">
      {isWinner && '👑 '}
      {label}
    </div>
    <div className="judge-score-number">
      <span>{score}</span>
      <span className="judge-score-denom">/10</span>
    </div>
    <div className="score-bar">
      <div
        className="score-bar-fill"
        style={{ width: `${(animatedScore / 10) * 100}%` }}
      />
    </div>
  </div>
)

const ReasoningItem = ({ label, text, colorClass }) => (
  <div className={`judge-reasoning-item`}>
    <div className={`judge-reasoning-label`} style={{
      color: colorClass === 'score-1' ? 'var(--blue-accent)' : 'var(--primary)'
    }}>
      {label}
    </div>
    <p className="judge-reasoning-text">{text}</p>
  </div>
)

export default JudgeCard
