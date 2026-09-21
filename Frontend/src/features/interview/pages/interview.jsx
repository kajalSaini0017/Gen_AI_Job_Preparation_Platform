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
    <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-indigo-200 hover:shadow-lg">
      <button
        type="button"
        aria-expanded={open}
        className="flex w-full cursor-pointer select-none items-start gap-2 p-3 text-left lg:gap-3 lg:p-4"
        onClick={() => setOpen(!open)}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-indigo-200 bg-indigo-100 text-xs font-bold text-indigo-700">
          Q{index + 1}
        </span>
        <p className="min-w-0 flex-1 text-xs font-medium leading-relaxed text-slate-700 md:text-sm lg:text-base wrap-break-word">
          {item.question}
        </p>
        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm transition-colors ${open ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-300 text-slate-500"}`}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="mx-3 mb-3 flex flex-col gap-3 rounded-b-md border-t border-slate-200 bg-slate-50 px-3 pb-3 pt-3 lg:mx-4 lg:mb-4 lg:px-4 lg:pb-4">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-violet-700">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" aria-hidden="true"></span>
              Intention
            </span>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 md:text-sm wrap-break-word">{item.intention}</p>
          </div>
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
              Model Answer
            </span>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 md:text-sm wrap-break-word">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

const RoadMapDay = ({ day }) => (
  <div className="relative flex flex-col gap-2 py-3 pl-12">
    <div className="absolute left-6 top-4 h-3.5 w-3.5 rounded-full border-2 border-indigo-500 bg-white"></div>
    <div className="flex items-center gap-2">
      <span className="rounded-full border border-indigo-200 bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700">
        Day {day.day}
      </span>
      <h3 className="text-sm font-semibold text-slate-900 md:text-base">{day.focus}</h3>
    </div>
    <ul className="flex flex-col gap-1 text-xs text-slate-600 md:text-sm">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-2 h-1 w-1 rounded-full bg-slate-500"></span>
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
    return <main className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center"><p className="text-sm text-slate-500">Interview report loading...</p></main>
  }

  if (!report) {
    return <main className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-6"><section className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm"><h1 className="text-lg font-semibold text-slate-900">Interview report not found</h1><p className="mt-2 text-sm text-slate-500">Generate an interview plan first.</p></section></main>
  }

  const technicalQuestions = report.technicalQuestions || []
  const behavioralQuestions = report.behavioralQuestions || []
  const preparationPlan = report.preparationPlan || []
  const skillGaps = report.skillGaps || []
  const topSkillGap = skillGaps.find(({ severity }) => severity === 'high') || skillGaps[0]

  const scoreColor =
    report.matchScore >= 80 ? "border-emerald-500" :
      report.matchScore >= 60 ? "border-amber-500" : "border-red-500"

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 flex flex-col p-4 md:flex-row md:p-6">
      {/* Left Nav */}
      <nav className="w-full shrink-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:w-44 lg:w-56 lg:p-4">
        <div className="flex flex-row items-start justify-between gap-3 md:flex-col md:justify-start lg:gap-6">
          <div className="w-full">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Sections</p>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition lg:px-3 lg:py-2 lg:text-sm ${activeNav === item.id ? "bg-indigo-100 text-indigo-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center border border-current text-[10px] font-bold ${item.iconShape || 'rounded-md'}`}>
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
            className="shrink-0 whitespace-nowrap rounded-md bg-indigo-700 px-2 py-1.5 text-[11px] text-white transition hover:bg-indigo-800 sm:px-3 sm:text-xs lg:px-3 lg:py-2 lg:text-sm"
          >
            <span aria-hidden="true">↓</span>
            <span className="sm:hidden">Resume</span>
            <span className="hidden sm:inline">Download Resume</span>
          </button>
        </div>
      </nav>

      {/* Divider */}
      <div className="hidden w-px bg-slate-200 md:block" />

      {/* Center Content */}
      <main className="min-w-0 flex-1 overflow-y-auto p-3 md:p-4 lg:max-h-[calc(100vh-3rem)] lg:p-6">
        {activeNav === "technical" && (
          <section>
            <div className="mb-4 flex items-baseline gap-2 border-b border-slate-200 pb-2">
              <h2 className="text-base font-bold text-slate-900 md:text-lg lg:text-xl">Technical Questions</h2>
              <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs text-slate-800 md:text-sm">
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
            <div className="mb-4 flex items-baseline gap-2 border-b border-slate-200 pb-2">
              <h2 className="text-base font-bold text-slate-900 md:text-lg lg:text-xl">Behavioral Questions</h2>
              <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs text-slate-800 md:text-sm">
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
            <div className="mb-4 flex items-baseline gap-2 border-b border-slate-200 pb-2">
              <h2 className="text-base font-bold text-slate-900 md:text-lg lg:text-xl">Preparation Road Map</h2>
              <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs text-slate-800 md:text-sm">
                {preparationPlan.length}-day plan
              </span>
            </div>
            <div className="relative">
              <div className="absolute bottom-0 left-7 top-0 w-0.5 bg-gradient-to-b from-indigo-500 to-indigo-200"></div>
              {preparationPlan.map(day => (
                <RoadMapDay key={day.day} day={day} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Divider */}
      <div className="hidden w-px bg-slate-200 md:block" />

      {/* Right Sidebar */}
      <aside className="flex w-full shrink-0 flex-col gap-4 p-3 md:w-44 lg:w-64 lg:gap-6 lg:p-6">
        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm lg:p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Profile Match</h2>
            <span className="text-xs text-slate-500">AI analysis</span>
          </div>
          <div className={`mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-full border-6 lg:h-32 lg:w-32 lg:border-8 ${scoreColor}`}>
            <span className="text-2xl font-bold text-slate-900 lg:text-3xl">{report.matchScore}%</span>
            <span className="text-xs text-slate-500">match score</span>
          </div>
          <p className="mt-4 text-center text-xs text-slate-600">
            {report.matchScore >= 80
              ? "Your profile is a strong match for this role."
              : report.matchScore >= 60
                ? "Your profile is good for this role, but can be improved."
                : "Your profile needs improvement for this role."}
          </p>

        </section>

        <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm lg:p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Skill Gaps</h2>
            <span className="text-xs text-slate-500">{skillGaps.length} skills</span>
          </div>
          <ul className="flex flex-col gap-3">
            {skillGaps.map(({ skill, severity }) => (
              <li key={skill} className="flex min-w-0 items-center justify-between gap-2 py-1 text-sm">
                <span className="min-w-0 flex-1 text-slate-600 wrap-break-word">{skill}</span>
                <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs capitalize ${severity === 'high'
                    ? 'border-red-200 bg-red-50 text-red-600'
                    : severity === 'medium'
                      ? 'border-amber-200 bg-amber-50 text-amber-700'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  }`}>
                  {severity}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="min-w-0 rounded-xl border border-indigo-200 bg-indigo-50 p-3 lg:p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-indigo-700">Next step</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-800">
            {topSkillGap ? `Focus on ${topSkillGap.skill} fundamentals before your next practice session.` : 'Keep practicing the questions in this report.'}
          </p>
          <button
            type="button"
            onClick={() => setActiveNav('roadmap')}
            className="mt-3 text-xs font-semibold text-indigo-700 transition hover:text-indigo-900"
          >
            View preparation roadmap →
          </button>
        </section>
      </aside>
    </div>
  )
}

export default Interview