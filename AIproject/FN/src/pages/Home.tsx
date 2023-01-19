import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Header';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      
      <IonContent fullscreen>
        <Header />
      <div id = "bg"></div>
     
      
      
      </IonContent>
    </IonPage>
  );
};

export default Home;