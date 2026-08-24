import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/interview.hook";


function Home() {

    const { loading, generateReport, reports, getReports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeFileRef = useRef(null)
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

    if (loading) {
        return (
            <main>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 md:p-6">

            {/* Page Header */}
            <header className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-pink-400">
                    Create Your Custom Interview Plan
                </h1>
                <p className="text-gray-400 mt-2 text-sm md:text-lg max-w-2xl mx-auto">
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </p>
            </header>

            {/* Main Card */}
            <div className="bg-gray-800 border border-gray-700 shadow-2xl rounded-2xl w-full max-w-7xl p-5 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">

                    {/* Left Panel - Job Description */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="flex items-center text-lg md:text-xl font-semibold text-gray-100">
                                <span className="mr-2 text-pink-400">&lt;/&gt;</span>
                                Target Job Description
                            </h2>
                            <span className="bg-pink-500/10 text-pink-300 border border-pink-500/20 text-xs px-2 py-1 rounded">Required</span>
                        </div>
                        <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
                            className="grow bg-gray-900 border border-gray-700 text-gray-100 placeholder:text-gray-500 rounded-xl p-3 text-sm md:text-base focus:ring-2 focus:ring-pink-500 focus:outline-none min-h-50 md:min-h-87.5"
                            placeholder="Paste the full job description here..."
                            maxLength={5000}
                        />
                        <div className="text-right text-xs text-gray-500 mt-1">0 / 5000 chars</div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px bg-gray-700" />

                    {/* Right Panel - Profile */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex items-center mb-3">
                            <span className="mr-2 text-pink-400">◎</span>
                            <h2 className="text-lg md:text-xl font-semibold text-gray-100">Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className="mb-4 md:mb-6">
                            <label className="flex items-center justify-between text-sm font-medium text-gray-300 mb-2">
                                Upload Resume
                                <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs px-2 py-1 rounded">Best Results</span>
                            </label>
                            <label htmlFor="resume" className="border-2 border-dashed border-gray-600 rounded-xl p-4 md:p-8 flex flex-col items-center cursor-pointer hover:border-pink-400 transition">
                                <span className="text-pink-400 text-xl md:text-3xl">↑</span>
                                <p className="mt-2 text-xs md:text-sm font-medium text-gray-200">Click to upload or drag & drop</p>
                                <p className="text-xs text-gray-500">PDF or DOCX (Max 5MB)</p>
                                <input ref={resumeFileRef} hidden type="file" id="resume" name="resume" accept=".pdf,.docx" />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className="flex items-center my-4">
                            <div className="grow border-t border-gray-700"></div>
                            <span className="px-3 text-xs text-gray-500">OR</span>
                            <div className="grow border-t border-gray-700"></div>
                        </div>

                        {/* Quick Self-Description */}
                        <div className="mb-4 md:mb-6">
                            <label htmlFor="selfDescription" className="text-sm font-medium text-gray-300 mb-2 block">Quick SelfDescription</label>
                            <textarea value={selfDescription} onChange={(e) => setSelfDescription(e.target.value)}
                                id="selfDescription"
                                name="selfDescription"
                                className="w-full h-20 md:h-28 bg-gray-900 border border-gray-700 text-gray-100 placeholder:text-gray-500 rounded-xl p-3 md:p-4 text-sm md:text-base focus:ring-2 focus:ring-pink-500 focus:outline-none"
                                placeholder="Briefly describe your experience..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className="flex items-start bg-pink-500/5 border border-pink-500/20 rounded-xl p-3 md:p-4 text-xs md:text-sm text-gray-300">
                            <span className="mr-2 text-pink-400">i</span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between mt-6 md:mt-8">
                    <span className="text-xs text-gray-500">AI-Powered Strategy Generation • Approx 30s</span>
                    <button type="button" onClick={handleSubmit} disabled={loading} className="flex items-center gap-2 bg-pink-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-md hover:bg-pink-600 transition-colors text-sm md:text-base disabled:opacity-60 disabled:cursor-not-allowed">
                        {loading ? "Generating..." : "✦ Generate My Interview Strategy"}
                    </button>
                </div>
            </div>


            {/* Recent Reports */}
            {/* Recent Reports */}
            <section className="w-full max-w-7xl mt-10 md:mt-12">

                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-100">
                            My Recent Interview Plans
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Your recently generated interview strategies
                        </p>
                    </div>

                    <span className="text-sm text-gray-400">
                        {reports.length} {reports.length === 1 ? "Plan" : "Plans"}
                    </span>
                </div>

                {reports.length === 0 ? (
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 text-center">
                        <p className="text-gray-400">
                            No interview plans found.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {reports.map((report) => (

                            <div
                                key={report._id}
                                className="group bg-gray-800 border border-gray-700 rounded-2xl p-5 
                                hover:border-pink-500/50 hover:-translate-y-1 
                                      transition-all duration-300 shadow-lg hover:shadow-pink-500/10"  onClick={()=>navigate(`/interview/${report._id}`)}
                            >

                                {/* Card Header */}
                                <div className="flex items-start justify-between gap-3">

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-pink-500/10 
                                         border border-pink-500/20 flex items-center 
                                         justify-center text-pink-400 text-lg">
                                            ✦
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-100 
                                             group-hover:text-pink-400 transition-colors">
                                                {report.title || "Untitled Position"}
                                            </h3>

                                            <p className="text-xs text-gray-500 mt-1">
                                                Interview Plan
                                            </p>
                                        </div>

                                    </div>

                                    {/* Match Score */}
                                    <span className="shrink-0 bg-green-500/10 
                            border border-green-500/20 
                            text-green-400 text-xs font-semibold 
                            px-2.5 py-1 rounded-lg">
                                        {report.matchScore}%
                                    </span>

                                </div>


                                {/* Divider */}
                                <div className="border-t border-gray-700 my-5" />


                                {/* Card Information */}
                                <div className="flex items-center justify-between">

                                    {/* Generated Date */}
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">
                                            Generated On
                                        </p>

                                        <p className="text-sm text-gray-300">
                                            {new Date(report.createdAt).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                }
                                            )}
                                        </p>
                                    </div>


                                    {/* Match Score */}
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Match Score
                                        </p>

                                        <p className="text-lg font-bold text-green-400">
                                            {report.matchScore}%
                                        </p>
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </section>

            {/* Page Footer */}
            <footer className="flex gap-6 md:gap-8 mt-10 md:mt-12 text-xs md:text-sm text-gray-500">
                <a href="#" className="hover:underline hover:text-pink-400">Privacy Policy</a>
                <a href="#" className="hover:underline hover:text-pink-400">Terms of Service</a>
                <a href="#" className="hover:underline hover:text-pink-400">Help Center</a>
            </footer>
        </div>

    )

}

export default Home;