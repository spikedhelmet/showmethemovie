function formatTime(totalMinutes) {
  const hours = parseInt(Math.floor(totalMinutes / 60));
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
}

export default formatTime;
