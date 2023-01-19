# import express from "express"

# const app = express()

# app.use(express.json())

# app.post ("/api", async (req, res) =>{
#     let question = req.body;
#     console.log(question);
#     let response = await fetch('http://localhost:5000/', {method:'POST', body:JSON.stringify()});
#     let answer = await response.json();
#     res.json(answer);
# })

import tensorflow as tf
impor

model = "model/"

@app.post("/api")
def callModel(request):

    content = request.json
    print(content)
    predict_dataset = tf.convert_to_tensor(content)

    # Predict
    prediction = model.predict (predict_dataset)

    # Sort by possibility with Desc sort
    prediction_Argsort = np.argsort(prediction[0])[::-1]

    result_label = class_names [ prediction_Argsort[0]]
    result_poss = prediction[0] [ prediction_Argsort[0]]*1000

    print (result_label, result_poss)

    return json({"data": {"name": result_label, "probability": 94.24139261245728}})
