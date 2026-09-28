/**
 * The identity providers this app offers for sign-in.
 *
 * Source of truth for BOTH the server (`server.ts`, one `genericOAuth` provider
 * per entry) and the client (`client.ts` / sign-in buttons). Kept in its own
 * dependency-free module so the client can import it without pulling the
 * server-only Better Auth instance (and `pg`) into the browser bundle.
 *
 * Two modes (picked server-side in `server.ts`):
 *   - Self-hosted (e.g. own Vercel project): `GOOGLE_CLIENT_ID` /
 *     `GOOGLE_CLIENT_SECRET` are set, and the app talks to Google directly.
 *   - Grok platform / live preview: no Google creds, so sign-in federates to the
 *     shared Grok auth broker, which picks the upstream from the `idp` hint.
 *
 * The `providerId` is this app's local id and the OAuth callback path segment
 * (`/api/auth/oauth2/callback/<providerId>`) — register exactly that URL as an
 * authorized redirect URI in Google Cloud Console.
 *
 * X was dropped: it only works through the Grok broker, not self-hosted.
 */
export type GrokProvider = {
  /** This app's local provider id; also the callback path segment. */
  providerId: string;
  /** Upstream hint the broker forwards to (Better Auth social id). */
  idp: string;
  /** Human label for the sign-in button. */
  label: string;
};

export const GROK_PROVIDERS: readonly GrokProvider[] = [
  { providerId: "google", idp: "google", label: "Google" },
];
