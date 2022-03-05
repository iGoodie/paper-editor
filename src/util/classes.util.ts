export function classes(...elements: any[]) {
  return elements.filter((e) => typeof e === "string").join(" ");
}
