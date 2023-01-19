import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { log } from "console";
import React from "react";
import { useRef, useState } from "react";
import CameraContainer from "../components/Camera";
import ExploreContainer from "../components/ExploreContainer";
import Header from "../components/Header";
import "./show.css";

const Show: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpenCamera, setIsOpenCamera] = useState<any>(false);
  const [mess, setMess] = useState(null);
  
  function formDataToJson(formData: FormData) {
    const obj: any = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });

    return JSON.stringify(obj);
  }

  const handleChangeFile = async ({ currentTarget }: any) => {
    

      let file = currentTarget.files[0]
      console.log(file)
  
      let formData = new FormData();

      formData.append("Ai_images", file);
      
      let res = await fetch('http://localhost:3000/rolex/Ai_images', {
        method: "POST",
        // Or
        // body: JSON.stringify({message:e.currentTarget.value})
        body: formData
      });
      let res_json = await res.json();
      console.log(res_json);
      setMess(res_json)

    
  };
  return (
    <IonPage>
      <IonContent>
      
        <Header />
        <IonButton onClick={() => inputRef.current?.click()}>Upload</IonButton>
        <input
          style={{ display: "none" }}
          ref={inputRef}
          onChange={handleChangeFile}
          type="file"
          id="photo"
          name="photo"
        ></input>


        {!isOpenCamera ? <IonButton onClick={() => setIsOpenCamera(true)}>Open camera</IonButton> : 
        <section>
        <CameraContainer />
        </section>}
        <div style={{width:'100%',fontSize:'30px',textAlign:'center',color:'#FFF'}}>{mess}</div>
        
      </IonContent>
    </IonPage>
  );
};

export default Show;
