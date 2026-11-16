import Link from "next/link";
import { Gate } from "@/components/site/gate";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { dialogues, getDialogue } from "@/data/dialogues";
import type { DialogueLine } from "@/domain/dialogue";
import { DialogueRunner, type RDialogue, type RLine } from "@/components/dialogue/dialogue-runner";
import { DocTitleText } from "@/components/site/doc-title";
import { ctext, ctr } from "@/i18n/content";
import { LANGS, type Lang } from "@/i18n/lang";
import { MESSAGES } from "@/i18n/messages";
import { T } from "@/i18n/t";
import { Tx } from "@/i18n/tx";
import { kanaToHepburn, sentenceRomaji } from "@/lib/romaji";

export function generateStaticParams() {
  return dialogues.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/dialogue/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = getDialogue(slug);
  if (!d) return {};
  return { title: `${d.titleFr} · Dialogue · Nihongo`, description: d.intro };
}

const line = <X extends DialogueLine>(l: X, rom: (kana: string) => string) => ({
  ...l,
  fr: ctr(l.fr),
  romaji: rom(l.kana),
  words: l.words?.map((w) => ({ ...w, fr: ctr(w.fr), romaji: rom(w.kana) })),
});

export default async function DialoguePage({ params }: PageProps<"/dialogue/[slug]">) {
  const { slug } = await params;
  const d = getDialogue(slug);
  if (!d) notFound();
  const titles = Object.fromEntries(LANGS.map((l) => [l, `${ctext(d.titleFr, l)} · ${MESSAGES[l].docTitle.dialogue}`])) as Record<Lang, string>;
  const rom = (kana: string) => sentenceRomaji(kana, d.partnerKana ? [d.partnerKana] : []);
  const run: RDialogue = {
    slug: d.slug,
    partner: ctr(d.partner),
    turns: d.turns.map((t) =>
      t.kind === "say"
        ? { ...line(t, rom), kind: "say" as const }
        : { kind: "reply" as const, prompt: ctr(t.prompt), choices: t.choices.map((c) => ({ ...(line(c, rom) as RLine), ok: c.ok, why: c.why ? ctr(c.why) : undefined })) },
    ),
  };
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-6 sm:px-8 sm:py-10">
      <DocTitleText titles={titles} />
      <Link href="/dialogue" className="inline-flex items-center gap-1.5 py-1.5 text-[15px] font-medium text-indigo hover:text-indigo-deep">
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4"><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <T m={(m) => m.dialogue.title} />
      </Link>
      <div className="mt-4">
      <Gate id={`/dialogue/${slug}`} glyph={d.title} title={<Tx t={d.titleFr} />} sub={<Tx t={d.intro} />}>
      <header>
        <p lang="ja" className="font-kana text-4xl">{d.title}</p>
        <p className="text-muted"><span lang="ja" className="font-kana text-indigo-deep">{d.titleKana}</span> · {kanaToHepburn(d.titleKana)}</p>
        <h1 className="mt-1 text-2xl font-semibold"><Tx t={d.titleFr} /></h1>
        <p className="mt-2 text-muted"><Tx t={d.intro} /></p>
      </header>
      <div className="mt-6">
        <DialogueRunner dialogue={run} />
      </div>
      </Gate>
      </div>
    </main>
  );
}
