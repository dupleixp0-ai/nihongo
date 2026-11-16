import { LOOKALIKES } from "./kanji-notes";
import { getKanjiByCharacter } from "./kanji";
import { mainReading } from "./kanji-readings";
import type { QuizItem } from "@/components/quiz/quiz";
import { firstSenseTr } from "@/i18n/meanings";

/** Exercice « sosies » : retrouver le bon kanji parmi ceux qui se ressemblent. */
export const lookalikeItems: QuizItem[] = LOOKALIKES.flatMap((group) =>
  group.items.flatMap((item) => {
    const k = getKanjiByCharacter(item.character);
    const r = k && mainReading(k);
    if (!k || !r) return [];
    const meaning = k.meaning.split(/[,;]/)[0];
    const tr = firstSenseTr(k.meaningTr);
    return [{
      id: `/kanji/${k.slug}`, prompt: k.character, answer: r.kana, answerSub: r.romaji, meaning, meaningTr: tr,
      options: group.items.map((i) => i.character),
      clue: `« ${meaning} » ${r.kana} (${r.romaji})`,
      clueTr: { en: tr?.en && `“${tr.en}” ${r.kana} (${r.romaji})`, de: tr?.de && `„${tr.de}“ ${r.kana} (${r.romaji})` },
    }];
  }),
);
