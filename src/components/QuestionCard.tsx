import type { Question } from '../data/questions';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswerId?: string;
  onSelect: (answerId: string) => void;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswerId,
  onSelect,
}: QuestionCardProps) {
  return (
    <div>
      <div className="form-kicker">Question {questionNumber} of {totalQuestions}</div>
      <h1>{question.text}</h1>
      <div className="choice-grid" style={{ marginTop: 28 }}>
        {question.answers.map((answer) => (
          <button
            key={answer.id}
            type="button"
            className={`choice ${selectedAnswerId === answer.id ? 'on' : ''}`}
            onClick={() => onSelect(answer.id)}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
}
