import React, { useEffect, useState } from 'react'
import { useInterview } from '../hooks/interview.hook'
import { useParams } from 'react-router-dom'

const NAV_ITEMS = [
  { id: 'technical', label: 'Technical Questions', icon: '<>' },
  { id: 'behavioral', label: 'Behavioral Questions', icon: '▤' },
  { id: 'roadmap', label: 'Road Map', icon: '→' },
]

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden transition hover:border-gray-600 min-w-0">
      <button
        type="button"
        aria-expanded={open}
        className="w-full flex items-start gap-2 p-3 lg:gap-3 lg:p-4 text-left cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <span className="shrink-0 flex items-center justify-center w-7 h-7 text-pink-400 text-xs font-bold bg-pink-500/10 border border-pink-500/20 rounded-md">
          Q{index + 1}
        </span>
        <p className="min-w-0 flex-1 text-xs md:text-sm lg:text-base font-medium text-gray-100 leading-relaxed wrap-break-word">
          {item.question}
        </p>
        <span className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-full border text-sm transition-colors ${open ? "border-pink-500/40 bg-pink-500/10 text-pink-400" : "border-gray-600 text-gray-400"}`}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="mx-3 mb-3 lg:mx-4 lg:mb-4 px-3 pb-3 lg:px-4 lg:pb-4 flex flex-col gap-3 border-t border-gray-700 bg-gray-900/40 rounded-b-md pt-3">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 text-purple-300 text-xs font-bold uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" aria-hidden="true"></span>
              Intention
            </span>
            <p className="text-xs md:text-sm text-gray-300 mt-1 leading-relaxed wrap-break-word">{item.intention}</p>
          </div>
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 text-green-400 text-xs font-bold uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" aria-hidden="true"></span>
              Model Answer
            </span>
            <p className="text-xs md:text-sm text-gray-300 mt-1 leading-relaxed wrap-break-word">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

const RoadMapDay = ({ day }) => (
  <div className="flex flex-col gap-2 pl-12 relative py-3">
    <div className="absolute left-6 top-4 w-3.5 h-3.5 rounded-full bg-gray-900 border-2 border-pink-500"></div>
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-pink-500 bg-pink-500/10 border border-pink-500/25 rounded-full px-2 py-0.5">
        Day {day.day}
      </span>
      <h3 className="text-sm md:text-base font-semibold text-gray-100">{day.focus}</h3>
    </div>
    <ul className="flex flex-col gap-1 text-xs md:text-sm text-gray-400">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="w-1 h-1 rounded-full bg-gray-500 mt-2"></span>
          {task}
        </li>
      ))}
    </ul>
  </div>
)

const Interview = () => {
  const [activeNav, setActiveNav] = useState('technical')
  const { loading, report, getReportById, getResumePdf } = useInterview()
  const { interviewId } = useParams()

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])

  if (loading) {
    return <main className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center"><p className="text-sm text-gray-400">Interview report loading...</p></main>
  }

  if (!report) {
    return <main className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-6"><section className="text-center bg-gray-800 border border-gray-700 rounded-lg p-6"><h1 className="text-lg font-semibold">Interview report not found</h1><p className="text-sm text-gray-400 mt-2">Generate an interview plan first.</p></section></main>
  }

  const technicalQuestions = report.technicalQuestions || []
  const behavioralQuestions = report.behavioralQuestions || []
  const preparationPlan = report.preparationPlan || []
  const skillGaps = report.skillGaps || []
  const topSkillGap = skillGaps.find(({ severity }) => severity === 'high') || skillGaps[0]

  const scoreColor =
    report.matchScore >= 80 ? "border-green-500" :
    report.matchScore >= 60 ? "border-yellow-500" : "border-red-500"

  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row p-4 md:p-6">
      {/* Left Nav */}
      <nav className="w-full md:w-44 lg:w-56 shrink-0 p-3 lg:p-4 flex flex-row items-start md:flex-col justify-between md:justify-start gap-3 md:gap-4 lg:gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Sections</p>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`flex items-center gap-2 w-full px-2 py-1.5 lg:px-3 lg:py-2 rounded-md text-xs lg:text-sm transition ${
                activeNav === item.id ? "bg-pink-500/10 text-pink-500" : "text-gray-400 hover:bg-gray-700 hover:text-gray-100"
              }`}
              onClick={() => setActiveNav(item.id)} 
            >
              <span className={`shrink-0 flex items-center justify-center w-6 h-6 border border-current text-[10px] font-bold ${item.iconShape || 'rounded-md'}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Download resume"
          title="Download resume"
          onClick={() => getResumePdf(interviewId)}
          disabled={!interviewId || loading}
          className="shrink-0 flex items-center gap-1 bg-pink-500 text-white text-[11px] sm:text-xs lg:text-sm px-2 sm:px-3 lg:px-3 py-1.5 lg:py-2 rounded-md hover:bg-pink-600 transition whitespace-nowrap"
        >
          <span aria-hidden="true">↓</span>
          <span className="sm:hidden">Resume</span>
          <span className="hidden sm:inline">Download Resume</span>
        </button>
      </nav>

      {/* Divider */}
      <div className="hidden md:block w-px bg-gray-700" />

      {/* Center Content */}
      <main className="min-w-0 flex-1 p-3 md:p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-3rem)]">
        {activeNav === "technical" && (
          <section>
            <div className="flex items-baseline gap-2 mb-4 pb-2 border-b border-gray-700">
              <h2 className="text-base md:text-lg lg:text-xl font-bold">Technical Questions</h2>
              <span className="text-xs md:text-sm text-gray-400 bg-gray-700 px-2 py-0.5 rounded-full border border-gray-600">
                {technicalQuestions.length} questions
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {technicalQuestions.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
              ))}
            </div>
          </section>
        )}

        {activeNav === "behavioral" && (
          <section>
            <div className="flex items-baseline gap-2 mb-4 pb-2 border-b border-gray-700">
              <h2 className="text-base md:text-lg lg:text-xl font-bold">Behavioral Questions</h2>
              <span className="text-xs md:text-sm text-gray-400 bg-gray-700 px-2 py-0.5 rounded-full border border-gray-600">
                {behavioralQuestions.length} questions
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {behavioralQuestions.map((q, i) => (
                <QuestionCard key={i} item={q} index={i} />
              ))}
            </div>
          </section>
        )}

        {activeNav === "roadmap" && (
          <section>
            <div className="flex items-baseline gap-2 mb-4 pb-2 border-b border-gray-700">
              <h2 className="text-base md:text-lg lg:text-xl font-bold">Preparation Road Map</h2>
              <span className="text-xs md:text-sm text-gray-400 bg-gray-700 px-2 py-0.5 rounded-full border border-gray-600">
                {preparationPlan.length}-day plan
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-linear-to-b from-pink-500 to-pink-500/10"></div>
              {preparationPlan.map(day => (
                <RoadMapDay key={day.day} day={day} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Divider */}
      <div className="hidden md:block w-px bg-gray-700" />

      {/* Right Sidebar */}
      <aside className="w-full md:w-44 lg:w-64 shrink-0 p-3 lg:p-6 flex flex-col gap-4 lg:gap-6">
        <section className="bg-gray-800 border border-gray-700 rounded-lg p-3 lg:p-4 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-100">Profile Match</h2>
            <span className="text-xs text-gray-400">AI analysis</span>
          </div>
          <div className={`mx-auto w-24 h-24 lg:w-32 lg:h-32 rounded-full border-6 lg:border-8 ${scoreColor} flex flex-col items-center justify-center`}>
            <span className="text-2xl lg:text-3xl font-bold text-gray-100">{report.matchScore}%</span>
            <span className="text-xs text-gray-400">match score</span>
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            Your profile is a strong match for this role.
          </p>
        </section>

        <section className="bg-gray-800 border border-gray-700 rounded-lg p-3 lg:p-4 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-100">Skill Gaps</h2>
            <span className="text-xs text-gray-500">{skillGaps.length} skills</span>
          </div>
          <ul className="flex flex-col gap-3">
            {skillGaps.map(({ skill, severity }) => (
              <li key={skill} className="min-w-0 flex items-center justify-between gap-2 py-1 text-sm">
                <span className="min-w-0 flex-1 text-gray-300 wrap-break-word">{skill}</span>
                <span className={`shrink-0 text-xs capitalize px-2 py-0.5 rounded-full border ${
                  severity === 'high'
                    ? 'text-red-400 bg-red-400/10 border-red-400/20'
                    : severity === 'medium'
                      ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
                      : 'text-green-400 bg-green-400/10 border-green-400/20'
                }`}>
                  {severity}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-pink-500/20 bg-pink-500/5 rounded-lg p-3 lg:p-4 min-w-0">
          <p className="text-xs uppercase tracking-wide font-bold text-pink-400">Next step</p>
          <p className="text-sm text-gray-300 mt-2 leading-relaxed">
            {topSkillGap ? `Focus on ${topSkillGap.skill} fundamentals before your next practice session.` : 'Keep practicing the questions in this report.'}
          </p>
          <button
            type="button"
            onClick={() => setActiveNav('roadmap')}
            className="mt-3 text-xs font-semibold text-pink-400 hover:text-pink-300 transition"
          >
            View preparation roadmap →
          </button>
        </section>
      </aside>
    </div>
  )
}

export default Interview