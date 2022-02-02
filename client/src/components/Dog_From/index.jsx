import React from "react";
import { useState, useEffect } from "react";
import { Link, /*useHistory*/ } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../actions";
import Styles from "./index.module.css";




export default function Dog_Form() {

  const urls=[


    "https://www.bunko.pet/__export/1631293212984/sites/debate/img/2021/09/10/bichon_frise_crop1631293088001.jpeg_976912859.jpeg",
    "https://sumedico.blob.core.windows.net/images/2020/06/09/perrostiernosrazas.jpg",
    "https://heraldodemexico.com.mx/u/fotografias/m/2020/12/9/f608x342-292237_321960_0.jpg",


  ]


  const dispatch = useDispatch();
  // const history = useHistory(); //para redirigir a alguna ruta
  const allTemps = useSelector((state) => state.temps); //traigo los temps
  var inputTemp1;

  const [errors, setErrors] = useState({}); //est local para errores

  const [objForm, setObjForm] = useState({ //est local de 1 dog(es lo q se va a enviar)
    name: "",
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
    image: ""
  });

  useEffect(() => {
    //para llenar el estado temperaments disparando la action
    dispatch(getTemperaments());
  }, [dispatch ]);


  function handleInputChange(e) {//cdo se cambia algun campo ()
    e.preventDefault();

    setObjForm({
       ...objForm,
       [e.target.name]: e.target.value,
    });

    setErrors(  // ejecuta la fc validate sobre los value
      validate({
        ...objForm,
        [e.target.name]: e.target.value,
      })
    );
  }


  function handleSelect(e) { // cada vez q  se agrega un temp
    e.preventDefault();

    setObjForm({
      ...objForm,
      temperaments: [...objForm.temperaments, e.target.value],
    });
  }

  function handleDelete(el) { // para borrar un temp ya agregado
    setObjForm({
      ...objForm,
      temperaments: objForm.temperaments.filter((t) => t !== el),
    });
  }

  function clearForm() { // limpia el Form y los errores, cdo se quiere crear otra raza
    setObjForm({
      name: "",
      height: "",
      weight: "",
      life_span: "",
      temperaments: [],
      image: ""
    });

    setErrors({});
  }

  function handleSubmit(e) { // cdo se envia el form con CREAR
    e.preventDefault();
    dispatch(postDog(objForm));//se despacha la acción
    alert("Raza creada con éxito!!");

    //history.push('/home');// me redirige al Home
  }


  return (
    <div className={Styles.divgral}>


      <fieldset className={Styles.fieldset}>
          <legend className={Styles.legendField}>Elija una imágen</legend>
          <ul>
            {urls.map(u =>{
              return (

              <li>
                <label  for="img1">
                <img className={Styles.radio} src={u} alt="??" />
                </label>
                <input className={Styles.radioButon} type="radio"  name="image"
                  value={u}
                  onChange={(e) => handleInputChange(e)} />
              </li>
              );

            })}
        </ul>
      </fieldset>

      <form className={Styles.form} onSubmit={(e) => handleSubmit(e)}>

        <h1 className={Styles.titulo}>nueva raza</h1>

        <div>
          <label className={Styles.label}>Nombre Raza:</label>
          <input
            className={Styles.input}
            type="text"
            value={objForm.name}
            name="name"
            placeholder="Nombre de la raza..."
            pattern="[a-zA-Z áéíóú]{2,20}"
            title="Solo letras, hasta 20 caracteres ej: Abc..."
            required
            onChange={(e) => handleInputChange(e)}
          />
        </div>

        <div>
          <label className={Styles.label}>Peso:</label>
          <input
            className={Styles.input}
            type="text"
            value={objForm.weight}
            name="weight"
            placeholder="00-90...(Kgs :Minimo-Máximo)"
            pattern="[0-9]{1,2}[-][0-9]{1,2}"
            title="solo numeros, formato permitido: ej: 0-90 "
            required
            onChange={(e) => handleInputChange(e)}
          />
          {errors.weight && (
            <span className={Styles.error}> {errors.weight} </span>
          )}
        </div>

        <div>
          <label className={Styles.label}>Altura:</label>
          <input
            className={Styles.input}
            type="text"
            value={objForm.height}
            name="height"
            placeholder="00-90 (Cms: Altura min-Altura max)"
            pattern="[0-9]{1,2}[-][0-9]{1,2}"
            title="solo numeros, formato permitido: ej: 0-90 "
            required
            onChange={(e) => handleInputChange(e)}
          />
          {errors.height && (
            <span className={Styles.error}> {errors.height} </span>
          )}
        </div>

        <div>
          <label className={Styles.label}>Años de Vida promedio:</label>{" "}
          <input
            className={Styles.input}
            type="text"
            value={objForm.life_span}
            name="life_span"
            placeholder="10 Años...(promedio de vida)"
            pattern="[0-9]{1,2}"
            title="Solo números, de 1 a 2 digitos ej: 15 (Años promedio de vida)"
            onChange={(e) => handleInputChange(e)}
          />
          {errors.life_span && (
            <span className={Styles.error}> {errors.life_span} </span>
          )}
        </div>

        <div>
          <label className={`${Styles.label}, ${Styles.newTemp}`}>Crear Temp/s :</label>
          <span className={Styles.coment}>(dobleClick/agrega)</span>

          <input
            className={Styles.input}
            type="text"
            value={inputTemp1}
            name="temp1"
            //required
            placeholder="Temperamento..."
            pattern="[a-zA-Z]{2,15}"
            title="Valores permitidos ej: Abc...(hasta 10 caracteres)"
            onDoubleClick={(e) => handleSelect(e)}
          />

          <select
            className={Styles.select}
            name="temps"
            onChange={(e) => handleSelect(e)}
          >
            <option key={100} value="">Agregar Temp. Existentes</option>
            {allTemps.map((t) => (
              <option className={Styles.option} key={t.id} value={t.nameTemp}>
                {t.nameTemp}
              </option>
            ))}
          </select>

          <div className={Styles.temps}>
            {objForm.temperaments.map((el) => (
              <div className={Styles.te}>
                <span className={Styles.letraTemp}>{el}</span>
                <button
                  type="button"
                  className={Styles.tDelete}
                  key={el.id}
                  onClick={() => handleDelete(el)}
                >X</button>
              </div>
            ))}
          </div>
        </div>

        <div className={Styles.containerSubmit}>
          <input
            className={Styles.submit}
            type="reset"
            value="Crear otra raza"
            onClick={clearForm}
          ></input>
          <Link to="/home">
            <button className={Styles.submit}>Volver</button>{" "}
          </Link>
          <input
            className={Styles.submit}
            type="submit"
            name="crear"
            value="CREAR"
          />
        </div>

      </form>
    </div>
  );
}

//validaciones para input wieight, height y life_span
function validate(objForm) {
  var errores = {};
  var arrW = objForm.weight.split("-");
  var arrH = objForm.height.split("-");
  var mjeWeigth = "El peso minimo debe ser menor que el máximo!!";
  var mjeHeight = "La altura mínima debe ser menor que la máxima!!";

  if (arrW[0] && arrW[1]) {
    if (arrW[0].length > arrW[1].length) {
      errores.weight = mjeWeigth;
    } else if (arrW[0].length === arrW[1].length) {
      if (arrW[0] > arrW[1]) {
        errores.weight = mjeWeigth;
      }
    }
  }
  if (arrH[0] && arrH[1]) {
    if (arrH[0].length > arrH[1].length) {
      errores.height = mjeHeight;
    } else if (arrH[0].length === arrH[1].length) {
      if (arrH[0] > arrH[1]) {
        errores.height = mjeHeight;
      }
    }
  }

  if (objForm.life_span > 25) {
    errores.life_span = "Un perro no vive tanto!!(hasta 25 años)";
  }

  return errores;
}
