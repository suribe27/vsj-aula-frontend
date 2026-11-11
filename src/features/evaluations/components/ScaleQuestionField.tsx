import type { ScaleQuestion } from '../domain/types';

const VALUES = [1, 2, 3, 4, 5];

interface ScaleQuestionFieldProps {
  question: ScaleQuestion;
  defaultValue?: number;
  error?: string;
}

export function ScaleQuestionField({ question, defaultValue, error }: ScaleQuestionFieldProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-slate-800 dark:text-slate-200">{question.label}</legend>
      <div className="flex items-center gap-2">
        <span className="w-16 text-right text-xs text-slate-500 dark:text-slate-400">{question.low}</span>
        <div className="flex flex-1 justify-between gap-1 sm:justify-start sm:gap-3">
          {VALUES.map((value) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                name={question.key}
                value={value}
                defaultChecked={defaultValue === value}
                required
                className="peer sr-only"
              />
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-sm font-semibold text-slate-700 transition peer-checked:border-teal-700 peer-checked:bg-teal-700 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-teal-600 hover:border-teal-600 dark:border-slate-600 dark:text-slate-200">
                {value}
              </span>
            </label>
          ))}
        </div>
        <span className="w-16 text-xs text-slate-500 dark:text-slate-400">{question.high}</span>
      </div>
      {error && <p className="text-xs font-medium text-red-700 dark:text-red-400">{error}</p>}
    </fieldset>
  );
}
