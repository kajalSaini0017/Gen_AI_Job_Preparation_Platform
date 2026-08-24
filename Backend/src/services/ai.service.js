const { GoogleGenAI } = require("@google/genai");
const z = require('zod');
const puppeteer = require('puppeteer')


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY
});

const interviewReportJsonSchema = {
    type: "object",

    properties: {
        matchScore: {
            type: "number",
            description:
                "A score between 0 and 100 indicating how well the candidate matches the job description."
        },

        technicalQuestions: {
            type: "array",
            description:
                "Technical questions that can be asked in the interview.",
            items: {
                type: "object",

                properties: {
                    question: {
                        type: "string",
                        description:
                            "The technical question that can be asked."
                    },

                    intention: {
                        type: "string",
                        description:
                            "The interviewer's intention behind asking this question."
                    },

                    answer: {
                        type: "string",
                        description:
                            "How the candidate should answer the question."
                    }
                },

                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },

        behavioralQuestions: {
            type: "array",
            description:
                "Behavioral questions that can be asked in the interview.",

            items: {
                type: "object",

                properties: {
                    question: {
                        type: "string",
                        description:
                            "The behavioral question that can be asked."
                    },

                    intention: {
                        type: "string",
                        description:
                            "The interviewer's intention behind asking this question."
                    },

                    answer: {
                        type: "string",
                        description:
                            "How the candidate should answer the question."
                    }
                },

                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },

        skillGaps: {
            type: "array",
            description:
                "Skills that the candidate is missing or needs to improve.",

            items: {
                type: "object",

                properties: {
                    skill: {
                        type: "string",
                        description:
                            "The skill that the candidate is lacking."
                    },

                    severity: {
                        type: "string",
                        enum: [
                            "low",
                            "medium",
                            "high"
                        ],
                        description:
                            "The severity of the skill gap."
                    }
                },

                required: [
                    "skill",
                    "severity"
                ]
            }
        },

        preparationPlan: {
            type: "array",
            description:
                "A day-wise preparation plan for the interview.",

            items: {
                type: "object",

                properties: {
                    day: {
                        type: "number",
                        description:
                            "The day number starting from 1."
                    },

                    focus: {
                        type: "string",
                        description:
                            "The main focus of this preparation day."
                    },

                    tasks: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        description:
                            "Tasks to complete on this day."
                    }
                },

                required: [
                    "day",
                    "focus",
                    "tasks"
                ]
            }
        },

        title: {
            type: "string",
            description:
                "The title of the job for which this report is generated."
        }
    },

    required: [
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan",
        "title"
    ]
};

const interviewReportSchema = z.fromJSONSchema(interviewReportJsonSchema);

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
    `

    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash",
        input: prompt,
        response_format: {
            type: 'text',
            mime_type: 'application/json',
            schema: interviewReportJsonSchema
        },
    });
    const interviewReport = interviewReportSchema.parse(JSON.parse(interaction.output_text));

    return interviewReport;

}

async function generatePdfFromHTML(htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })
    const pdfBuffer = await page.pdf({
        format: "A4", margin:
            { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" }
    })
    await browser.close()

    return pdfBuffer;
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumeJsonSchema = {
        type: "object",
        properties: {
            html: {
                type: "string",
                description: "Complete HTML content of the generated resume."
            }
        },
        required: ["html"]
    }

    const resumeSchema = z.fromJSONSchema(resumeJsonSchema);

    const prompt = `
                       Generate a professional, ATS-friendly resume for the candidate.

                             Candidate Resume:
                              ${resume}

                             Self Description:
                ${selfDescription}
                
                Job Description:
                ${jobDescription}
                
                Requirements:
                
                - Tailor the resume according to the job description.
                - Highlight the candidate's relevant skills, projects and experience.
                - Use natural, human-written language.
                - Keep the resume concise and ideally 1-2 pages.
                - Use a simple and professional design.
                - Make the HTML clean and well structured.
                - Include CSS inside the HTML.
                - The HTML should be directly convertible to PDF using Puppeteer.
                - Do not include explanations outside the HTML.
                
                Return JSON with exactly one field:
                
                {
                    "html": "complete HTML resume"
                }`

    const interaction = await ai.interactions.create({
        model: "gemini-3.5-flash",
        input: prompt,
        response_format: {
            type: 'text',
            mime_type: 'application/json',
            schema: resumeJsonSchema
        },
    })

    const resumeData = resumeSchema.parse(JSON.parse(interaction.output_text))


    const pdfBuffer = await generatePdfFromHTML(resumeData.html)

    return pdfBuffer;

}

module.exports = {generateInterviewReport, generateResumePdf};