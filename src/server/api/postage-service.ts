import type { ApiRepository } from "./repository";
import { getMailboxPolicy } from "./policy-service";

export async function quotePostage(
  repository: ApiRepository,
  input: { recipient: string; sender: string },
) {
  const rule = await repository.getSenderRule(input.recipient, input.sender);
  const { policy } = await getMailboxPolicy(repository, input.recipient);

  if (rule === "block") {
    return {
      amount: policy.minimumPostage,
      eligible: false,
      reason: "sender_blocked" as const,
      trusted: false,
    };
  }

  const trusted = rule === "allow";
  return {
    amount: trusted ? "0" : policy.minimumPostage,
    eligible: true,
    reason: trusted ? ("trusted_sender" as const) : ("mailbox_minimum" as const),
    trusted,
  };
}
