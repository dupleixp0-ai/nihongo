"use client";

/**
 * Connexion Google dans le navigateur (Google Identity Services), pour la sauvegarde sur Drive.
 * Autorisations demandées : le dossier privé de l'appli sur Drive (drive.appdata) et l'adresse e-mail
 * (pour afficher le compte connecté). Le jeton d'accès dure environ une heure et reste en mémoire.
 *
 * Il faut un identifiant d'appli Google (projet Google Cloud) dans NEXT_PUBLIC_GOOGLE_CLIENT_ID.
 * Dans l'appli Android (Capacitor), la connexion passera par le module natif Google ; le reste ne change pas.
 */

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
const SCOPES = "https://www.googleapis.com/auth/drive.appdata openid email";

export const googleConfigured = CLIENT_ID.length > 0;

type TokenResponse = { access_token?: string; expires_in?: number; error?: string };
type TokenClient = { requestAccessToken: (o?: { prompt?: string; login_hint?: string }) => void };
type GoogleOAuth = {
  initTokenClient: (o: { client_id: string; scope: string; callback: (r: TokenResponse) => void; error_callback?: (e: { type: string }) => void }) => TokenClient;
  revoke: (token: string, done?: () => void) => void;
};
declare global {
  interface Window {
    google?: { accounts?: { oauth2?: GoogleOAuth } };
  }
}

let token: { value: string; expires: number } | null = null;
let scriptLoading: Promise<void> | null = null;

function loadScript() {
  scriptLoading ??= new Promise<void>((resolve, reject) => {
    if (window.google?.accounts?.oauth2) return resolve();
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoading = null;
      reject(new Error("Le service de connexion Google ne répond pas (connexion Internet ?)."));
    };
    document.head.appendChild(script);
  });
  return scriptLoading;
}

/** Jeton encore valable (marge d'une minute). */
export function currentToken() {
  return token && token.expires - 60_000 > Date.now() ? token.value : null;
}

/** Ouvre la fenêtre Google (doit suivre un clic de l'utilisateur, sinon le navigateur la bloque). */
export async function signIn(loginHint?: string): Promise<string> {
  if (!googleConfigured) throw new Error("Connexion Google non configurée.");
  await loadScript();
  const oauth = window.google!.accounts!.oauth2!;
  return new Promise<string>((resolve, reject) => {
    const client = oauth.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (r) => {
        if (r.error || !r.access_token) return reject(new Error(r.error ?? "Connexion refusée."));
        token = { value: r.access_token, expires: Date.now() + (r.expires_in ?? 3600) * 1000 };
        resolve(r.access_token);
      },
      error_callback: (e) => reject(new Error(e.type === "popup_closed" ? "Fenêtre de connexion fermée." : "Connexion impossible.")),
    });
    client.requestAccessToken({ prompt: "", login_hint: loginHint });
  });
}

export async function accountEmail(accessToken: string): Promise<string | undefined> {
  try {
    const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: { Authorization: `Bearer ${accessToken}` } });
    if (!res.ok) return undefined;
    return ((await res.json()) as { email?: string }).email;
  } catch {
    return undefined;
  }
}

export function signOut() {
  const value = token?.value;
  token = null;
  if (value) window.google?.accounts?.oauth2?.revoke(value);
}
