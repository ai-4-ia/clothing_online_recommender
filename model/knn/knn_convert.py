import tensorflow as tf
import json
import pandas as pd
from keras.preprocessing import image
import numpy as np
from sklearn.neighbors import NearestNeighbors
import pickle
from keras.models import Model
from tensorflow.keras.utils import load_img, img_to_array
import tensorflow_addons as tfa
# from keras.applications.mobilenet_v3 import MobileNetV3Large, preprocess_input
from keras.applications.resnet import ResNet50, preprocess_input
# from keras.applications.vgg16 import VGG16, preprocess_input
# from keras.applications.inception_v3 import InceptionV3, preprocess_input

lr = 9.276511e-06
wd = lr * 1e-2
TRAINNO = 312184
VALIDNO = 52489
TRAINFOLDER = 'E:/Project/train/image/'
VALIDFOLDER = 'E:/Project/validation/image/'
TRAINJSONPATH = 'finalsum.json'
VALIDJSONPATH = 'finalvalidsum.json'
TRAINSAVEFOLDER = 'traindata/'
TESTSAVEFOLDER = 'testdata/'
FAST_RUN = False
IMAGE_WIDTH = 224
IMAGE_HEIGHT = 224
IMAGE_SIZE = (IMAGE_WIDTH, IMAGE_HEIGHT)
IMAGE_CHANNELS = 3

#Run the similarity calculation algorithm (K-NN)
 
def get_embedding(model, imagename):
    img = load_img(imagename, target_size=(IMAGE_WIDTH, IMAGE_HEIGHT))
    x   = img_to_array(img)
    x   = np.expand_dims(x, axis=0)
    x   = preprocess_input(x)
    return model.predict(x).reshape(-1)

with open('notedarrayresnetfinaldataset.json', 'r') as f:
    temp = json.loads(f.read())
    error = []
    for i in temp:
        if i == 'item':
            continue
        else:
            imagelink = []
            categories = []
            notedarray = []
            for s in range(len(temp[i])):
                try:
                    imagelink.append(str(temp[i][s]['imagelink']))
                    categories.append(str(temp[i][s]['category']))
                    fixarray = str(temp[i][s]['notedarray']).replace('[', '')
                    fixarray = fixarray.replace(']', '')
                    notedarray.append(fixarray.split(','))
                    print(s)
                    df = pd.DataFrame({
                        'imagelink': imagelink,
                        'category': categories,
                        'notedarray': notedarray
                    })
                except:
                    error.append(s)
    print(df)
    print(error)

restored_model = tf.keras.models.load_model('Model/cnn.h5')
secondmodel = Model(inputs = restored_model.input,
                                 outputs= restored_model.layers[3].output)
print(secondmodel.summary())
clothes_categories = ['shirt', 'outwear', 'short', 'skirt', 'dress', 'trouser']

for i in range(len(clothes_categories)):
    select = df.loc[df['category'] == clothes_categories[i - 1]]
    map_embeddings = select['notedarray']
    print(map_embeddings)
    df_embs = map_embeddings.apply(pd.Series)
    print(df_embs.shape)
    neighbors = NearestNeighbors(n_neighbors = 4, algorithm='brute', metric='cosine')
    neighbors.fit(df_embs)
    select = select.iloc[0:0]
    #print(select)
    knnPickle = open('clothes_categories[i - 1] + '/finalresnet.pkl', 'wb')
    pickle.dump(neighbors, knnPickle)