import { format } from 'date-fns';

type HeroImageProps = {
  currentDate: Date;
};

export function HeroImage({ currentDate }: HeroImageProps) {
  const month = format(currentDate, 'MMMM');
  const year = format(currentDate, 'yyyy');

  return (
    <div className="relative min-h-56 overflow-hidden rounded-2xl border border-gray-200 bg-slate-900">
      <div
        aria-hidden="true"
        className="absolute inset-0 scale-105 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.28),transparent_40%),linear-gradient(140deg,#dbeafe_0%,#93c5fd_42%,#1e293b_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-slate-950/5 via-slate-950/20 to-slate-950/70"
      />

      <div className="relative flex min-h-56 items-end p-6">
        <div className="space-y-2 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
            {year}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {month}
          </h2>
        </div>
      </div>
    </div>
  );
}
