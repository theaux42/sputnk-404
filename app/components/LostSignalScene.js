import Link from "next/link";
import { headers } from "next/headers";
import WireframeGrid from "./WireframeGrid";

export default function LostSignalScene() {
  const headerList = headers();
  const requestedHost =
    headerList.get("x-forwarded-host") || headerList.get("host") || "unknown.sputnk.net";
  const forwardedProto = headerList.get("x-forwarded-proto") || "https";
  const requestedPath =
    headerList.get("x-forwarded-uri") || headerList.get("x-invoke-path") || "";
  const requestedEndpoint = `${forwardedProto}://${requestedHost}${requestedPath}`;

  const telemetryLog = [
    `[404.1] Attempting secure handshake with ${requestedEndpoint} ... no beacon detected.`,
    "[404.2] Initiating orbital scan for fallback relays ... 0 listening stations online.",
    `[404.3] Packet reroute suggested: confirm call sign \"${requestedHost}\" with mission control.`,
    "[404.4] Logged anomaly to SPUTNK incident matrix for post-flight review.",
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden not-found-sky"
      style={{ background: "var(--bg-primary)" }}
    >
      <WireframeGrid />

      <div className="sputnk-flight-field" aria-hidden="true">
        <img src="/sputnk-logo.png" alt="" className="flight-path flight-path-a" />
        <img src="/sputnk-logo.png" alt="" className="flight-path flight-path-b" />
        <img src="/sputnk-logo.png" alt="" className="flight-path flight-path-c" />
      </div>

      <main className="relative z-10 flex items-center justify-center px-6 py-24 min-h-screen">
        <section className="fallback-panel shell text-center lost-scene-panel">
          <span className="lost-code-emblem" aria-hidden="true">
            404
          </span>
          <p className="text-label lost-signal-pill">SPUTNK RESPONSE CODE :: 404</p>
          <h1 className="not-found-title">Signal Lost</h1>
          <p className="not-found-lede">
            The requested outpost drifted outside our telemetry range. Traefik redirected the call
            here after every SPUTNK relay reported silence.
          </p>

          <div className="telemetry-block">
            <p className="text-label telemetry-label">Telemetry Feed</p>
            <div className="telemetry-console" role="log" aria-live="polite">
              {telemetryLog.map((line) => (
                <p key={line} className="telemetry-console-line">
                  <span className="command-badge">C&gt; </span>
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="lost-actions">
            <Link href="/" className="btn btn-primary">
              Return to Mission Control
            </Link>
            <a
              href="mailto:support@sputnk.net?subject=Unknown%20subdomain"
              className="btn btn-ghost"
            >
              Report Incident
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
