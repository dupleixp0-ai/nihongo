import Image from "next/image";
import { withBase } from "@/lib/base-path";
import type { Kana } from "@/domain/kana";

/** Image carrée (1:1) illustrant l'histoire mnémotechnique d'un caractère. */
export function MnemonicImage({ image }: { image: NonNullable<Kana["image"]> }) {
  return (
    <figure className="w-full max-w-60 shrink-0 sm:w-48">
      <Image
        src={withBase(image.src)}
        alt={image.alt}
        width={512}
        height={512}
        unoptimized
        className="h-auto w-full rounded-md border border-line"
      />
      {image.caption ? (
        <figcaption className="mt-2 text-sm leading-snug text-muted">{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}
