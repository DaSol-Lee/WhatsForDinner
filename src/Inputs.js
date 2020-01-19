import React, { useState } from 'react';
import './Inputs.css'

const Inputs = () => {
  //[nutrients] = useState("");
  const [foodName, setFoodName] = useState("");
  const [nutrients, setNutrients] = useState([]);
  const [imageR, setImageR] = useState("");
  const [Word1, setWord1] = useState("");
  const [Word2, setWord2] = useState("");
  const [Word3, setWord3] = useState("");
  const [Word4, setWord4] = useState("");
  const [Word5, setWord5] = useState("");
  const [Word6, setWord6] = useState("");
  const [Word7, setWord7] = useState("");
  const [Word8, setWord8] = useState("");
  const [Word9, setWord9] = useState("");
  const [Word10, setWord10] = useState("");

  const [var1, setvar1] = useState("");
  const [var2, setvar2] = useState("");
  const [var3, setvar3] = useState("");
  const [var4, setvar4] = useState("");
  const [var5, setvar5] = useState("");
  const [var6, setvar6] = useState("");
  const [var7, setvar7] = useState("");
  const [var8, setvar8] = useState("");
  const [var9, setvar9] = useState("");
  const [var10, setvar10] = useState("");

  //var recipes = "";
  var url = "http://127.0.0.1:5000/?image=";
  function countProperties(obj) {
    var count = 0;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        ++count;
    }
    return count;
  }
  function getFile(filePath) {
    return filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[0];
  }

  function getOutput(files) {
    const filename = files[0].name;
    console.log(nutrients);
    fetch(url + filename)
      .then(res => {
        return res.json();
      })
      .then((myJson) => {
        console.log(myJson);



        setFoodName(myJson['Name']);
          
        if (countProperties(myJson['Nutrition']) > 0) {
            setNutrients([
              'Carbs: ', myJson['Nutrition']['Carbs'], <br />,
              'Energy: ', myJson['Nutrition']['Energy'], <br />,
              'Fat: ', myJson['Nutrition']['Fat'], <br />,
              'Protein: ', myJson['Nutrition']['Protein']]);
            setImageR(myJson['Recipes']['0'][2]);
            setWord1(myJson['Recipes']['0'][0]);
            setWord2(myJson['Recipes']['1'][0]);
            setWord3(myJson['Recipes']['2'][0]);
            setWord4(myJson['Recipes']['3'][0]);
            setWord5(myJson['Recipes']['4'][0]);
            setWord6(myJson['Recipes']['5'][0]);
            setWord7(myJson['Recipes']['6'][0]);
            setWord8(myJson['Recipes']['7'][0]);
            setWord9(myJson['Recipes']['8'][0]);
            setWord10(myJson['Recipes']['9'][0]);

            setvar1(myJson['Recipes']['0'][1]);
            setvar2(myJson['Recipes']['1'][1]);
            setvar3(myJson['Recipes']['2'][1]);
            setvar4(myJson['Recipes']['3'][1]);
            setvar5(myJson['Recipes']['4'][1]);
            setvar6(myJson['Recipes']['5'][1]);
            setvar7(myJson['Recipes']['6'][1]);
            setvar8(myJson['Recipes']['7'][1]);
            setvar9(myJson['Recipes']['8'][1]);
            setvar10(myJson['Recipes']['9'][1]);

 
          }
        
        
      });

    return files[0].name;
  }

  return (
    <div>
      <input className="input"
        id='inputfile'
        type='file'
        name='inputfile'
        onChange={(e) => getOutput(e.target.files)}

      />
          <div class="row">
        <div class="column1" >
          <div class="heading3">Your Fabulous Food 🍽️</div>
          <div class="foodText">{foodName}</div>
          <div class="foodInfo">{nutrients}</div>
          <div>{imageR ? <img class="foodImage" src={imageR} /> : null}</div>

        </div>
        <div class="column2" >
          <div class="heading2"> Spoontacular Recipes! 🥄</div>
          <div class="buttonText">1.  <a href={var1}>{Word1}</a><br/>
          2.  <a href={var2}>{Word2}</a><br/>
          3.  <a href={var3}>{Word3}</a><br/>
          4.  <a href={var4}>{Word4}</a><br/>
          5.  <a href={var5}>{Word5}</a><br/>
          6.  <a href={var6}>{Word6}</a><br/>
          7.  <a href={var7}>{Word7}</a><br/>
          8.  <a href={var8}>{Word8}</a><br/>
          9.  <a href={var9}>{Word9}</a><br/>
          10.  <a href={var10}>{Word10}</a></div>

        </div>
      </div>
      {/* <form className="form" enctype="multipart/form-data" method="POST">
            </form> */}
      <h5 className="tag">Made with ❤️ by 👩‍💻👩‍💻👩‍💻👩‍💻 at Rose Hacks 🌹 </h5>

      {/* <input className = "input"
          id='inputfile'
          type='file'
          name='inputfile'
          onChange={(e) => getOutput(e.target.files)}
          // onChange={(e) => getOutput(e.target.files)}
          
        /> */}

    </div>

  );
}

export default Inputs;