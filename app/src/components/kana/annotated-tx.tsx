import { ctr } from "@/i18n/content";
import { L } from "@/i18n/t";
import { AnnotatedText } from "./annotated-text";

/** Texte de leçon qui cite des kanji, dans les trois langues : chaque version reçoit ses lectures. */
export function AnnotatedTx({ text }: { text: string }) {
  const v = ctr(text);
  if (v.en === undefined) return <AnnotatedText text={text} />;
  return <L v={{ fr: <AnnotatedText text={v.fr} />, en: <AnnotatedText text={v.en} />, de: <AnnotatedText text={v.de!} /> }} />;
}
