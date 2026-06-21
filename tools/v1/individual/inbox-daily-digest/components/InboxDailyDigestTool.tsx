import { FormEvent, useMemo, useState } from "react";
import type { JSX } from "react";

import { DigestEmptyState } from "./states/DigestEmptyState";
import { DigestErrorState } from "./states/DigestErrorState";
import { DigestLoadingState } from "./states/DigestLoadingState";
import { DigestSuccessState } from "./states/DigestSuccessState";

export type DigestStatus = "empty" | "loading" | "error" | "success";

export interface DigestEmailPreview {
  id: string;
  sender: string;
  subject: string;
  receivedAt: string;
  priority: "low" | "normal" | "high";
}

export interface DigestInsight {
  id: string;
  label: string;
  value: string;
}

export interface DailyDigest {
  dateLabel: string;
  summary: string;
  insights: DigestInsight[];
  topEmails: DigestEmailPreview[];
  nextActions: string[];
}

const SAMPLE_DIGEST: DailyDigest = {
  dateLabel: "Today",
  summary:
    "Your inbox is calm overall, with one partner reply needing a same-day response and two low-risk updates that can wait until tomorrow.",
  insights: [
    { id: "priority", label: "High priority", value: "1" },
    { id: "waiting", label: "Needs reply", value: "3" },
    { id: "quiet", label: "Can archive", value: "7" },
  ],
  topEmails: [
    {
      id: "partner-brief",
      sender: "Mira Chen",
      subject: "Partner launch brief follow-up",
      receivedAt: "09:14",
      priority: "high",
    },
    {
      id: "billing",
      sender: "Stellar Billing",
      subject: "Receipt for workspace postage",
      receivedAt: "08:42",
      priority: "normal",
    },
    {
      id: "calendar",
      sender: "Operations",
      subject: "Updated onboarding calendar",
      receivedAt: "07:58",
      priority: "normal",
    },
  ],
  nextActions: [
    "Reply to Mira before the launch review.",
    "Confirm the onboarding calendar update.",
    "Archive low-priority status emails after review.",
  ],
};

export interface InboxDailyDigestToolProps {
  initialDigest?: DailyDigest;
}

export function InboxDailyDigestTool({
  initialDigest = SAMPLE_DIGEST,
}: InboxDailyDigestToolProps): JSX.Element {
  const [status, setStatus] = useState<DigestStatus>("empty");
  const [includeReceipts, setIncludeReceipts] = useState(true);
  const [includeLowPriority, setIncludeLowPriority] = useState(false);
  const [digestTone, setDigestTone] = useState("Focused");
  const [errorMessage, setErrorMessage] = useState("");

  const filteredDigest = useMemo<DailyDigest>(() => {
    const topEmails = initialDigest.topEmails.filter((email) => {
      if (includeLowPriority) return true;
      return email.priority !== "low";
    });

    const nextActions = includeReceipts
      ? initialDigest.nextActions
      : initialDigest.nextActions.filter((action) => !action.toLowerCase().includes("receipt"));

    return { ...initialDigest, topEmails, nextActions };
  }, [includeLowPriority, includeReceipts, initialDigest]);

  function handleGenerate(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setErrorMessage("");
    setStatus("loading");

    window.setTimeout(() => {
      setStatus("success");
    }, 450);
  }

  function handleShowError(): void {
    setErrorMessage("The digest could not load because no mailbox snapshot was available.");
    setStatus("error");
  }

  function handleRetry(): void {
    setErrorMessage("");
    setStatus("loading");

    window.setTimeout(() => {
      setStatus("success");
    }, 450);
  }

  function handleReset(): void {
    setErrorMessage("");
    setStatus("empty");
  }

  return (
    <section className="idd-shell" aria-labelledby="idd-title">
      <div className="idd-header">
        <div>
          <p className="idd-kicker">Individual tool</p>
          <h1 id="idd-title">Inbox Daily Digest</h1>
        </div>
        <span className="idd-badge" aria-label="V1 launch tool">
          V1
        </span>
      </div>

      <form className="idd-controls" onSubmit={handleGenerate} aria-describedby="idd-help">
        <p id="idd-help" className="idd-help">
          Configure a local digest preview before any future inbox integration.
        </p>

        <fieldset>
          <legend>Digest scope</legend>
          <label className="idd-checkbox">
            <input
              type="checkbox"
              checked={includeReceipts}
              onChange={(event) => setIncludeReceipts(event.target.checked)}
            />
            Include receipts
          </label>
          <label className="idd-checkbox">
            <input
              type="checkbox"
              checked={includeLowPriority}
              onChange={(event) => setIncludeLowPriority(event.target.checked)}
            />
            Include low-priority mail
          </label>
        </fieldset>

        <label className="idd-field">
          <span>Digest tone</span>
          <select value={digestTone} onChange={(event) => setDigestTone(event.target.value)}>
            <option>Focused</option>
            <option>Detailed</option>
            <option>Brief</option>
          </select>
        </label>

        <div className="idd-actions">
          <button type="submit">Generate digest</button>
          <button type="button" className="idd-secondary" onClick={handleShowError}>
            Preview error
          </button>
          <button type="button" className="idd-ghost" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      <div className="idd-status" role="region" aria-live="polite" aria-label="Digest preview">
        {status === "empty" ? <DigestEmptyState /> : null}
        {status === "loading" ? <DigestLoadingState /> : null}
        {status === "error" ? (
          <DigestErrorState message={errorMessage} onRetry={handleRetry} />
        ) : null}
        {status === "success" ? (
          <DigestSuccessState digest={filteredDigest} tone={digestTone} onReset={handleReset} />
        ) : null}
      </div>
    </section>
  );
}
