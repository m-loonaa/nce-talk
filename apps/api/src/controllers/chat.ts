import type { Request, Response } from 'express'
import { Agent, run } from '@openai/agents'
import { createAiSdkUiMessageStream } from '@openai/agents-extensions/ai-sdk-ui'
import { pipeUIMessageStreamToResponse, type UIMessage } from 'ai'
import { toAgentInput } from '#lib/message-converters.ts'

const agent = new Agent({
  name: 'English Tutor',
  instructions: `
    You are a friendly and patient English teacher. Help the user improve their English through clear explanations and practical examples.

    - Explain grammar, vocabulary, phrases, and sentence structures in simple Chinese.
    - Use natural English examples and provide Chinese translations when helpful.
    - When the user submits an English sentence, correct grammar mistakes and suggest more natural expressions.
    - Explain why corrections are needed without being overly strict about minor issues.
    - Adapt explanations to the user's English level and encourage learning step by step.
    - Keep responses concise, clear, and focused on the user's question.
    `,
})

const chat = async (
  req: Request<unknown, unknown, { messages?: UIMessage[] | UIMessage }>,
  res: Response,
) => {
  const messages = Array.isArray(req.body.messages) ? req.body.messages : []
  const lastUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === 'user')
  const input = lastUserMessage ? toAgentInput([lastUserMessage]) : []

  const result = await run(agent, input, {
    stream: true,
  })
  await pipeUIMessageStreamToResponse({
    response: res,
    stream: createAiSdkUiMessageStream(result),
  })
}

export { chat }
