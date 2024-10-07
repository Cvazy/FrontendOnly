import { useEffect, useState } from "react";
import classes from "./TimeSegments.module.scss";
import { EventsList } from "features";
import ArrowIcon from "shared/assets/images/arrow.svg";
import { categoryApi } from "entities/Category";
import { segmentsApi } from "entities/Segment";
import { Loader } from "shared";

export const TimeSegments = () => {
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error: categoriesError,
  } = categoryApi.useFetchAllCategoriesQuery(null);

  const [activeSegment, setActiveSegment] = useState(
    (categories && categories[0]?.id) || 1,
  );

  const {
    data: events,
    isLoading: eventsIsLoading,
    error: eventsError,
  } = segmentsApi.useFetchAllCategoriesQuery(activeSegment);

  const [activeIndex, setActiveIndex] = useState(0);
  const totalSegments = categories?.length || 0;

  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const duration = 300;

  const animateValue = (
    start: number,
    end: number,
    duration: number,
    setValue: (value: number) => void,
  ) => {
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + (end - start) * progress);

      setValue(value);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (events && events.length > 0) {
      const firstYear = events[0]?.year || 0;
      const lastYear = events[events.length - 1]?.year || 0;

      animateValue(startYear, firstYear, duration, setStartYear);
      animateValue(endYear, lastYear, duration, setEndYear);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % totalSegments;
    setActiveIndex(newIndex);
    setActiveSegment(newIndex + 1);
  };

  const handlePrev = () => {
    const newIndex = (activeIndex - 1 + totalSegments) % totalSegments;
    setActiveIndex(newIndex);
    setActiveSegment(newIndex + 1);
  };

  const handleSegmentClick = (id: number) => {
    setActiveIndex(id - 1);
    setActiveSegment(id);
  };

  return (
    <>
      {(categoriesIsLoading || eventsIsLoading) && <Loader />}

      <div className={classes.TimeSegments}>
        <div className={classes.Wrapper}>
          {categoriesError || eventsError ? (
            <p className={classes.Error}>
              Произошла ошибка при загрузке данных
            </p>
          ) : (
            <>
              <div className={classes.TopBlock}>
                <h1 className={classes.Title}>
                  Исторические <br />
                  даты
                </h1>

                <div className={classes.MainCircle}>
                  <div className={classes.Segment}>
                    <p className={classes.Blue}>{startYear}</p>

                    <p className={classes.Pink}>{endYear}</p>
                  </div>

                  {categories &&
                    categories.map(({ id, name }, index) => {
                      const difference =
                        (index - activeIndex + totalSegments) % totalSegments;
                      const isClockwise = difference <= totalSegments / 2;

                      const rotateDeg = isClockwise
                        ? difference * 60
                        : (difference - totalSegments) * 60;

                      return (
                        <div
                          key={id}
                          className={`${classes.DotWrapper} ${
                            index === activeIndex ? classes.ActiveSegment : ""
                          }`}
                          style={{
                            rotate: `${rotateDeg + 30}deg`,
                          }}
                          onClick={() => handleSegmentClick(id)}
                        >
                          <div
                            className={classes.Dot}
                            style={{
                              rotate: `${-rotateDeg - 30}deg`,
                            }}
                          >
                            <p className={classes.Order}>{id}</p>
                            <p className={classes.Category}>{name}</p>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className={classes.Pagination}>
                  <div className={classes.PaginationWrapper}>
                    <p className={classes.PageNum}>
                      {`${(activeIndex + 1)
                        .toString()
                        .padStart(2, "0")}/${totalSegments
                        .toString()
                        .padStart(2, "0")}`}
                    </p>

                    <div className={classes.BtnWrap}>
                      <button
                        type={"button"}
                        className={classes.Btn}
                        onClick={handlePrev}
                        disabled={activeIndex === 0}
                      >
                        <img
                          src={ArrowIcon}
                          alt={"Arrow"}
                          loading={"lazy"}
                          draggable={"false"}
                        />
                      </button>

                      <button
                        type={"button"}
                        className={classes.Btn}
                        onClick={handleNext}
                        disabled={activeIndex === totalSegments - 1}
                      >
                        <img
                          src={ArrowIcon}
                          alt={"Arrow"}
                          loading={"lazy"}
                          draggable={"false"}
                        />
                      </button>
                    </div>
                  </div>

                  <div className={classes.Navigation}>
                    {categories &&
                      categories.map(({ id }, index) => (
                        <button
                          key={id}
                          type={"button"}
                          className={`${classes.NavItem} ${
                            index === activeIndex ? classes.Active : ""
                          }`}
                          onClick={() => handleSegmentClick(id)}
                        />
                      ))}
                  </div>

                  <div></div>
                </div>
              </div>

              <EventsList events={events || []} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
