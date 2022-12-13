const HOUR = 60 * 60;
const MIN = 60;
export const durationToString = (dur: number): string => {
  dur = Math.round(dur);
  const hours = Math.floor(dur / HOUR);
  dur = dur - hours * HOUR;
  const minutes = Math.floor(dur / MIN);
  dur = dur - minutes * MIN;
  const seconds = dur;
  if (hours > 0) {
    return `${hours}h${minutes}m${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};
