export function autoPriority(message = "") {
  message = message.toLowerCase();

  if (
    message.includes("urgent") ||
    message.includes("immediately") ||
    message.includes("not working") ||
    message.includes("crash") ||
    message.includes("failed") ||
    message.includes("error")
  ) {
    return "High";
  }

  if (
    message.includes("refund") ||
    message.includes("return") ||
    message.includes("delay") ||
    message.includes("status") ||
    message.includes("issue")
  ) {
    return "Medium";
  }

  return "Low"; 
}
