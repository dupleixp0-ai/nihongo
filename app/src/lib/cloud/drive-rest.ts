/**
 * Google Drive : un seul fichier de sauvegarde dans le dossier privé de l'appli (appDataFolder).
 * Ce dossier est invisible dans le Drive de l'utilisateur et seule Nihongo peut le lire.
 * Fonctions pures : le `fetch` et le jeton d'accès sont fournis (tests : scripts/check-cloud.ts).
 */

export const BACKUP_NAME = "nihongo-sauvegarde.json";
const API = "https://www.googleapis.com/drive/v3/files";
const UPLOAD = "https://www.googleapis.com/upload/drive/v3/files";

type Fetch = (input: string, init?: RequestInit) => Promise<Response>;
export type DriveFile = { id: string; modifiedTime: string };

/** Le jeton a expiré ou a été retiré : il faut se reconnecter. */
export class DriveAuthError extends Error {}

async function check(res: Response, what: string) {
  if (res.status === 401 || res.status === 403) throw new DriveAuthError(`${what} : accès refusé (${res.status})`);
  if (!res.ok) throw new Error(`${what} : erreur ${res.status}`);
  return res;
}

const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

export async function findBackup(fetchFn: Fetch, token: string): Promise<DriveFile | null> {
  const q = encodeURIComponent(`name='${BACKUP_NAME}' and trashed=false`);
  const res = await check(
    await fetchFn(`${API}?spaces=appDataFolder&q=${q}&fields=files(id,modifiedTime)&orderBy=modifiedTime desc&pageSize=1`, { headers: auth(token) }),
    "Recherche de la sauvegarde",
  );
  const data = (await res.json()) as { files?: DriveFile[] };
  return data.files?.[0] ?? null;
}

export async function uploadBackup(fetchFn: Fetch, token: string, json: string): Promise<DriveFile> {
  const existing = await findBackup(fetchFn, token);
  if (existing) {
    const res = await check(
      await fetchFn(`${UPLOAD}/${existing.id}?uploadType=media&fields=id,modifiedTime`, {
        method: "PATCH",
        headers: { ...auth(token), "Content-Type": "application/json" },
        body: json,
      }),
      "Mise à jour de la sauvegarde",
    );
    return (await res.json()) as DriveFile;
  }
  // Création : métadonnées (nom, dossier privé) et contenu dans la même requête.
  const boundary = `nihongo${Date.now().toString(36)}`;
  const body =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n` +
    JSON.stringify({ name: BACKUP_NAME, parents: ["appDataFolder"], mimeType: "application/json" }) +
    `\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n${json}\r\n--${boundary}--`;
  const res = await check(
    await fetchFn(`${UPLOAD}?uploadType=multipart&fields=id,modifiedTime`, {
      method: "POST",
      headers: { ...auth(token), "Content-Type": `multipart/related; boundary=${boundary}` },
      body,
    }),
    "Création de la sauvegarde",
  );
  return (await res.json()) as DriveFile;
}

export async function downloadBackup(fetchFn: Fetch, token: string): Promise<{ json: string; modifiedTime: string } | null> {
  const file = await findBackup(fetchFn, token);
  if (!file) return null;
  const res = await check(await fetchFn(`${API}/${file.id}?alt=media`, { headers: auth(token) }), "Lecture de la sauvegarde");
  return { json: await res.text(), modifiedTime: file.modifiedTime };
}
