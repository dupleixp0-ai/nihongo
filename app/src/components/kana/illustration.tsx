import type { Kana, StoryIllustrationId } from "@/domain/kana";
import {
  Anchor, Cactus, Dock, Elbow, Kimono, Ladle, Lightning, Lips, Mice,
  Mountain, Saddle, Sabre, Slide, Swan, Trapeze, Tube,
} from "./story-illustrations";
import {
  Teacup, Puppy, Tsunami, Phone, Tomato, Narwhal, Nest, Cloud, Lily, Nautilus, Hammock, Owl, Snowman, Hedgehog, Hotel, Mast, Honey, Note, Jellyfish, Sparrow, Yogurt, Yuzu, Yoyo, Grapes, Curtains, Stream, Fox, Tap, Wheel, Orca, Angel,
} from "./story-illustrations-2";
import {
  Tree, Ibis, Factory, Shelf, Parasol, Duck, Kiosk, Spoon, Kangaroo, Chest, Fir, Chimp, Hero, Bucket, Grasshopper, Bull, Champion, Tulip, Table, Totem, Swimmer, Level, Bowtie,
} from "./katakana-illustrations-1";
import {
  Snow, Compass, Barn, Seahorse, Whisk, Hennin, Hockey, Hammer, Millefeuille, Gull, Medal, Windmill, Yacht, Yurt, Yogi, Ramp, Rice, Ribbon, Oar, Robot, Wagon, Origami, Eel,
} from "./katakana-illustrations-2";
import { Elastic } from "./katakana-illustrations-3";

/** Dessine l'illustration d'une histoire à partir de son identifiant et des traits du caractère. */
export function drawIllustration(id: StoryIllustrationId, strokes: string[]) {
  const props = { strokes };
  switch (id) {
    case "anchor": return <Anchor {...props} />;
    case "mice": return <Mice {...props} />;
    case "slide": return <Slide {...props} />;
    case "lightning": return <Lightning {...props} />;
    case "ladle": return <Ladle {...props} />;
    case "cactus": return <Cactus {...props} />;
    case "kimono": return <Kimono {...props} />;
    case "elbow": return <Elbow {...props} />;
    case "dock": return <Dock {...props} />;
    case "lips": return <Lips {...props} />;
    case "sabre": return <Sabre {...props} />;
    case "swan": return <Swan {...props} />;
    case "trapeze": return <Trapeze {...props} />;
    case "saddle": return <Saddle {...props} />;
    case "mountain": return <Mountain {...props} />;
    case "teacup": return <Teacup {...props} />;
    case "puppy": return <Puppy {...props} />;
    case "tsunami": return <Tsunami {...props} />;
    case "phone": return <Phone {...props} />;
    case "tomato": return <Tomato {...props} />;
    case "narwhal": return <Narwhal {...props} />;
    case "nest": return <Nest {...props} />;
    case "cloud": return <Cloud {...props} />;
    case "lily": return <Lily {...props} />;
    case "nautilus": return <Nautilus {...props} />;
    case "hammock": return <Hammock {...props} />;
    case "owl": return <Owl {...props} />;
    case "snowman": return <Snowman {...props} />;
    case "hedgehog": return <Hedgehog {...props} />;
    case "hotel": return <Hotel {...props} />;
    case "mast": return <Mast {...props} />;
    case "honey": return <Honey {...props} />;
    case "note": return <Note {...props} />;
    case "jellyfish": return <Jellyfish {...props} />;
    case "sparrow": return <Sparrow {...props} />;
    case "yogurt": return <Yogurt {...props} />;
    case "yuzu": return <Yuzu {...props} />;
    case "yoyo": return <Yoyo {...props} />;
    case "grapes": return <Grapes {...props} />;
    case "curtains": return <Curtains {...props} />;
    case "stream": return <Stream {...props} />;
    case "fox": return <Fox {...props} />;
    case "tap": return <Tap {...props} />;
    case "wheel": return <Wheel {...props} />;
    case "orca": return <Orca {...props} />;
    case "angel": return <Angel {...props} />;
    case "tree": return <Tree {...props} />;
    case "ibis": return <Ibis {...props} />;
    case "factory": return <Factory {...props} />;
    case "shelf": return <Shelf {...props} />;
    case "parasol": return <Parasol {...props} />;
    case "duck": return <Duck {...props} />;
    case "kiosk": return <Kiosk {...props} />;
    case "spoon": return <Spoon {...props} />;
    case "kangaroo": return <Kangaroo {...props} />;
    case "chest": return <Chest {...props} />;
    case "fir": return <Fir {...props} />;
    case "chimp": return <Chimp {...props} />;
    case "hero": return <Hero {...props} />;
    case "bucket": return <Bucket {...props} />;
    case "grasshopper": return <Grasshopper {...props} />;
    case "bull": return <Bull {...props} />;
    case "champion": return <Champion {...props} />;
    case "tulip": return <Tulip {...props} />;
    case "table": return <Table {...props} />;
    case "totem": return <Totem {...props} />;
    case "swimmer": return <Swimmer {...props} />;
    case "level": return <Level {...props} />;
    case "bowtie": return <Bowtie {...props} />;
    case "snow": return <Snow {...props} />;
    case "compass": return <Compass {...props} />;
    case "barn": return <Barn {...props} />;
    case "seahorse": return <Seahorse {...props} />;
    case "whisk": return <Whisk {...props} />;
    case "hennin": return <Hennin {...props} />;
    case "hockey": return <Hockey {...props} />;
    case "hammer": return <Hammer {...props} />;
    case "millefeuille": return <Millefeuille {...props} />;
    case "gull": return <Gull {...props} />;
    case "medal": return <Medal {...props} />;
    case "windmill": return <Windmill {...props} />;
    case "yacht": return <Yacht {...props} />;
    case "yurt": return <Yurt {...props} />;
    case "yogi": return <Yogi {...props} />;
    case "ramp": return <Ramp {...props} />;
    case "rice": return <Rice {...props} />;
    case "ribbon": return <Ribbon {...props} />;
    case "oar": return <Oar {...props} />;
    case "robot": return <Robot {...props} />;
    case "wagon": return <Wagon {...props} />;
    case "origami": return <Origami {...props} />;
    case "eel": return <Eel {...props} />;
    case "elastic": return <Elastic {...props} />;
  }
}

type IllustrationProps = {
  illustration: NonNullable<Kana["illustration"]>;
  strokes?: string[];
  /** Légende dans les trois langues ; par défaut, celle de l'illustration (français). */
  caption?: React.ReactNode;
};

export function Illustration({ illustration, strokes = [], caption }: IllustrationProps) {
  const all = illustration.strokes ?? strokes;
  const marks = illustration.marks ?? 0;
  const body = marks ? all.slice(0, all.length - marks) : all;
  const markStrokes = marks ? all.slice(all.length - marks) : [];

  return (
    <figure className="w-56 shrink-0 sm:w-60">
      <div className="relative overflow-hidden rounded-xl border border-line">
        {drawIllustration(illustration.id, body)}
        {markStrokes.length ? (
          <svg aria-hidden="true" viewBox="0 0 109 109" className="absolute inset-0 h-full w-full">
            {markStrokes.map((d, i) => (
              <Tube key={i} d={d} w={4.6} color="#f2736b" />
            ))}
          </svg>
        ) : null}
        {illustration.companion ? (
          <div className="absolute bottom-1.5 right-1.5 w-[38%] overflow-hidden rounded border-2 border-white shadow-md">
            {drawIllustration(illustration.companion.id, illustration.companion.strokes)}
          </div>
        ) : null}
      </div>
      <figcaption className="mt-2 text-sm leading-snug text-muted">{caption ?? illustration.caption}</figcaption>
    </figure>
  );
}
