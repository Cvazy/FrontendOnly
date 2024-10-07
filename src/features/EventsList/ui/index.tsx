import { FC, useRef, useState } from "react";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import classes from "./EventsList.module.scss";
import BlueArrowIcon from "shared/assets/images/blue_arrow.svg";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
import { ISegment } from "entities/Segment";
import { breakpoints } from "./../model";

interface EventsListProps {
  events: ISegment[];
}

export const EventsList: FC<EventsListProps> = ({ events }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateButtonsState = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
      updateButtonsState();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
      updateButtonsState();
    }
  };

  const handleSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    updateButtonsState();
  };

  return (
    <div className={classes.Container}>
      <button
        type="button"
        className={classes.Btn}
        onClick={handlePrev}
        disabled={isBeginning}
      >
        <img src={BlueArrowIcon} alt="Arrow" loading="lazy" draggable="false" />
      </button>

      <SwiperComponent
        modules={[Navigation]}
        navigation={false}
        onSwiper={handleSwiper}
        onSlideChange={updateButtonsState}
        spaceBetween={25}
        slidesPerView={1.5}
        breakpoints={breakpoints}
      >
        {events &&
          events.map(({ id, year, description }) => (
            <SwiperSlide className={classes.Slide} key={id}>
              <div className={classes.Event}>
                <p className={classes.Year}>{year}</p>
                <p className={classes.Description}>{description}</p>
              </div>
            </SwiperSlide>
          ))}
      </SwiperComponent>

      <button
        type="button"
        className={classes.Btn}
        onClick={handleNext}
        disabled={isEnd}
      >
        <img src={BlueArrowIcon} alt="Arrow" loading="lazy" draggable="false" />
      </button>
    </div>
  );
};
