import type { JSX } from "react";

import type { DailyDigest } from "../InboxDailyDigestTool";

export interface DigestSuccessStateProps {
  digest: DailyDigest;
  tone: string;
  onReset: () => void;
}

export function DigestSuccessState({
  digest,
  tone,
  onReset,
}: DigestSuccessStateProps): JSX.Element {
  return (
    <article className="idd-panel idd-success" aria-labelledby="idd-result-title">
      <div className="idd-result-heading">
        <div>
          <p className="idd-state-label">{digest.dateLabel}</p>
          <h2 id="idd-result-title">{tone} digest</h2>
        </div>
        <button type="button" className="idd-secondary" onClick={onReset}>
          Clear
        </button>
      </div>

      <p className="idd-summary">{digest.summary}</p>

      <dl className="idd-insights" aria-label="Digest metrics">
        {digest.insights.map((insight) => (
          <div key={insight.id}>
            <dt>{insight.label}</dt>
            <dd>{insight.value}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="idd-top-email-title">
        <h3 id="idd-top-email-title">Top mail</h3>
        <ul className="idd-email-list">
          {digest.topEmails.map((email) => (
            <li key={email.id}>
              <span className={`idd-priority idd-priority-${email.priority}`}>
                {email.priority}
              </span>
              <div>
                <strong>{email.subject}</strong>
                <span>
                  {email.sender} at {email.receivedAt}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="idd-actions-title">
        <h3 id="idd-actions-title">Next actions</h3>
        <ol className="idd-next-actions">
          {digest.nextActions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ol>
      </section>
    </article>
  );
}
