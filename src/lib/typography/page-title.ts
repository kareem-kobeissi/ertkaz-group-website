// Discretionary breaks preserve the supplied wording and the shared font size.
// They appear as hyphens only when a long service name cannot fit a narrow line.
const titleBreaks: Record<string, string> = {
  Restructuring: "Restruc\u00adturing",
  Management: "Manage\u00adment",
  Consultancy: "Consul\u00adtancy",
  Feasibility: "Feasi\u00adbility",
  Structuring: "Struc\u00adturing",
  Formulation: "Formu\u00adlation",
  Development: "Devel\u00adopment",
};

export function withTitleBreaks(title: string): string {
  return title.replace(/[A-Za-z]+/g, (word) => titleBreaks[word] ?? word);
}
