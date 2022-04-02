
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
                    <h3 class={styles.title} >Welcome Breeds Dog</h3>
                </div>
                <div>
                    <button class={styles.button} onClick={handle_home}>Start Button</button>
                </div> 
            </div>

        </div>
    )
}

