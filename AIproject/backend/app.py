from sanic import Sanic
from sanic.response import json
from typing import List
import tensorflow as tf


app = Sanic("my-hello-world-app")
classes = ['Iris setosa', 'Iris versicolor', 'Iris virginica']

# model = tf.keras.model.load_model.load('./saved_model')


@app.post("/")
async def predict (request):
    content = request.json
    data: List[float] = content.data
    inputs = tf.convert_to_tensor([data])
    predictions = model(inputs, training=False)
    idx = tf.argmax(predictions, axis=1).numpy()[0]
    return json({'result': classes[idx]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)