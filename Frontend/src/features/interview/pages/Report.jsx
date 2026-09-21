import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/interview.hook";

function Reports() {
    const { reports } = useInterview();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("latest");

    const filteredReports = useMemo(() => {
        const text = search.trim().toLowerCase();

        const result = reports.filter((report) => {
            const title = (report.title || "Untitled Position").toLowerCase();
            const matchScore = String(report.matchScore || 0);
            return !text || title.includes(text) || matchScore.includes(text);
        });

        return [...result].sort((a, b) => {
            if (sortBy === "score") {
                return (Number(b.matchScore) || 0) - (Number(a.matchScore) || 0);
            }

            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    }, [reports, search, sortBy]);

    const totalScore = reports.length
        ? Math.round(
            reports.reduce((sum, report) => sum + (Number(report.matchScore) || 0), 0) / reports.length
        )
        : 0;

    const bestScore = reports.length
        ? Math.max(...reports.map((report) => Number(report.matchScore) || 0))
        : 0;

    const latestReport = reports.length ? reports[0] : null;

    if (reports.length <= 0) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
                <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl text-indigo-600">
                        ✦
                    </div>
                    <h1 className="mt-5 text-2xl font-bold text-slate-900">No reports yet</h1>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                        Generate your first interview plan to view your preparation report here.
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/interview")}
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-800"
                    >
                        Create interview plan
                    </button>
                </section>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 xl:px-20">
            <section className="mx-auto max-w-7xl">
                <header className="mb-6 flex flex-col gap-4 md:mb-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-700 sm:text-xs">
                            REPORTS
                        </span>
                        <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
                            My Interview Reports
                        </h1>
                        <p className="mt-2 text-sm text-slate-600 sm:text-base">
                            Review your latest mock interview plans and preparation progress.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Total plans</p>
                            <p className="mt-1 text-2xl font-bold text-slate-900">{reports.length}</p>
                        </div>
                    </div>
                </header>

                <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-sm text-slate-500">Average match</p>
                        <p className="mt-3 text-3xl font-bold text-indigo-600">{totalScore}%</p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-sm text-slate-500">Best score</p>
                        <p className="mt-3 text-3xl font-bold text-emerald-500">{bestScore}%</p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-2 xl:col-span-1">
                        <p className="text-sm text-slate-500">Latest report</p>
                        <p className="mt-3 text-base font-semibold text-slate-700 sm:text-lg">
                            {latestReport?.title || "No report yet"}
                        </p>
                    </div>
                </div>

                {reports.length > 0 && (
                    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search report by title or score"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:max-w-sm"
                        />

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-44"
                        >
                            <option value="latest">Latest</option>
                            <option value="score">Highest score</option>
                        </select>
                    </div>
                )}

                {filteredReports.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:p-12">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl text-indigo-600">
                            ✦
                        </div>
                        <h2 className="mt-5 text-2xl font-bold text-slate-900">No matching reports</h2>
                        <p className="mx-auto mt-3 max-w-md text-sm text-slate-600 sm:text-base">
                            Try a different keyword or generate a new interview plan to view your reports here.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredReports.map((report) => (
                            <article
                                key={report._id}
                                onClick={() => navigate(`/interview/${report._id}`)}
                                className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl sm:p-5"
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-lg text-indigo-600 sm:h-11 sm:w-11 sm:text-xl">
                                            ✦
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="break-words text-sm font-semibold leading-snug text-slate-900 group-hover:text-indigo-600 sm:text-base">
                                                {report.title || "Untitled Position"}
                                            </h3>
                                            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
                                                Interview plan
                                            </p>
                                        </div>
                                    </div>

                                    <span className="self-start shrink-0 rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                                        {report.matchScore || 0}%
                                    </span>
                                </div>

                                <div className="my-4 h-px bg-slate-200 sm:my-5" />

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Created</p>
                                        <p className="mt-2 text-sm font-medium text-slate-700">
                                            {new Date(report.createdAt).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>

                                    <div className="text-left sm:text-right">
                                        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Match</p>
                                        <p className="mt-2 text-lg font-bold text-emerald-500">
                                            {report.matchScore || 0}%
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                                >
                                    View details
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Reports;