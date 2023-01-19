import { IonHeader, IonItem, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';
import './ExploreContainer.css';
import './Header.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  let myFun = async (e:any) => {
  }
  
    let history = useHistory()
  return (
    
  <>
  <IonHeader>
   <IonToolbar>
    <IonItem> 
      
          <button className="btn" onClick={()=>{
            history.push('/home')
          }}>home</button>
  
          <button className="btn" onClick={()=>{
            history.push('/Show')
          }}>Show</button>
 
        
          <button className="btn1" onClick={() => {
              history.push('/signup')
            }}>Signup</button>
    


          <button className="btn2" onClick={()=>{
              history.push('/Login')
            }}>Login</button>
        
            </IonItem>
        </IonToolbar>
        </IonHeader>
    </>
  );
};

export default ExploreContainer;