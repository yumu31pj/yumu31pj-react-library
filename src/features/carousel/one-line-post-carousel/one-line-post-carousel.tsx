import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ContentForIndexType } from '../../../types/microcms-types';
import { PostIndexType } from '../../../types/ui-props';
import { getFormatedDateString } from '../../../utils/getFormatedDateString';
import styles from "./one-line-post-carousel.module.scss";

type FlashPostCarousel = {
  postItems: PostIndexType[] | ContentForIndexType[];
  direction?: 'horizon' | 'vertical';
  src?: 'microcms';
}

const OneLinePostCarousel = (props: FlashPostCarousel) => {
  const { postItems, direction, src } = props;
  let modifierClass = direction == 'vertical' ? "--vertical" : "--horizon";

  let optionAxis: 'x' | 'y' | undefined = 'x';
  if (direction == 'horizon') {
    optionAxis = 'x';
  } else if (direction == 'vertical') {
    optionAxis = 'y';
  } else {
    optionAxis = 'x';
  }

  const [emblaRef] = useEmblaCarousel({ loop: true, axis: optionAxis }, [Autoplay()]);

  return (
    <div className={`embla ${styles["posts"]}`} ref={emblaRef}>
      <div className={`embla__container embla__container${modifierClass} ${styles['posts__container']} ${styles["posts__container" + modifierClass]}`}>
        {src === 'microcms' ? (
          // if src is microcms
          (postItems as ContentForIndexType[]).map((item: ContentForIndexType, key: number) => (
            <a className={`embla__slide ${styles['post']}`} key={key} href={item.id}>
              <span className={styles['post__date']}>{getFormatedDateString(item.publishedAt)}</span>
              <span className={styles['post__title']}>{item.title}</span>
            </a>
          ))
        ) : (
          // if src is not microcms
          (postItems as PostIndexType[]).map((item: PostIndexType, key: number) => (
            <a className={`embla__slide ${styles['post']}`} key={key} href={item.linkTo}>
              <span className={styles['post__date']}>{getFormatedDateString(item.date)}</span>
              <span className={styles['post__title']}>{item.title}</span>
            </a>
          ))
        )}
      </div>
    </div>
  );
}

export default OneLinePostCarousel;
