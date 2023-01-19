import matplotlib.pyplot as plt
import os
import numpy as np
import PIL
import tensorflow as tf

from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential

import pathlib


IMG_SIZE = 224  
data_dir = '../Rolex/data'
data_dir = pathlib.Path(data_dir)

def deltree(target, filename):
    for d in os.listdir(target):
        try:
            deltree(os.path.join(target, d), filename)
        except Exception as error:
            print(error)
    try:
        os.remove(os.path.join(target, filename))
    except:
        pass


deltree(data_dir, ".DS_Store")

def load_data_as_arr(mode: str, image_size: int):
    """load image and return as n-dimensional array format\n
    return images, labels

    Args:
        mode (str): train or test
        image_size (int): image size of the image,
                            e.g. 160 means 160 x 160
    """

    train_dataset_path = os.path.join(
        data_dir, mode)
    img_list = []
    label_list = []

    print(train_dataset_path)

    classes = [f.name for f in os.scandir(train_dataset_path) if f.is_dir()]

    print(classes)

    for idx, c in enumerate(classes):
        class_dir_path = os.path.join(train_dataset_path, c)

        print(class_dir_path)

        for filename in os.listdir(class_dir_path):
            filepath = os.path.join(class_dir_path, filename)
            print(f'[INFO] processing {filepath}')
            img = tf.keras.utils.load_img(
                filepath, target_size=(image_size, image_size))
            img = tf.keras.utils.img_to_array(img)
            img_list.append(img)
            label_list.append(idx)

    print(f'[INFO] processed all images')
    return np.array(img_list), np.array(label_list)


train_images, train_labels = load_data_as_arr('train', IMG_SIZE)
test_images, test_labels = load_data_as_arr('test', IMG_SIZE)

print(f'[INFO] {train_images.shape=}')
print(f'[INFO] {train_labels.shape=}')
print(f'[INFO] {test_images.shape=}')
print(f'[INFO] {test_labels.shape=}')

train_dataset = tf.data.Dataset.from_tensor_slices(
    (train_images, train_labels))
test_dataset = tf.data.Dataset.from_tensor_slices(
    (test_images, test_labels))


def format_example(image, label):
    image = tf.cast(image, tf.float32)
    image = (image/127.5) - 1
    return image, label

batch_size = 16
img_height = 180
img_width = 180

train_ds = tf.keras.utils.image_dataset_from_directory(
  data_dir,
  validation_split=0.2,
  subset="training",
  seed=123,
  image_size=(img_height, img_width),
  batch_size=batch_size)

val_ds = tf.keras.utils.image_dataset_from_directory(
  data_dir,
  validation_split=0.2,
  subset="validation",
  seed=123,
  image_size=(img_height, img_width),
  batch_size=batch_size)

class_names = train_ds.class_names
print(class_names)

import matplotlib.pyplot as plt

plt.figure(figsize=(10, 10))
for images, labels in train_ds.take(1):
  for i in range(9):
    ax = plt.subplot(3, 3, i + 1)
    plt.imshow(images[i].numpy().astype("uint8"))
    plt.title(class_names[labels[i]])
    plt.axis("off")

for image_batch, labels_batch in train_ds:
  print(image_batch.shape)
  print(labels_batch.shape)
  break

AUTOTUNE = tf.data.AUTOTUNE

train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

normalization_layer = layers.Rescaling(1./255)

normalized_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))
image_batch, labels_batch = next(iter(normalized_ds))
first_image = image_batch[0]
# Notice the pixel values are now in `[0,1]`.
print(np.min(first_image), np.max(first_image))

num_classes = len(class_names)

model = Sequential([
  layers.Rescaling(1./255, input_shape=(img_height, img_width, 3)),
  layers.Conv2D(16, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(32, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(64, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Flatten(),
  layers.Dense(128, activation='relu'),
  layers.Dense(num_classes)
])

model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

model.summary()

epochs=10
history = model.fit(
  train_ds,
  validation_data=val_ds,
  epochs=epochs
)

acc = history.history['accuracy']
val_acc = history.history['val_accuracy']

loss = history.history['loss']
val_loss = history.history['val_loss']

epochs_range = range(epochs)

plt.figure(figsize=(8, 8))
plt.subplot(1, 2, 1)
plt.plot(epochs_range, acc, label='Training Accuracy')
plt.plot(epochs_range, val_acc, label='Validation Accuracy')
plt.legend(loc='lower right')
plt.title('Training and Validation Accuracy')

plt.subplot(1, 2, 2)
plt.plot(epochs_range, loss, label='Training Loss')
plt.plot(epochs_range, val_loss, label='Validation Loss')
plt.legend(loc='upper right')
plt.title('Training and Validation Loss')
plt.show()


model.save('./model2', overwrite=True)
