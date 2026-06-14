import { describe, expect, it } from "vitest";

import { MemoryApiRepository } from "../../../src/server/api/memory-repository";
import { quotePostage } from "../../../src/server/api/postage-service";

const recipient = `G${"A".repeat(55)}`;
const sender = `G${"B".repeat(55)}`;

describe("postage service", () => {
  it("returns zero postage for explicitly allowed senders", async () => {
    const repository = new MemoryApiRepository();
    await repository.setPolicy(recipient, {
      allowUnknown: true,
      minimumPostage: "100",
      requireVerified: true,
    });
    await repository.setSenderRule(recipient, sender, "allow");

    await expect(quotePostage(repository, { recipient, sender })).resolves.toMatchObject({
      amount: "0",
      eligible: true,
      trusted: true,
    });
  });

  it("marks blocked senders as ineligible", async () => {
    const repository = new MemoryApiRepository();
    await repository.setSenderRule(recipient, sender, "block");

    await expect(quotePostage(repository, { recipient, sender })).resolves.toMatchObject({
      eligible: false,
      reason: "sender_blocked",
    });
  });
});
