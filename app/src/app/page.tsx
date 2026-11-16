import { PLAN } from "@/data/plan";
import { allSrsItems, lessonOrder } from "@/data/srs-items";
import { Dashboard } from "@/components/home/dashboard";

/** Accueil : le tableau de bord du jour (révisions, kanji du jour, suite des leçons, progression). */
export default function Home() {
  return <Dashboard items={allSrsItems()} order={lessonOrder()} plan={PLAN} />;
}
