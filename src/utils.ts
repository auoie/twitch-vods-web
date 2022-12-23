const HOUR = 60 * 60;
const MIN = 60;
export const durationToString = (dur: number): string => {
  dur = Math.round(dur);
  const hours = Math.floor(dur / HOUR);
  dur = dur - hours * HOUR;
  const minutes = Math.floor(dur / MIN);
  dur = dur - minutes * MIN;
  const seconds = dur;
  const secStr = `${seconds}`.padStart(2, "0");
  const minStr = `${minutes}`.padStart(2, "0");
  if (hours > 0) {
    return `${hours}:${minStr}:${secStr}`;
  } else {
    return `${minutes}:${secStr}`;
  }
};
