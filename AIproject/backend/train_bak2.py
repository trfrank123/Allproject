import matplotlib.pyplot as plt
import os
import numpy as np
import tensorflow as tf
import pathlib

IMG_SIZE = 200
data_dir = 'Rolexphotos/data/'
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


BATCH_SIZE = 32
SHUFFLE_BUFFER_SIZE = 1000

train_dataset = train_dataset.map(format_example).shuffle(SHUFFLE_BUFFER_SIZE)
test = test_dataset.map(format_example)

train_size = int(0.9 * len(train_dataset))

train = train_dataset.take(train_size)
validation = train_dataset.skip(train_size)

print(f'[INFO] train dataset length: {len(train)}')
print(f'[INFO] valid dataset length: {len(validation)}')

train_batches = train.batch(BATCH_SIZE)
validation_batches = validation.batch(BATCH_SIZE)
test_batches = test.batch(BATCH_SIZE)


# %%
# Create the base model from the pre-trained model MobileNet V2 using our IMG_SHAPE as the input_shape

IMG_SHAPE = (IMG_SIZE, IMG_SIZE, 3)
base_model = tf.keras.applications.MobileNetV2(input_shape=IMG_SHAPE,
                                               include_top=False,
                                               weights='imagenet')

base_model.trainable = False

# %%
# Pass our image_batch to the model, the feature_batch is what we get.
image_batch, label_batch = next(iter(train_batches.take(1)))
feature_batch = base_model(image_batch)
print(feature_batch.shape)

# %%
# Add a global_average_layer to pool the output from `MobileNet` to transfer the knowledge for our problem.
global_average_layer = tf.keras.layers.GlobalAveragePooling2D()
feature_batch_average = global_average_layer(feature_batch)
print(feature_batch_average.shape)

# %%
# Add prediction layer for the actual prediction.
prediction_layer = tf.keras.layers.Dense(1)
prediction_batch = prediction_layer(feature_batch_average)
print(prediction_batch.shape)

# Combine the base_model and the two newly added layers together.

x = base_model.output
x = global_average_layer(x)
x = prediction_layer(x)

model = tf.keras.Model(inputs=base_model.input, outputs=x)

model.summary()

# %%
# Setup learning rate, optimizer and loss function
base_learning_rate = 0.0001
model.compile(optimizer=tf.keras.optimizers.RMSprop(lr=base_learning_rate),
              loss=tf.keras.losses.BinaryCrossentropy(from_logits=True),
              metrics=['accuracy'])

# Show the architecture of the combine model.
model.summary()

# %%
# Try to use validation_batches to avoid overfitting.
# please try `initial_epochs = 10` or `initial_epochs = 20` after `initial_epochs = 2` is okay
initial_epochs = 2
validation_steps = 20

loss0, accuracy0 = model.evaluate(validation_batches, steps=validation_steps)
print("initial loss: {:.2f}".format(loss0))
print("initial accuracy: {:.2f}".format(accuracy0))

history = model.fit(train_batches,
                    epochs=initial_epochs,
                    validation_data=validation_batches)

# %%
# Plot the accuracy and loss over time.
acc = history.history['accuracy']
val_acc = history.history['val_accuracy']

loss = history.history['loss']
val_loss = history.history['val_loss']


plt.figure(figsize=(8, 8))
plt.subplot(2, 1, 1)
plt.plot(acc, label='Training Accuracy')
plt.plot(val_acc, label='Validation Accuracy')
plt.legend(loc='lower right')
plt.ylabel('Accuracy')
plt.ylim([min(plt.ylim()), 1])
plt.title('Training and Validation Accuracy')

plt.subplot(2, 1, 2)
plt.plot(loss, label='Training Loss')
plt.plot(val_loss, label='Validation Loss')
plt.legend(loc='upper right')
plt.ylabel('Cross Entropy')
plt.ylim([0, 1.0])
plt.title('Training and Validation Loss')
plt.xlabel('epoch')
plt.show()

# %%
# Save the model which can be loaded later.
model.save('./model', overwrite=True)
