const { GoogleGenAI } = require("@google/genai");
const z = require('zod')

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

module.exports = generateInterviewReport;