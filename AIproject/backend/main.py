
from sanic import Sanic
from sanic.response import json
from typing import List
import tensorflow as tf
from fastapi import FastAPI, File, UploadFile, Request

app = FastAPI()

import tensorflow as tf
import numpy as np



model = tf.saved_model.load('./model')
# model = tf.saved_model.load('https://drive.google.com/drive/folders/1bRbNDPc1OA0ovc1_V7cAXVodSxFsR_yU?usp=sharing')
image_size = 300

# model = tf.saved_model.load('./model')
# image_size = 100

from PIL import Image
import io
from typing import List

@app.post("/file/")
async def create_file(file: bytes = File()):
    
    img = Image.open(io.BytesIO(file))
    img = img.convert('RGB')
    img = img.resize((image_size, image_size), Image.NEAREST)
    img = tf.keras.utils.img_to_array(img)

    img_list = []
    
    img_list.append(img)
    
    img_list2 = tf.convert_to_tensor(img_list) # convert image list to Tensor
    
    predictions = model(img_list2, training=False)
    
    print(predictions)
    
    # return {"predictions": [ float(p) for p in predictions ]}

    return {"files": files, "predictions": predictions.numpy().tolist() };


@app.post("/files/")
async def create_file(files: List[bytes] = File()):

    img_list = []
            
    for file in files:
        img = Image.open(io.BytesIO(file))
        img = img.convert('RGB')
        img = img.resize((image_size, image_size), Image.NEAREST)
        img = tf.keras.utils.img_to_array(img)
        
        img_list.append(img)
    
    img_list2 = tf.convert_to_tensor(img_list) # convert image list to Tensor
    
    predictions = model(img_list2, training=False)
    
    print(predictions)
    
    # return {"predictions": [ float(p) for p in predictions ]}

    return {"files": files, "predictions": predictions.numpy().tolist() };



@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    return {"filename": file.filename}

@app.post("/predict/")
async def predict(request: Request):
    
    j = await request.json()

    files = j["file"]

    img_list = []
    
    for file in files:

        img = tf.keras.utils.load_img(file, target_size=(image_size, image_size))
        img = tf.keras.utils.img_to_array(img)
        
        # img = img / 127.5 - 1   # [0,255] -> (/127.5) -> [0,2] -> (-1) -> [-1,1]
        
        img_list.append(img)
        
    img_list2 = tf.convert_to_tensor(img_list) # convert image list to Tensor
    
    predictions = model(img_list2, training=False)
    
    print(predictions)
    
    return {"files": files, "predictions": predictions.numpy().tolist() } 

@app.post("/try")
async def predict (request):
    content = request.json
    data: List[float] = content.data
    inputs = tf.convert_to_tensor([data])
    predictions = model(inputs, training=False)
    idx = tf.argmax(predictions, axis=1).numpy()[0]
    return json({'result': classes[idx]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
