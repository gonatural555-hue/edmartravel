type TimelineStep = {
  id: string;
  title: string;
  description: string;
  state: "completed" | "current" | "pending";
};

type ReservationTimelineProps = {
  title: string;
  steps: TimelineStep[];
};

function StepIcon({ state }: { state: TimelineStep["state"] }) {
  if (state === "completed") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-white">
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M3.5 8.5L6.5 11.5L12.5 4.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (state === "current") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#7A6248] bg-[#7A6248]/12 text-[#7A6248]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#7A6248]" aria-hidden />
      </span>
    );
  }
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1a1a1a]/14 bg-white text-[#1a1a1a]/30">
      <span className="h-2 w-2 rounded-full bg-[#1a1a1a]/18" aria-hidden />
    </span>
  );
}

export default function ReservationTimeline({
  title,
  steps,
}: ReservationTimelineProps) {
  return (
    <section aria-label={title}>
      <h2 className="font-theater text-xl font-semibold text-[#1a1a1a]">{title}</h2>
      <ol className="relative mt-7 space-y-0">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <li key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast ? (
                <span
                  className="absolute left-4 top-8 h-[calc(100%-1rem)] w-px -translate-x-1/2 bg-[#1a1a1a]/12"
                  aria-hidden
                />
              ) : null}
              <StepIcon state={step.state} />
              <div className="min-w-0 pt-0.5">
                <h3
                  className={`text-sm font-semibold ${
                    step.state === "pending"
                      ? "text-[#1a1a1a]/45"
                      : step.state === "current"
                        ? "text-[#7A6248]"
                        : "text-[#1a1a1a]"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#1a1a1a]/55">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
