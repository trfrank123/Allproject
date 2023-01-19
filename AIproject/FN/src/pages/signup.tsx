import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useRef, useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import Header from "../components/Header";
import "./signup.css";

interface state {
  username: string;
  password: string;
  email: string;
  nickname: string;
  confirm_password: string;
  photo: File[];
}
const Signup: React.FC = () => {
  const formDivRef = useRef<HTMLInputElement>(null);
  const formDivRef4 = useRef<HTMLInputElement>(null);
  const formDivRef1 = useRef<HTMLInputElement>(null);
  const formDivRef2 = useRef<HTMLInputElement>(null);
  const formDivRef3 = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChangeFile = ({ currentTarget }: any) => {
    console.log(currentTarget.files);
    setformobj(Object.assign(formobj, { photo: currentTarget.files }));
  };
  const [formobj, setformobj] = useState<state>({
    username: "",
    password: "",
    email: "",
    nickname: "",
    confirm_password: "",
    photo: [],
  });
  return (
    <IonPage>
      <IonContent>
        <Header />
        <form style={{ position: "relative" }}>
          <IonImg
            style={{
              width: "20px",
              height: "20px",
              transform: "translate(0px,40px)",
            }}
            src="assets/usericon.png"
          />
          <IonItem lines="none">
            <div
              ref={formDivRef}
              style={{
                background: "rgba(57,66,77)",
                width: "calc(100% - 40px)",
                margin: "5px 5px",
                height: "80%",
                color: "rgba(176,180,183)",
                borderRadius: "10px 10px",
                padding: "0.1px 0.1px 0.1px 0.1px",
                justifyContent: "flex",
              }}
            >
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
                onClick={() => {
                  formDivRef.current!.classList.add("isFocus");
                }}
                onBlur={(e) => {
                  // call api for check username
                  formDivRef.current!.classList.remove("isFocus");
                  setformobj(
                    Object.assign(formobj, { username: e.currentTarget.value })
                  );
                }}
              ></IonInput>
            </div>
          </IonItem>

          <IonItem lines="none">
            <div
              ref={formDivRef1}
              style={{
                background: "rgba(57,66,77)",
                width: "calc(100% - 40px)",
                margin: "5px 5px",
                height: "80%",
                color: "rgba(176,180,183)",
                borderRadius: "10px 10px",
                padding: "0.1px 0.1px 0.1px 0.1px",
              }}
            >
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
                class="password"
                onClick={() => {
                  formDivRef1.current!.classList.add("isFocus");
                }}
                onBlur={(e) => {
                  formDivRef1.current!.classList.remove("isFocus");
                  setformobj(
                    Object.assign(formobj, { password: e.currentTarget.value })
                  );
                }}
              ></IonInput>
            </div>
          </IonItem>

          <IonItem lines="none">
            <div
              ref={formDivRef4}
              style={{
                background: "rgba(57,66,77)",
                width: "calc(100% - 40px)",
                margin: "5px 5px",
                height: "80%",
                color: "rgba(176,180,183)",
                borderRadius: "10px 10px",
                padding: "0.1px 0.1px 0.1px 0.1px",
              }}
            >
              <IonImg
                style={{
                  width: "20px",
                  height: "20px",
                  transform: "translate(0px, 40px)",
                }}
                src="assets/watch.svg"
              />
              <IonLabel style={{ marginLeft: "30px" }} position="floating">
                confirm password
              </IonLabel>
              <IonInput
                style={{ marginLeft: "30px" }}
                placeholder="confirm password"
                class="password"
                onClick={() => {
                  formDivRef4.current!.classList.add("isFocus");
                }}
                onBlur={(e) => {
                  formDivRef4.current!.classList.remove("isFocus");
                  setformobj(
                    Object.assign(formobj, {
                      confirm_password: e.currentTarget.value,
                    })
                  );
                }}
              ></IonInput>
            </div>
          </IonItem>

          <IonItem lines="none">
            <div
              ref={formDivRef2}
              style={{
                background: "rgba(57,66,77)",
                width: "calc(100% - 40px)",
                margin: "5px 5px",
                height: "80%",
                color: "rgba(176,180,183)",
                borderRadius: "10px 10px",
                padding: "0.1px 0.1px 0.1px 0.1px",
              }}
            >
              <IonImg
                style={{
                  width: "20px",
                  height: "20px",
                  transform: "translate(0px, 40px)",
                }}
                src="assets/watch.svg"
              />{" "}
              <IonLabel style={{ marginLeft: "30px" }} position="floating">
                email
              </IonLabel>
              <IonInput
                style={{ marginLeft: "30px" }}
                placeholder="email"
                class="email"
                onClick={() => {
                  formDivRef2.current!.classList.add("isFocus");
                }}
                onBlur={(e) => {
                  formDivRef2.current!.classList.remove("isFocus");
                  setformobj(
                    Object.assign(formobj, { email: e.currentTarget.value })
                  );
                }}
              ></IonInput>
            </div>
          </IonItem>

          <IonItem lines="none">
            <div
              ref={formDivRef3}
              style={{
                background: "rgba(57,66,77)",
                width: "calc(100% - 40px)",
                margin: "5px 5px",
                height: "80%",
                color: "rgba(176,180,183)",
                borderRadius: "10px 10px",
                padding: "0.1px 0.1px 0.1px 0.1px",
              }}
            >
              <IonImg
                style={{
                  width: "20px",
                  height: "20px",
                  transform: "translate(0px, 40px)",
                }}
                src="assets/watch.svg"
              />{" "}
              <IonLabel style={{ marginLeft: "30px" }} position="floating">
                nickname
              </IonLabel>
              <IonInput
                style={{ marginLeft: "30px" }}
                placeholder="nickname"
                class="nickname"
                onClick={() => {
                  formDivRef3.current!.classList.add("isFocus");
                }}
                onBlur={(e) => {
                  formDivRef3.current!.classList.remove("isFocus");
                  setformobj(
                    Object.assign(formobj, { nickname: e.currentTarget.value })
                  );
                }}
              ></IonInput>
            </div>
          </IonItem>
          <IonButton onClick={() => inputRef.current?.click()}>
            Upload
          </IonButton>
          <input
            style={{ display: "none" }}
            ref={inputRef}
            onChange={handleChangeFile}
            type="file"
            id="photo"
            name="photo"
          ></input>
          <IonButton
            onClick={async() => {
              console.log(formobj);
              let formdate = new FormData();
              formdate.append('username', formobj.username)
              formdate.append('password', formobj.password)
              formdate.append('email', formobj.email)
              formdate.append('nickname', formobj.nickname)
              formdate.append('confirm_password', formobj.confirm_password)
              if(formobj.photo.length > 0){
                formdate.append('photo', formobj.photo[0])
              }
              
              
              let res = await fetch("http://localhost:3000/signup",{

                  method:'POST',
                  
                  body:formdate
              })
              let res_json = await res.json()
              console.log(res_json)
            }}
            
            
          >
            Submit
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
