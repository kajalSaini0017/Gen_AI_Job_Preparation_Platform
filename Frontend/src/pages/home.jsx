import { FaArrowRight, FaRegFileAlt, FaFileDownload, FaUserAlt } from "react-icons/fa"
import { MdOutlineSlowMotionVideo } from "react-icons/md"
import { RiAiGenerate2 } from "react-icons/ri"
import { TbReportAnalytics } from "react-icons/tb"
import { BsBarChartFill, BsFillLightningFill } from "react-icons/bs"
import { MdSecurity } from "react-icons/md";
import {useNavigate} from "react-router-dom";


const carddetails = [
    {
        icon: RiAiGenerate2,
        titleName: "AI Interview Generation",
        View: "Get role-based technical & behavioral questions tailored to your profile"
    },
    {
        icon: TbReportAnalytics,
        titleName: "Detailed Reports",
        View: "view match score, strengths, weaknesses and personalized feedback"
    },
    {
        icon: FaRegFileAlt,
        titleName: "Resume Analysis",
        View: "Find out how well your resume matches the job and get improvement tips"
    },
    {
        icon: BsBarChartFill,
        titleName: "Track Your Progress",
        View: "Access all your Previous reports and monitor improvement over time"
    },
    {
        icon: MdSecurity,
        titleName: "Secure & Private",
        View: "Your data is safe with us No login required for basic features"
    },
    {
        icon: BsFillLightningFill,
        titleName: "Easy to Use",
        View: "Simple, clean and modern interface for a smooth experience"
    }
]



function HomePage() {
     
    const navigate = useNavigate();


   function handleStartPrebtn(){
     navigate("/interview")
   }


    return (
        <>
            <section className="flex flex-col items-center gap-10 px-5 py-8 bg-gray-50  sm:px-8 lg:flex-row lg:gap-8 lg:px-14 lg:py-12 2xl-px-24 ">
                <div className="flex w-full max-w-2xl flex-col gap-7 lg:flex-1">
                    <div className="flex-1" >
                        <ul className="flex w-fit flex-wrap list-inside list-disc gap-x-6 gap-y-1 rounded-2xl bg-gray-100 px-5 py-1 text-indigo-700">
                            <li>
                                AI Powered
                            </li>
                            <li>
                                Personalized
                            </li>
                            <li>
                                Job Ready
                            </li>
                        </ul>
                    </div>
                    <h1 className="text-4xl font-semibold leading-normal tracking-wide sm:text-5xl sm:leading-tight lg:text-6xl">
                        Land Your Dream Job With <span className="text-indigo-700">GenAI</span>
                    </h1>
                    <p className="max-w-xl leading-6 tracking-normal text-gray-600">
                        Get AI-powered interview preparation personalized feedback and detailed reports to boost your chances of getting hired
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                        <div className="flex w-fit items-center cursor-pointer gap-2 rounded-2xl bg-indigo-700 px-5 py-2 text-white  transition duration-200 hover:-translate-y-1 hover:bg-indigo-500" onClick={handleStartPrebtn}>
                            <button >Start Preparing </button>
                            <FaArrowRight />
                        </div>
                        <div className="flex w-fit items-center cursor-pointer gap-2 rounded-2xl border-2 border-indigo-700 px-5 py-2 text-indigo-700  transition duration-200 hover:-translate-y-1 hover:bg-gray-100 hover:border-indigo-500 hover:text-indigo-500" >
                            <MdOutlineSlowMotionVideo />
                            <button> Watch Demo</button>
                        </div>

                    </div>
                    <div className="flex flex-wrap gap-y-4">
                        <div className="flex min-w-56 flex-1 items-center gap-2 pr-4 mr-4 sm:border-r border-gray-400 cursor-pointer transition duration-200 hover:-translate-y-1">
                            <RiAiGenerate2 className="size-7 text-indigo-700" />
                            <p className="leading-4.5 text-gray-600">AI Generated Interview Questions</p>
                        </div>
                        <div className="flex min-w-40 flex-1 items-center pr-4 mr-4 gap-2 sm:border-r border-gray-400 cursor-pointer transition duration-200 hover:-translate-y-1 ">
                            <FaFileDownload className="size-6 text-indigo-700" />
                            <p className="leading-4.5 text-gray-600">Detailed Match Report</p>
                        </div>
                        <div className="flex min-w-56 flex-1 items-center gap-2 cursor-pointer transition duration-200 hover:-translate-y-1">
                            <FaRegFileAlt className="size-6 text-indigo-700" />
                            <p className="leading-4.5 text-gray-600">Resume Analysis & Suggestions</p>
                        </div>
                    </div>

                </div>
                <div className="flex w-full flex-1 justify-center">
                    <img src="/images/Home-page/image-1.png" alt="Job Preparation image" className="h-auto w-full max-w-md lg:max-w-3xl" />
                </div>


            </section>
            <section className="bg-white px-5 py-8 sm:px-8 sm:py-16 lg:px-14 lg:py-8 2xl:px-24">
                <div className="mx-auto flex w-full max-w-[2200px] flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
                <div className="w-full text-center lg:w-[32%] lg:pt-4 lg:text-left">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-indigo-700">
                        Why Choose Use
                    </h3>
                    <h2 className="py-3 text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
                        Everything You Need For Job Success
                    </h2>
                    <p className="leading-7 text-gray-500">
                        Our platform uses Generative AI to create real interview experiences,analyze your performance and help you improve -- faster and smarter
                    </p>
                </div>
                <div className="grid w-full flex-1 cursor-pointer grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-6 ">
                    {carddetails.map((item, key) => {
                        const Icon = item.icon;

                        return (
                            <div key={key} className="group rounded-2xl border border-gray-200 bg-gray-50 px-5 py-6 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-lg">
                                <div className="flex size-10 items-center justify-center rounded-full bg-indigo-100">
                                    <Icon className="size-5 text-indigo-700 transition group-hover:scale-110" />
                                </div>
                                <h4 className="pb-2 pt-4 font-bold text-gray-900">
                                    {item.titleName}
                                </h4>
                                <p className="text-sm leading-6 text-gray-600">
                                    {item.View}
                                </p>
                            </div>
                        )
                    })}
                </div>
                </div>
            </section>
            <section className="flex flex-col gap-10 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-14 lg:py-8 2xl:px-24">
                <div className="flex w-full flex-1 justify-center">
                    <img src="/images/Home-page/image-2.png" alt="home image" className="h-auto w-full max-w-md lg:max-w-3xl" />
                </div>
                <div className="w-full flex-1">
                    <h3 className="mt-0 font-semibold text-indigo-700 lg:mt-8">
                        Get Started Today
                    </h3>
                    <h2 className="py-4 text-3xl font-semibold leading-tight sm:py-6">
                        Your Personalized Interview Coach
                    </h2>
                    <p className="pb-5 leading-7 text-gray-600">
                        Upload your job description, resume and self description. our AI will generate a custom interview plan, analyze your profile and give you detailed feedback -- all in one place 
                    </p>
                    <div className="mb-5 flex w-fit cursor-pointer items-center gap-2 rounded-2xl bg-indigo-700 px-4 py-2 font-medium text-white transition duration-200 hover:-translate-y-1 hover:bg-indigo-500" onClick={handleStartPrebtn}>
                        <button  className="cursor-pointer">Start Now</button>
                        <FaArrowRight/>
                    </div>
                    <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-3 sm:gap-6">
                        <div className="flex items-center gap-4 sm:border-r sm:border-gray-400 sm:pr-4">
                            <div className="size-8 bg-indigo-100 flex justify-center items-center rounded-full text-indigo-700 ">
                                <FaUserAlt />
                            </div>
                            <p>No Login Required</p>
                        </div>
                        <div className="flex items-center gap-4 sm:border-r sm:border-gray-400 sm:pr-4">
                            <div className="size-8 bg-indigo-100 flex justify-center items-center rounded-full text-indigo-700">
                                <FaRegFileAlt />
                            </div>
                            <p>Resume & JD</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="size-8 bg-indigo-100 flex justify-center items-center rounded-full text-indigo-700">
                                <BsFillLightningFill />
                            </div>
                            <p>Get Instant Reports</p>
                        </div>
                    </div>
                   
                </div>
            </section>
        </>
    )
}
export default HomePage;