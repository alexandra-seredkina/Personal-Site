/** Decorative, fixed backdrop: grid, glows and grain. Pure CSS, hidden from assistive tech. */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="absolute -top-48 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      <div className="absolute top-[40rem] -right-40 size-[32rem] rounded-full bg-accent-2/15 blur-[140px]" />
      <div className="absolute top-[110rem] -left-40 size-[28rem] rounded-full bg-accent/10 blur-[140px]" />
    </div>
  );
}
