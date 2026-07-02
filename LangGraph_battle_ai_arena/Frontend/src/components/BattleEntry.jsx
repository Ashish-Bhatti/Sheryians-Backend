import React from 'react'
import ReactMarkdown from 'react-markdown'
import FighterCard from './FighterCard'
import JudgeCard from './JudgeCard'

const BattleEntry = ({ battle, index }) => {
  const { problem, solution_1, solution_2, judge, error } = battle

  const isComplete = solution_1 && solution_2 && judge

  return (
    <div className="battle-entry fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
      {/* User Question Bubble */}
      <div className="user-question">
        <div className="user-question-bubble">
          {problem}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="error-card">
          ⚠️ Battle failed: {error}
        </div>
      )}

      {/* Fighter Arena — Side by Side */}
      {(solution_1 || solution_2) && (
        <>
          <div
            className="vs-divider"
            style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--text-muted)' }}
          >
            ⚔️ FIGHTERS RESPONDING
          </div>

          <div className="fighter-arena">
            <FighterCard
              fighterNum={1}
              name="Gemini Pro"
              content={solution_1}
              score={judge?.solution_1_score}
            />
            <FighterCard
              fighterNum={2}
              name="GPT-4 Turbo"
              content={solution_2}
              score={judge?.solution_2_score}
            />
          </div>
        </>
      )}

      {/* Judge Verdict */}
      {isComplete && judge && (
        <JudgeCard judge={judge} />
      )}
    </div>
  )
}

export default BattleEntry
