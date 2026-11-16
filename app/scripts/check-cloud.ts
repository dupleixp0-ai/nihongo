import assert from "node:assert/strict";
import { BACKUP_NAME, downloadBackup, DriveAuthError, findBackup, uploadBackup } from "../src/lib/cloud/drive-rest";

/**
 * Tests de la sauvegarde Google Drive contre un faux serveur Drive (en mémoire).
 * Vérifie les requêtes envoyées ; la vraie connexion Google, elle, se teste avec un identifiant d'appli.
 */

type Call = { url: string; method: string; headers: Record<string, string>; body?: string };
function fakeDrive() {
  const files = new Map<string, { name: string; parents: string[]; content: string; modifiedTime: string }>();
  const calls: Call[] = [];
  let n = 0;
  const fetchFn = async (url: string, init: RequestInit = {}) => {
    const headers = (init.headers ?? {}) as Record<string, string>;
    const method = init.method ?? "GET";
    calls.push({ url, method, headers, body: init.body as string | undefined });
    if (headers.Authorization !== "Bearer bon-jeton") return new Response("{}", { status: 401 });
    const u = new URL(url);
    const stamp = `2026-11-15T10:00:0${n++}Z`;
    if (method === "GET" && u.pathname === "/drive/v3/files") {
      assert.equal(u.searchParams.get("spaces"), "appDataFolder");
      const list = [...files.entries()].filter(([, f]) => f.name === BACKUP_NAME).map(([id, f]) => ({ id, modifiedTime: f.modifiedTime }));
      return Response.json({ files: list });
    }
    if (method === "POST" && u.pathname === "/upload/drive/v3/files") {
      const body = String(init.body);
      const boundary = headers["Content-Type"].split("boundary=")[1];
      const parts = body.split(`--${boundary}`).map((p) => p.split("\r\n\r\n")[1]?.replace(/\r\n$/, "")).filter(Boolean);
      const meta = JSON.parse(parts[0]!);
      const id = `f${files.size + 1}`;
      files.set(id, { name: meta.name, parents: meta.parents, content: parts[1]!, modifiedTime: stamp });
      return Response.json({ id, modifiedTime: stamp });
    }
    const patch = u.pathname.match(/^\/upload\/drive\/v3\/files\/(\w+)$/);
    if (method === "PATCH" && patch) {
      const f = files.get(patch[1])!;
      f.content = String(init.body);
      f.modifiedTime = stamp;
      return Response.json({ id: patch[1], modifiedTime: stamp });
    }
    const get = u.pathname.match(/^\/drive\/v3\/files\/(\w+)$/);
    if (method === "GET" && get && u.searchParams.get("alt") === "media") return new Response(files.get(get[1])!.content);
    return new Response("inconnu", { status: 404 });
  };
  return { files, calls, fetchFn };
}

async function main() {
  let n = 0;
  const test = async (name: string, fn: () => Promise<void>) => {
    await fn();
    n++;
    console.log("✓", name);
  };

  await test("première sauvegarde : un fichier créé dans le dossier privé", async () => {
    const d = fakeDrive();
    await uploadBackup(d.fetchFn, "bon-jeton", '{"a":1}');
    assert.equal(d.files.size, 1);
    const f = [...d.files.values()][0];
    assert.deepEqual(f.parents, ["appDataFolder"]);
    assert.equal(f.content, '{"a":1}');
  });
  await test("sauvegardes suivantes : le même fichier est mis à jour", async () => {
    const d = fakeDrive();
    await uploadBackup(d.fetchFn, "bon-jeton", '{"a":1}');
    await uploadBackup(d.fetchFn, "bon-jeton", '{"a":2}');
    assert.equal(d.files.size, 1);
    assert.equal([...d.files.values()][0].content, '{"a":2}');
    assert.equal(d.calls.filter((c) => c.method === "PATCH").length, 1);
  });
  await test("restauration : on relit le dernier contenu", async () => {
    const d = fakeDrive();
    assert.equal(await downloadBackup(d.fetchFn, "bon-jeton"), null);
    await uploadBackup(d.fetchFn, "bon-jeton", '{"cartes":3}');
    const r = await downloadBackup(d.fetchFn, "bon-jeton");
    assert.equal(r?.json, '{"cartes":3}');
  });
  await test("jeton expiré : erreur d'autorisation (il faut se reconnecter)", async () => {
    const d = fakeDrive();
    await assert.rejects(findBackup(d.fetchFn, "vieux-jeton"), DriveAuthError);
  });
  console.log(`\n${n} tests de la sauvegarde Drive réussis.`);
}

void main();
