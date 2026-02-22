"use client";

import React, { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaEventType } from "embla-carousel";
import { usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import Image from "next/image";

const TWEEN_FACTOR_BASE = 0.2;

const SLIDES = [
  "/container/photo_1_2026-02-22_13-37-45.jpg",
  "/container/photo_2_2026-02-22_13-37-45.jpg",
  "/container/photo_3_2026-02-22_13-37-45.jpg",
  "/container/photo_4_2026-02-22_13-37-45.jpg",
  "/container/photo_5_2026-02-22_13-37-45.jpg",
];

const EmblaCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<(HTMLElement | null)[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback(
    (emblaApi: ReturnType<typeof useEmblaCarousel>[1]) => {
      if (!emblaApi) return;
      tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
        return slideNode.querySelector<HTMLElement>(".embla__parallax__layer");
      });
    },
    [],
  );

  const setTweenFactor = useCallback(
    (emblaApi: ReturnType<typeof useEmblaCarousel>[1]) => {
      if (!emblaApi) return;
      tweenFactor.current =
        TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    },
    [],
  );

  const tweenParallax = useCallback(
    (
      emblaApi: ReturnType<typeof useEmblaCarousel>[1],
      event?: EmblaEventType,
    ) => {
      if (!emblaApi) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const engine = emblaApi.internalEngine() as any;
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = event === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex] as number[];

        slidesInSnap.forEach((slideIndex: number) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem: any) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
          const tweenNode = tweenNodes.current[slideIndex];
          if (tweenNode) {
            tweenNode.style.transform = `translateX(${translate}%)`;
          }
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax);
  }, [emblaApi, tweenParallax, setTweenNodes, setTweenFactor]);

  return (
    <div className="embla">
      <div className="embla__viewport-wrapper">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {SLIDES.map((src, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__parallax">
                  <div className="embla__parallax__layer">
                    <Image
                      className="embla__slide__img embla__parallax__img"
                      src={src}
                      alt={`Slide ${index + 1}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invisible overlay buttons */}
        <button
          className="embla__overlay-button embla__overlay-button--prev"
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          type="button"
          aria-label="Previous slide"
        />
        <button
          className="embla__overlay-button embla__overlay-button--next"
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          type="button"
          aria-label="Next slide"
        />
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot".concat(
              index === selectedIndex ? " embla__dot--selected" : "",
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
