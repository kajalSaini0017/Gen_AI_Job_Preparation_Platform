import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/interview.hook";


function Home() {

    const { loading, error, generateReport } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeFileRef = useRef(null);
    const [fileName, setFileName] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const resumeFile = resumeFileRef.current.files[0]
        const interviewReport = await generateReport({
            jobDescription,
            selfDescription,
            resumeFile
        })

        if (interviewReport?._id) {
            navigate(`/interview/${interviewReport._id}`)
        }
    }

    const handleFileName = (e) => {

        setFileName(e.target.files[0].name)
    }

    if (loading) {
        return (
            <main class="flex items-center bg-slate-50 justify-center min-h-screen bg-gray-100">
                <h1 class="text-3xl font-bold text-black animate-pulse">
                    Loading your interview plan...
                </h1>
            </main>

        )
    }
    return (
        <div className="min-h-screen bg-slate-50 py-10 text-slate-800 flex flex-col items-center p-4 md:p-6">

            {/* Page Header */}
            <header className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700">
                    Create Your Custom Interview Plan
                </h1>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 md:text-lg">
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </p>
            </header>

            {/* Main Card */}
            <div className="w-full max-w-7xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-indigo-100/50 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:gap-8">

                    {/* Left Panel - Job Description */}
                    <div className="flex flex-1 flex-col">
                        <div className="mb-3 flex items-center justify-between gap-3">
                            <h2 className="flex items-center text-lg font-semibold text-slate-900 md:text-xl">
                                <span className="mr-2 text-indigo-700">&lt;/&gt;</span>
                                Target Job Description
                            </h2>
                            <span className="rounded border border-indigo-200 bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
                                Required
                            </span>
                        </div>
                        <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
                            className="min-h-50 grow rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 md:min-h-[22rem] md:text-base"
                            placeholder="Paste the full job description here..."
                            maxLength={5000}
                        />
                        <div className="mt-1 text-right text-xs text-slate-500">0 / 5000 chars</div>
                    </div>

                    {/* Divider */}
                    <div className="hidden w-px bg-slate-200 md:block" />

                    {/* Right Panel - Profile */}
                    <div className="flex flex-1 flex-col">
                        <div className="mb-3 flex items-center">
                            <span className="mr-2 text-indigo-700">◎</span>
                            <h2 className="text-lg font-semibold text-slate-900 md:text-xl">Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className="mb-4 md:mb-6">
                            <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
                                Upload Resume
                                <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                                    Best Results
                                </span>
                            </label>
                            <label htmlFor="resume" className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-indigo-200 p-4 transition hover:border-indigo-500 md:p-8">
                                <span className="text-xl text-indigo-700 md:text-3xl">↑</span>
                                <p className="mt-2 text-xs font-medium text-slate-700 md:text-sm">Click to upload or drag & drop</p>
                                <p className="text-xs text-slate-500">PDF or DOCX (Max 5MB)</p>
                                <input ref={resumeFileRef} onChange={handleFileName} hidden type="file" id="resume" name="resume" accept=".pdf,.docx" />
                                {
                                    fileName && <p className="mt-2 text-sm text-emerald-700 font-medium">
                                        {fileName}
                                    </p>
                                }

                            </label>

                        </div>

                        {/* OR Divider */}
                        <div className="my-4 flex items-center">
                            <div className="grow border-t border-slate-200"></div>
                            <span className="px-3 text-xs text-slate-500">OR</span>
                            <div className="grow border-t border-slate-200"></div>
                        </div>

                        {/* Quick Self-Description */}
                        <div className="mb-4 md:mb-6">
                            <label htmlFor="selfDescription" className="mb-2 block text-sm font-medium text-slate-700">Quick SelfDescription</label>
                            <textarea value={selfDescription} onChange={(e) => setSelfDescription(e.target.value)}
                                id="selfDescription"
                                name="selfDescription"
                                className="h-20 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 md:h-28 md:p-4 md:text-base"
                                placeholder="Briefly describe your experience..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className="flex items-start rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-xs text-slate-800  md:p-4 md:text-sm">
                            <span className="mr-2 font-bold text-indigo-700">i</span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="mt-6 flex flex-col gap-4 md:mt-8 md:flex-row md:items-center md:justify-between">
                    <span className="text-xs text-slate-500">AI-Powered Strategy Generation • Approx 30s</span>
                    <button type="button" onClick={handleSubmit} disabled={loading} className="flex items-center justify-center gap-2 rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-800 md:px-6 md:py-3 md:text-base disabled:cursor-not-allowed disabled:opacity-60">
                        {loading ? "Generating..." : "✦ Generate My Interview Strategy"}
                    </button>
                </div>
                {error && (
                    <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </p>
                )}
            </div>
        </div>

    )

}

export default Home;