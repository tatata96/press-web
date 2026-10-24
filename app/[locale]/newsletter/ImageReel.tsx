import Image from "next/image";
import styles from "./newsletter.module.scss";

type ReelImage = { src: string; width: number; height: number };

type ImageReelProps = {
  images: ReelImage[];
  reverse?: boolean;
};

// A decorative, endlessly looping strip of images. The set is rendered twice
// and the track slides by exactly one set, so the loop has no visible seam.
// Vertical on desktop, horizontal on mobile (see newsletter.module.scss).
export default function ImageReel({ images, reverse = false }: ImageReelProps) {
  return (
    <div className={styles.reel} aria-hidden="true">
      <div className={`${styles.track} ${reverse ? styles.reverse : ""}`}>
        {[0, 1].map((copy) => (
          <div className={styles.set} key={copy}>
            {images.map((image) => (
              <Image
                key={image.src}
                className={styles.image}
                src={image.src}
                width={image.width}
                height={image.height}
                alt=""
                sizes="(min-width: 900px) 25vw, 40vw"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
