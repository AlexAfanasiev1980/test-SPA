import React, { useState, useEffect } from "react";
import styles from "./cards.module.scss";
import { useSelector } from "react-redux";
import { TDog } from "../../services/redusers/redusers";
import Delete from "../../pages/delete.svg";

const Card = (props) => {
  const {
    id,
    img,
    like,
    name,
  }: { id: string; img: string; like: boolean; name: string } = props.card;

  return (
    <li className={styles.card}>
      <img src={Delete} alt='icon delete' className={styles.delete} onClick={(e) => props.onDelete(e, id)}/>
      <img src={img} alt='dog' className={styles.img} />
      <div className={styles.wrapper}>
        <h2 className={styles.header}>{name}</h2>
        <div
          className={`${styles.like} ${like ? styles.like_active : ""}`}
          onClick={(e) => props.onClick(e, id)}
        >
          <svg
            fill='#000000'
            height='20px'
            width='20px'
            version='1.1'
            id='Capa_1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            viewBox='0 0 486.926 486.926'
            xmlSpace='preserve'
          >
            <g>
              <path
                d='M462.8,181.564c-12.3-10.5-27.7-16.2-43.3-16.2h-15.8h-56.9h-32.4v-75.9c0-31.9-9.3-54.9-27.7-68.4
		c-29.1-21.4-69.2-9.2-70.9-8.6c-5,1.6-8.4,6.2-8.4,11.4v84.9c0,27.7-13.2,51.2-39.3,69.9c-19.5,14-39.4,20.1-41.5,20.8l-2.9,0.7
		c-4.3-7.3-12.2-12.2-21.3-12.2H24.7c-13.6,0-24.7,11.1-24.7,24.7v228.4c0,13.6,11.1,24.7,24.7,24.7h77.9c7.6,0,14.5-3.5,19-8.9
		c12.5,13.3,30.2,21.6,49.4,21.6h65.9h6.8h135.1c45.9,0,75.2-24,80.4-66l26.9-166.9C489.8,221.564,480.9,196.964,462.8,181.564z
		 M103.2,441.064c0,0.4-0.3,0.7-0.7,0.7H24.7c-0.4,0-0.7-0.3-0.7-0.7v-228.4c0-0.4,0.3-0.7,0.7-0.7h77.9c0.4,0,0.7,0.3,0.7,0.7
		v228.4H103.2z M462.2,241.764l-26.8,167.2c0,0.1,0,0.3-0.1,0.5c-3.7,29.9-22.7,45.1-56.6,45.1H243.6h-6.8h-65.9
		c-21.3,0-39.8-15.9-43.1-36.9c-0.1-0.7-0.3-1.4-0.5-2.1v-191.6l5.2-1.2c0.2,0,0.3-0.1,0.5-0.1c1-0.3,24.7-7,48.6-24
		c32.7-23.2,49.9-54.3,49.9-89.9v-75.3c10.4-1.7,28.2-2.6,41.1,7c11.8,8.7,17.8,25.2,17.8,49v87.8c0,6.6,5.4,12,12,12h44.4h56.9
		h15.8c9.9,0,19.8,3.7,27.7,10.5C459,209.864,464.8,225.964,462.2,241.764z'
              />
            </g>
          </svg>
        </div>
      </div>
    </li>
  );
};

function Cards(props) {
  const [dogArr, setDogArr] = useState<TDog[]>([]);
  const { filter } = props;
  const dogs: TDog[] = useSelector((state: TDog[]) => {
    return state;
  });

  const handleLike = (e, id: string): void => {
    e.preventDefault();
    const payload = dogArr.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          like: !el.like,
        };
      }
      return el;
    });
    setDogArr(payload);
  };

  const handleDelete = (e, id: string): void => {
    e.preventDefault();
    console.log(id)
    const payload = dogArr.filter((el) => el.id !== id);
    setDogArr(payload);
  };

  useEffect(() => {
    const arr = dogs.filter((el, index) => index < 12);
    setDogArr(arr);
  }, [dogs]);

  return (
    <section className={styles.cards}>
      <ul className={styles.list}>
        {dogArr &&
          dogArr.map((el, index) => {
            if (!filter) {
              return (
                <Card
                  card={el}
                  onClick={handleLike}
                  onDelete={handleDelete}
                  key={index}
                />
              );
            } else if (filter && el.like === true) {
              return (
                <Card
                  card={el}
                  onClick={handleLike}
                  onDelete={handleDelete}
                  key={index}
                />
              );
            }
            return null;
          })}
      </ul>
    </section>
  );
}

export default Cards;
