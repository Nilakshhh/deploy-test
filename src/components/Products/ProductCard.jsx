import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import "./embla.css";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [ClassNames()]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       if (!emblaApi) return;
  //       if (emblaApi.canScrollNext()) {
  //         emblaApi.scrollNext();
  //       } else {
  //         emblaApi.scrollTo(0);
  //       }
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   }, [emblaApi]);

  return (
    <Card className="product-card">
      <CardHeader>
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {product.media.map((media, index) => (
                <div className="embla__slide embla__class-names" key={index}>
                  {media.endsWith(".mp4") ? (
                    <video className="embla__slide__img" src={`http://localhost:5000/${media}`} controls />
                  ) : (
                    <img
                      className="embla__slide__img"
                      src={`http://localhost:5000/${media}`}
                      alt={product.title}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="embla__controls">
            <div className="embla__buttons">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>

            <div className="embla__dots">
              {scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={"embla__dot".concat(
                    index === selectedIndex ? " embla__dot--selected" : ""
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="product-details">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-cost">${product.cost}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
