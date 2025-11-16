export function autoTag(message = "") {
  message = message.toLowerCase();

  if (message.includes("refund") || message.includes("return")) return "Refund";

  if (message.includes("payment") || message.includes("failed"))
    return "Payment Issue";

  if (message.includes("delay") || message.includes("status"))
    return "Order Issue";

  if (message.includes("login") || message.includes("account"))
    return "Account";

  if (
    message.includes("crash") ||
    message.includes("bug") ||
    message.includes("error")
  )
    return "Technical";

  return "General";
}
