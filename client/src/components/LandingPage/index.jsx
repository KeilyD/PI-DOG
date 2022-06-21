
import { useHistory } from 'react-router-dom'; 
import React from "react";

import styles from "./index.module.css";
import dog from "../../images/dog.jpg";



export default function LandingPage() {

    const history = useHistory(); 

     function handle_home(e) {
        e.preventDefault();
        history.push("/Home");
    } 
    return (
        <div class={styles.container} >
            <img class={styles.img}type="image" src={dog} alt=""/>
            <div>
                 <div>
                    <h3 class={styles.title}>Bienvenidos a La APP de Razas de Perros</h3>
                </div>
                <div>
                    <button class={styles.button} onClick={handle_home}>Inicio</button>
                </div> 
            </div>

        </div>
    )
}

