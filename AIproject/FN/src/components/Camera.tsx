import React, { useState, useRef } from "react";
import {Camera} from "react-camera-pro";



const CameraContainer: React.FC = () => {
    
    const camera = useRef(null);
    const [image, setImage] = useState<any>(null);
    // const handleChangeFile = async ({ currentTarget }: any) => {
    

    //     let file = currentTarget.files[0]
    //     console.log(file)
    //     let formData = new FormData();
  
    //     formData.append("Ai_images", file);
        
    //     let res = await fetch('http://localhost:3000/rolex/Ai_images', {
    //       method: "POST",
    //       // Or
    //       // body: JSON.stringify({message:e.currentTarget.value})
    //       body: formData
    //     });
    //     let res_json = await res.json();
    //     console.log(res_json);
    //     setMess(res_json)
  
      
    // };
    let base64ToFile = async () => {
        fetch(image)
        .then(res => res.blob())
        .then(async blob => {
        const file = new File([blob], "File name",{ type: "image/png" })
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
        
        })

        

    }
    let handleChangeFormat = async () => {
        let dom:any = camera.current
        let photo = await dom.takePhoto()
        setImage(photo)
        await base64ToFile()
        
        
        
        
        
    }

  return (
    <div>
    <Camera ref={camera} errorMessages={{
              noCameraAccessible: undefined,
              permissionDenied: undefined,
              switchCamera: undefined,
              canvas: undefined
          }} />
    <button id="takePhoto" onClick={handleChangeFormat}>
        Take photo
    </button>
    <img src={image} alt='Taken photo'/>
    </div>
  );
};

export default CameraContainer;
