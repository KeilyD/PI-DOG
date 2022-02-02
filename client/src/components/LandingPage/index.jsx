/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import ingreso from "../../images/ingreso.png";



export default function LandingPage() {
  return (
<div className = {styles.body}>

        <div>
          <span className={styles.title}>Razas de Perros</span>
        </div>
        <div>
          <span className={styles.bienvenidos}>Bienvenidos</span>
        </div>
        <div>

        </div>
        <form>

          <Link to="/home">
         {  <input className={styles.botonIm} type="image" src={ingreso}></input>}
          </Link>
        </form>
      </div>

  );
}
