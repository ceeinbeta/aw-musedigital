import { ButtonLink } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { photos } from "@/content/photos";
import { Eyebrow } from "@/components/ui/typography";

/** Editorial hero. Copy can be edited freely; the images come from src/content/photos.ts. */
export function Hero() {
  return (
    <section className="overflow-hidden bg-cream">
      <div className="mx-auto grid w-full max-w-[90rem] items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:px-12 lg:py-24">
        <div className="animate-rise order-2 lg:order-1">
          <Eyebrow>Home · Style · Hosting · Business</Eyebrow>
          <h1 className="mt-7 font-serif text-[2.9rem] font-medium leading-[1.02] tracking-[-0.015em] text-black text-balance sm:text-6xl xl:text-[5.2rem]">
            Considered living, <em className="font-normal">beautifully</em> edited.
          </h1>
          <p className="mt-8 max-w-md text-base leading-[1.85]">
            Practical, beautifully made guides to the way you live: how to arrange a room, build
            a wardrobe, set a table and present your work with care.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/journal">Read the journal</ButtonLink>
            <ButtonLink href="#edits" variant="outline">
              Explore the Edits
            </ButtonLink>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          {/* Sizing lives on wrappers so it never competes with the image's own width. */}
          <div className="ml-auto w-[82%] lg:w-[86%]">
            <Media
              image={photos.heroVase}
              label="Hero photograph"
              ratio="portrait"
              sizes="(min-width: 1024px) 45vw, 82vw"
              priority
            />
          </div>
          <div className="absolute -bottom-6 left-0 w-[42%] border-[6px] border-cream sm:-bottom-10 lg:w-[40%]">
            <Media
              image={photos.heroDetail}
              label="Detail photograph"
              ratio="square"
              sizes="(min-width: 1024px) 20vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
