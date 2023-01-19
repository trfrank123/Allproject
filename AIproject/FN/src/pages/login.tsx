import { IonButton, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Header';
import './Home.css';
interface state{username:string;password:string}

const Login: React.FC = () => {
  let history = useHistory()
  const formDivRef = useRef<HTMLInputElement>(null);
  const formDivRef1 = useRef<HTMLInputElement>(null);
  const[formobj,setformobj] = useState<state>({"username":'', "password":''});
  return (
    
    <IonPage>
      <IonContent>
      <Header />
      <IonItem lines="none">
            <div ref={formDivRef} style={{background:"rgba(57,66,77)", width:'calc(100% - 40px)', margin:"5px 5px",height:"80%",color:'rgba(176,180,183)',borderRadius:"10px 10px",padding:'0.1px 0.1px 0.1px 0.1px',justifyContent:"flex"}}>
            <IonImg
                style={{
                  width: "20px",
                  height: "20px",
                  transform: "translate(0px, 40px)",
                }}
                src="assets/watch.svg"
              />
              <IonLabel style={{ marginLeft: "30px" }} position="floating">
                username
              </IonLabel>
              <IonInput
                style={{ marginLeft: "30px" }}
                placeholder="username"
                className="username"
                onClick={()=>{
                  formDivRef.current!.classList.add('isFocus')
                }}
                onBlur={(e) => {
                  // call api for check username
                  formDivRef.current!.classList.remove('isFocus');
                  setformobj(
                    Object.assign(formobj, { username: e.currentTarget.value })
                  );
                  console.log(formobj)
                }}
              ></IonInput>
            </div>
          </IonItem>
          <IonItem lines="none">
            <div ref={formDivRef1} style={{background:"rgba(57,66,77)", width:'calc(100% - 40px)', margin:"5px 5px",height:"80%",color:'rgba(176,180,183)',borderRadius:"10px 10px",padding:'0.1px 0.1px 0.1px 0.1px',justifyContent:"flex"}}>
            <IonImg
                style={{
                  width: "20px",
                  height: "20px",
                  transform: "translate(0px, 40px)",
                }}
                src="assets/watch.svg"
              />
              <IonLabel style={{ marginLeft: "30px" }} position="floating">
                password
              </IonLabel>
              <IonInput
                style={{ marginLeft: "30px" }}
                placeholder="password"
                className="password"
                onClick={()=>{
                  formDivRef1.current!.classList.add('isFocus')
                }}
                onBlur={(e) => {
                  // call api for check username
                  formDivRef1.current!.classList.remove('isFocus');
                  setformobj(
                    Object.assign(formobj, { password: e.currentTarget.value })
                  );
                  console.log(formobj)
                }}
              ></IonInput>
            </div>
          </IonItem>
          <IonButton onClick={async() => {
              console.log(formobj);
              
              let res = await fetch("http://localhost:3000/Login",{
                  headers:{
                    'Content-Type': 'application/json'
                  },
                  method:'POST',
                  body:JSON.stringify(formobj)
              })
              let res_json = await res.json()
              console.log(res_json)
            }}>Login</IonButton>
   </IonContent>
    </IonPage>
  );
};

export default Login;
