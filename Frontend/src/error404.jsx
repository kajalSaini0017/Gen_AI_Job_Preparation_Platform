import { FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

function Error404() {
	const navigate = useNavigate()

	return (
		<main className="relative isolate flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden bg-slate-50 px-5 py-16 transition-colors dark:bg-slate-900 sm:px-8 lg:px-14">
			<div className="pointer-events-none absolute -right-24 top-16 -z-10 size-72 rounded-full bg-indigo-100/70 blur-3xl dark:bg-indigo-950/70" />
			<div className="pointer-events-none absolute -bottom-32 -left-20 -z-10 size-80 rounded-full bg-cyan-100/70 blur-3xl dark:bg-cyan-950/50" />

			<section className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
				<div className="order-2 max-w-xl lg:order-1">
					<p className="mb-4 inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-indigo-700">
						Error 404
					</p>
					<h1 className="max-w-lg text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
						This page took a wrong turn.
					</h1>
					<p className="mt-5 max-w-md text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
						The page you are looking for does not exist or may have moved. Let&apos;s get you back to preparing for your next opportunity.
					</p>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Link
							to="/"
							className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-700 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<FaHome aria-hidden="true" />
							Back to home
						</Link>
						<button
							type="button"
							onClick={() => navigate(-1)}
							className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-indigo-200 px-5 py-3 font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-indigo-700 dark:text-indigo-300 dark:hover:bg-slate-800"
						>
							<FaArrowLeft aria-hidden="true" />
							Go back
						</button>
					</div>

					<Link to="/interview" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-700 dark:text-slate-400 dark:hover:text-indigo-300">
						Start interview preparation
						<FaArrowRight aria-hidden="true" className="text-xs" />
					</Link>
				</div>

				<div className="order-1 flex justify-center lg:order-2">
					<div className="w-full max-w-xl rounded-4xl border border-white bg-white/80 p-5 shadow-xl shadow-indigo-100/60 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80 dark:shadow-black/20 sm:p-8">
						<img
							src="/images/error404.gif"
							alt="A character searching for a missing page"
							className="h-auto w-full"
						/>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Error404
