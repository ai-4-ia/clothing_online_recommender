import tensorflow as tf
from keras.preprocessing.image import ImageDataGenerator
from keras.models import Model
# from keras.applications.mobilenet_v3 import MobileNetV3Large, preprocess_input
from keras.applications.resnet import ResNet50, preprocess_input
# from keras.applications.vgg16 import VGG16, preprocess_input
# from keras.applications.inception_v3 import InceptionV3, preprocess_input
import json
import pandas as pd
import numpy as np
from keras.preprocessing import image
from tensorflow.keras.utils import load_img, img_to_array
import tensorflow_addons as tfa

lr = 0.001
wd = lr * 1e-2
TRAINNO = 312184
VALIDNO = 52489
TRAINFOLDER = 'train/image/'
VALIDFOLDER = 'validation/image/'
TRAINJSONPATH = 'sum.json'
VALIDJSONPATH = 'validsum.json'
TRAINSAVEFOLDER = 'traindata/'
VALIDSAVEFOLDER = 'validdata/'
FAST_RUN = False
IMAGE_WIDTH = 224
IMAGE_HEIGHT = 224
IMAGE_SIZE = (IMAGE_WIDTH, IMAGE_HEIGHT)
IMAGE_CHANNELS = 3

#With the already trained model, run and get the 2048-number array from the crawl images.

dataset = {
    "item": {},
    "info": []
}
fail =[]

def get_embedding(model, imagename):
    img = load_img(imagename, target_size=(IMAGE_WIDTH, IMAGE_HEIGHT))
    x   = img_to_array(img)
    x   = np.expand_dims(x, axis=0)
    x   = preprocess_input(x)
    return model.predict(x).reshape(-1)

restored_model = tf.keras.models.load_model('Model/BesModel5.h5')
opt = tfa.optimizers.AdamW(learning_rate = lr, weight_decay = wd)
restored_model.compile(loss = 'categorical_crossentropy', optimizer = opt , metrics=[tf.keras.metrics.CategoricalAccuracy()])
secondmodel = Model(inputs = restored_model.input,
                                 outputs= restored_model.layers[3].output)
print(secondmodel.summary())
secondmodel.compile(loss = 'categorical_crossentropy', optimizer = opt , metrics=[tf.keras.metrics.CategoricalAccuracy()])

with open('file.json', 'r') as f:
    temp = json.loads(f.read())
    for i in range(len(temp)):
        try:
            category = str(temp[i]['category'])
            name = str(temp[i]['name'])
            url = str(temp[i]['url'])
            price_org= str(temp[i]['price_org'])
            price_sale= str(temp[i]['price_sale'])
            imagelink = str(temp[i]['imageLink'])
            img = 'full_database/' + category + '/' + str(i).zfill(6) + '.jpg'
            print(imagelink)
            notedarray = get_embedding(secondmodel, img).tolist()
            dataset['info'].append({
                    'no': i,
                    'category': category,
                    'name': name,
                    'url': url,
                    'imagelink': img,
                    'notedarray': notedarray
                    })
            print(i)
        except:
            fail.append(i)

#print(dataset)
with open('notedarrayresnetfinaldataset.json', 'w') as f:
    json.dump(dataset, f)
print(fail)
print('done')

    
