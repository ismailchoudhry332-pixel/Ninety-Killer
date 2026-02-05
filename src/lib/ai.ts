import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface AiOutput {
  summaryText: string;
  proposals: AiProposal[];
  warnings: string[];
  confidence: number;
}

export interface AiProposal {
  type: 'carry_forward_todo' | 'carry_forward_issue' | 'flag_stale_rock' | 'flag_pattern' | 'suggest_action';
  entityId?: string;
  description: string;
  patch?: Record<string, any>;
}

export async function generateMeetingSummary(meetingData: {
  title: string;
  todos: any[];
  issues: any[];
  rocks: any[];
  scorecardEntries: any[];
  ratings: any[];
}): Promise<AiOutput> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are an EOS (Entrepreneurial Operating System) meeting analyst.
Analyze this weekly meeting data and produce a structured JSON response.

Meeting: ${meetingData.title}

Todos (${meetingData.todos.length}):
${meetingData.todos.map(t => `- [${t.status}] ${t.title} (due: ${t.dueDate || 'none'}, owner: ${t.owner?.name || 'unassigned'})`).join('\n')}

IDS Issues (${meetingData.issues.length}):
${meetingData.issues.map(i => `- [${i.status}] [${i.priority}] ${i.title}`).join('\n')}

Rocks:
${meetingData.rocks.map(r => `- [${r.status}] ${r.title} (owner: ${r.owner?.name || 'unassigned'})`).join('\n')}

Scorecard:
${meetingData.scorecardEntries.map(s => `- ${s.metric?.name}: actual=${s.actual}, status=${s.status}`).join('\n')}

Ratings: ${meetingData.ratings.length > 0 ? `avg ${(meetingData.ratings.reduce((a: number, r: any) => a + r.score, 0) / meetingData.ratings.length).toFixed(1)}/10` : 'none yet'}

Respond with ONLY valid JSON in this format:
{
  "summaryText": "2-3 paragraph executive summary of meeting health and key findings",
  "proposals": [
    {
      "type": "carry_forward_todo|carry_forward_issue|flag_stale_rock|flag_pattern|suggest_action",
      "entityId": "id if applicable",
      "description": "what should be done and why"
    }
  ],
  "warnings": ["list of concerns"],
  "confidence": 0.0 to 1.0
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return {
        summaryText: 'AI was unable to generate a structured summary.',
        proposals: [],
        warnings: ['Failed to parse AI response'],
        confidence: 0,
      };
    }
    return JSON.parse(jsonMatch[0]) as AiOutput;
  } catch (error) {
    return {
      summaryText: 'AI service unavailable.',
      proposals: [],
      warnings: [`AI error: ${error instanceof Error ? error.message : 'unknown'}`],
      confidence: 0,
    };
  }
}

export async function generateBoardSummary(companiesData: any[]): Promise<AiOutput> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are a board-level strategic analyst for a group of companies running EOS.
Analyze these company health metrics and produce a board summary.

${companiesData.map(c => `
Company: ${c.name}
- Avg Meeting Rating: ${c.avgRating?.toFixed(1) || 'N/A'}
- Todo Completion Rate: ${c.todoCompletionRate?.toFixed(0) || 'N/A'}%
- Open Issues: ${c.openIssueCount}
- Off-Track Rocks: ${c.offTrackRockCount}
- Carry-Forward Items: ${c.carryForwardCount}
`).join('\n')}

Respond with ONLY valid JSON:
{
  "summaryText": "Board-level executive summary focusing on exceptions and areas needing attention",
  "proposals": [{"type": "suggest_action", "description": "recommended board actions"}],
  "warnings": ["critical concerns for board attention"],
  "confidence": 0.0 to 1.0
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return { summaryText: 'Unable to generate board summary.', proposals: [], warnings: [], confidence: 0 };
    }
    return JSON.parse(jsonMatch[0]) as AiOutput;
  } catch (error) {
    return {
      summaryText: 'AI service unavailable.',
      proposals: [],
      warnings: [`AI error: ${error instanceof Error ? error.message : 'unknown'}`],
      confidence: 0,
    };
  }
}
