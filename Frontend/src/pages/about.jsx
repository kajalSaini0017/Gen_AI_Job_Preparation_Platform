import { TbTargetArrow } from "react-icons/tb";
import { FaRegFileAlt, FaArrowRight } from "react-icons/fa";
import { BsCpu } from "react-icons/bs";
import {IoRocketOutline} from "react-icons/io5";
import { useNavigate } from "react-router-dom";


function AboutPage() {
     
    const navigate = useNavigate();
    function handleStart(){
      navigate("/interview")
    }

    return (
        <>
            <section className="flex flex-col gap-8 bg-gray-50 px-4 py-8 sm:px-6 md:flex-row md:items-center md:gap-10 md:px-10 lg:px-15 xl:px-20">
                <div className="flex-1 py-4 md:py-10">
                    <div className="w-fit rounded-2xl bg-indigo-100 px-4 py-1 ">
                        <p className="font-semibold text-indigo-700">About us</p>
                    </div>
                    <div className="py-5 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl xl:text-6xl">
                        <h1>Your Journey to a <span className="text-indigo-700">Better Job</span>  Starts Here</h1>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 sm:text-base lg:text-lg">
                            GenAI Prep helps you prepare smarter for interviews with AI-powered practice and personalized feedback. We&apos;re here to make your job preparation journey simpler, more focused, and more effective.
                        </p>
                    </div>
                </div>

                <div className="flex w-full justify-center md:w-1/2 lg:w-auto">
                    <img
                        src="/images/About-page/About-page-img1.png"
                        alt="About page image"
                        className="h-auto w-full max-w-md rounded-2xl object-cover shadow-sm md:max-w-lg"
                    />
                </div>
            </section>
            <section className="flex flex-col-reverse gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:gap-10 lg:gap-12 lg:px-15 xl:px-20">
                <div className="flex justify-center md:w-1/2">
                    <img
                        src="/images/About-page/About-page-img2.png"
                        alt="About page image2"
                        className="h-auto w-full max-w-md rounded-2xl object-cover md:max-w-lg"
                    />
                </div>
                <div className="w-full px-1 py-2 md:w-1/2 md:px-0 md:py-8">
                    <div className="w-fit rounded-2xl bg-indigo-100 px-4 py-1 font-semibold text-indigo-700">
                        <p>Our Story</p>
                    </div>
                    <div className="py-6 text-3xl font-semibold leading-tight sm:text-4xl">
                        <h2>Why We Built GenAI Prep</h2>
                    </div>
                    <div className="text-gray-600">
                        <p className="py-2 text-sm sm:text-base">
                            Job preparation can feel confusing -- what to study, what questions to practice, and how to know whether you&apos;re actually improving.
                        </p>
                        <p className="py-2 text-sm sm:text-base">
                            GenAI Prep was created to bring these things together in one simple platform, so you can focus on what really matters -- building your skills, boosting your confidence, and achieving your career goals.
                        </p>
                    </div>
                </div>
            </section>
            <section className="mx-4 flex flex-col gap-5 bg-gray-100 p-5 sm:mx-6 sm:p-6 md:mx-10 md:flex-row md:items-center md:gap-8 md:p-8 lg:mx-15 xl:mx-20">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32">
                    <TbTargetArrow className="h-9 w-9 text-indigo-700 sm:h-10 sm:w-10 md:h-11 md:w-11" />
                </div>
                <div className="w-full py-2 md:py-4">
                    <div className="my-3 w-fit rounded-2xl bg-indigo-100 px-4 py-1 font-semibold text-indigo-700">
                        <p>Our Mission</p>
                    </div>
                    <div className="py-2 text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
                        <h3>
                            Making Interview Preparation Smarter & Accessible
                        </h3>
                    </div>
                    <div className="max-w-2xl text-gray-600">
                        <p className="text-sm sm:text-base">
                            Our goal is to help students and job seekers with confidence understand their strengths and weaknesses, and become better prepared for real interviews --anytime, anywhere
                        </p>
                    </div>
                </div>
            </section>
            <section className="px-4 py-4 sm:px-6 md:px-10 lg:py-8 lg:px-15 xl:px-20">
                <div className="w-fit rounded-full bg-indigo-100 px-4 py-1.5 font-semibold text-indigo-700">
                    <p>How GenAI Prep Helps</p>
                </div>
                <div className="py-4 text-3xl font-semibold leading-tight sm:text-4xl">
                    <h3>
                        Simple Steps to Your Dream Job
                    </h3>
                </div>
                <div className="max-w-2xl text-base leading-7 text-gray-600">
                    <p>
                        Get started in just 3 easy steps and let AI guide you towards better preparation and improved performance
                    </p>
                </div>
                <div className="flex flex-col gap-4 md:flex-row py-4">
                    <article className="h-full min-w-0 flex-1 rounded-2xl hover:cursor-pointer transition duration-200 hover:-translate-y-1 border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-semibold text-indigo-200">01</p>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-lg text-indigo-700">
                                <FaRegFileAlt aria-hidden="true" />
                            </div>
                        </div>
                        <h2 className="mt-4 text-lg font-semibold">Share Your Profile</h2>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Add your resume, job description and a short introduction about yourself
                        </p>
                    </article>
                    <article className="h-full min-w-0 flex-1 rounded-2xl hover:cursor-pointer transition duration-200 hover:-translate-y-1 border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-semibold text-indigo-200">02</p>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-lg text-indigo-700">
                                <BsCpu aria-hidden="true" />
                            </div>
                        </div>
                        <h2 className="mt-4 text-lg font-semibold">Get Your AI Interview Plan</h2>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Our AI analyzes your profile and creates a personalized interview preparation plan just for you.
                        </p>
                    </article>
                    <article className="h-full min-w-0 flex-1 rounded-2xl hover:cursor-pointer transition duration-200 hover:-translate-y-1 border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-semibold text-indigo-200">03</p>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-lg text-indigo-700">
                                <FaRegFileAlt aria-hidden="true" />
                            </div>
                        </div>
                        <h2 className="mt-4 text-lg font-semibold">Learn From Your Report</h2>
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            Review your match score, questions, strengths and areas to improve with detailed feedback
                        </p>
                    </article>
                </div>
            </section>
            <section className="mx-4 mt-6 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-500 p-4 text-white shadow-lg sm:mx-6 sm:p-5 md:mx-10 md:p-6 lg:mx-15 xl:mx-20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3 sm:gap-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-700 sm:h-14 sm:w-14">
                            <IoRocketOutline className="h-6 w-6 sm:h-7 sm:w-7" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-lg font-semibold sm:text-xl">Ready to Start Your Preparation?</h4>
                            <p className="mt-1 text-sm text-indigo-100 sm:text-base">
                                Take the first step towards your dream job with GenAI
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleStart}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-indigo-700 transition dark:text-white hover:-translate-y-0.5 hover:bg-gray-100 sm:w-auto sm:justify-self-end"
                    >
                        <span>Start Preparating</span>
                        <FaArrowRight className="text-sm" />
                    </button>
                </div>
            </section>
        </>
    );
}

export default AboutPage;
