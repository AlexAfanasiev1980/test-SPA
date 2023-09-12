import React, { useState, useEffect } from "react";
import styles from './app.module.scss';
import { useDispatch } from "react-redux";
import { getData } from "../../services/api";

import Cards from "../cards/cards";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getData()
      .then((data) => {
        const payload = data.message.map((el: string, index: string) => {
          return {
            id: index,
            img: el,
            like: false,
            name: "Собака",
          };
        });
        dispatch({type: 'ADD_DOGS', payload})
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.app}>
      <ApplicationView />
    </div>
  );
}

function ApplicationView() {
const [filter, setFilter] = useState<boolean>(false);


  return (
    <>
      <header className={styles.header}>
        <button className={styles.button} onClick={() => setFilter(!filter)}>Фильтр</button>
      </header>
      <main id='main' className={styles.main}>
        <Cards filter={filter}/>
      </main>
    </>
  );
}

export default App;
