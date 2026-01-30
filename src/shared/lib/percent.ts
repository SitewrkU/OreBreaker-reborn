export function getPercent(now: number, max: number): number{
  if (max === 0) return 0;

  //If infinity
  if (!isFinite(now)) return 100;
  if (!isFinite(max)) return 0;

  const percent = (now / max) * 100;

  return Number(percent.toFixed(1));
}