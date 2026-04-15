const pad = (value: number, length = 2): string =>
  String(value).padStart(length, "0");

export function convertDate(date: string, format = "yyyy-mm-dd"): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const hours24 = parsedDate.getUTCHours();
  const hours12 = hours24 % 12 || 12;

  const formatters: Record<string, string> = {
    yyyy: String(parsedDate.getUTCFullYear()),
    yy: String(parsedDate.getUTCFullYear()).slice(-2),
    mm: pad(parsedDate.getUTCMonth() + 1),
    m: String(parsedDate.getUTCMonth() + 1),
    dd: pad(parsedDate.getUTCDate()),
    d: String(parsedDate.getUTCDate()),
    HH: pad(hours24),
    H: String(hours24),
    hh: pad(hours12),
    h: String(hours12),
    MM: pad(parsedDate.getUTCMinutes()),
    M: String(parsedDate.getUTCMinutes()),
    ss: pad(parsedDate.getUTCSeconds()),
    s: String(parsedDate.getUTCSeconds()),
    fff: pad(parsedDate.getUTCMilliseconds(), 3),
    tt: hours24 >= 12 ? "PM" : "AM",
  };

  const tokenRegex = /(yyyy|fff|yy|mm|dd|HH|hh|MM|ss|tt|m|d|H|h|M|s)/g;

  return format.replace(tokenRegex, (token) => formatters[token] ?? token);
}
