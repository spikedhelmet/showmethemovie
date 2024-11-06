function formatTime(totalMinutes: number | undefined) {
  if (totalMinutes === undefined) {
    return "";
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
}

export default formatTime;
