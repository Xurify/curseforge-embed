export function truncate(text: string, maxLength: number = 20) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength).trim() + "...";
}

