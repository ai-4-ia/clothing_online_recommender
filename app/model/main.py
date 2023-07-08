# Run by streamlit run main.py
import streamlit as st
import gdown
import configparser
import os

CONFIG = '../../model/cnn/static/model_download_link.cfg'
output = '../../model/cnn/static/cnn_model.h5'
JSONFILE = '../dataset_build/Crawl_Data/summary.json'

def streamlit_setup():
    PAGE_CONFIG = {"page_title":"Coduo", 
                #    "page_icon":image, 
                "layout":"centered", 
                "initial_sidebar_state":"auto"}  
    return PAGE_CONFIG
  
def read_config(file):
    config = configparser.ConfigParser()
    config.readfp(open(file ,'r'))
    model_path = config.get('model', 'CNN')
    model_path = model_path[1:-1]
    return f'https://drive.google.com/uc?id={model_path}'

def model_download(link, output):
    gdown.download(link, output, quiet=False)
        
def main():
    model_link = read_config(CONFIG)
    isExist = os.path.exists(output)
    if (isExist == False):
        model_download(model_link, output)
    PAGE_CONFIG = streamlit_setup()
    st.set_page_config(**PAGE_CONFIG)

if __name__ == "__main__":
    main()
    
# import numpy as np
# import torch
# import cv2
# import os
# import pickle
# import numpy as np
# import json
# from keras.preprocessing import image
# import tensorflow as tf
# from keras.models import Model
# import streamlit as st
# from tensorflow.keras.utils import load_img, img_to_array
# import tensorflow_addons as tfa
# # from keras.applications.mobilenet_v3 import MobileNetV3Large, preprocess_input
# from keras.applications.resnet import ResNet50, preprocess_input
# # from keras.applications.vgg16 import VGG16, preprocess_input
# # from keras.applications.inception_v3 import InceptionV3, preprocess_input
# from PIL import Image
# import datetime

# TRAINNO = 312184
# VALIDNO = 52489
# TRAINFOLDER = 'E:/Project/train/image/'
# VALIDFOLDER = 'E:/Project/validation/image/'
# TRAINJSONPATH = 'finalsum.json'
# VALIDJSONPATH = 'finalvalidsum.json'
# TRAINSAVEFOLDER = 'traindata/'
# TESTSAVEFOLDER = 'testdata/'
# FAST_RUN = False
# IMAGE_WIDTH = 224
# IMAGE_HEIGHT = 224
# IMAGE_SIZE = (IMAGE_WIDTH, IMAGE_HEIGHT)
# IMAGE_CHANNELS = 3

# #Run by streamlit run main.py
# record =[]
# # image_directory = "C:\\Users\Documents\logo.PNG"
# # image = Image.open(image_directory)

# PAGE_CONFIG = {"page_title":"Coduo", 
#             #    "page_icon":image, 
#                "layout":"centered", 
#                "initial_sidebar_state":"auto"}

# st.set_page_config(**PAGE_CONFIG)

# def get_embedding(model, imagename):
#     img = load_img(imagename, target_size=(IMAGE_WIDTH, IMAGE_HEIGHT))
#     x   = img_to_array(img)
#     x   = np.expand_dims(x, axis=0)
#     x   = preprocess_input(x)
#     return model.predict(x).reshape(-1)

# def save_file(uploaded_file):
#     try:
#         with open('upload_image/' + uploaded_file.name, 'wb') as f:
#             f.write(uploaded_file.getbuffer())
#             return 1
#     except:
#         return 0

# def readfile(PATH):
#     with open(PATH, 'r') as f:
#         temp = json.loads(f.read())
#         name = temp['Name']
#         cate = temp['Category']
#         _id = temp['_id']
#         price = temp['Price']
#         record = {
#             'Name': name,
#             '_id': _id,
#             'Price': price,
#             'Category': cate
#         }
#     return record

# restored_model = tf.keras.models.load_model('Model/BesModel5.h5')
# secondmodel = Model(inputs = restored_model.input,
#                                  outputs= restored_model.layers[3].output)
# print(secondmodel.summary())
# yolomodel = torch.hub.load('yolov5', 'custom', path = 'yolov5/runs/train/exp2/weights/best.pt', source='local')
# # yolomodel.iou = 0.45  # NMS IoU threshold
# # yolomodel.conf = 0.8

# uploaded_file = st.file_uploader("Choose your image")
# if uploaded_file is not None:
#     dt_started = datetime.datetime.utcnow()
#     if save_file(uploaded_file):
#         # display image
#         uploadimage = Image.open('upload_image/' + uploaded_file.name)
#         # cv2.imread(uploaded_file.name)[..., ::-1]
#         st.image(uploaded_file)
#         #imagearray = get_embedding(secondmodel, uploaded_file.name)
#         filename = uploaded_file.name[0:6]
#         #image = cv2.imread('validation/image/005879.jpg')
#         detections = yolomodel(uploadimage, size=224)
#         results = detections.pandas().xyxy[0].to_dict(orient = 'records')
#         x = np.array(results)
#         choicearray = ()
#         if len(x) == 0:
#             st.write('Not found')
#         else:
#             dt_ended = datetime.datetime.utcnow()
#             print('Time for YOLO: ' + str((dt_ended - dt_started).total_seconds()))
#             st.write('Found ' + str(len(x)) + ' results in your picture')
#             cols = st.columns(len(x))
#             for i in range (len(x)):
#                 name = results[i]['name']
#                 clas = results[i]['class']
#                 xmin = int(results[i]['xmin'])
#                 ymin = int(results[i]['ymin'])
#                 xmax = int(results[i]['xmax'])
#                 ymax = int(results[i]['ymax'])
#                 #cv2.rectangle(image, (xmin, ymin), (xmax, ymax), (255, 0 ,0), 2)
#                 #cv2.putText(image, name, (xmin, ymin), cv2.FONT_HERSHEY_SIMPLEX, 1, (60, 255, 255), 1 )
#                 crop_image = uploadimage.crop((xmin, ymin, xmax, ymax))
#                 # crop_image = uploadimage[ymin:ymax, xmin:xmax]
#                 # cv2.imwrite('detect/' + filename + '_' + str(i) + '.jpg', crop_image)
#                 crop_image.save('detect/' + filename + '_' + str(i) + '.jpg')
#             for i, col in enumerate(cols):
#                 col.image('detect/' + filename + '_' + str(i) + '.jpg')
#                 col.write(str(i + 1))
#                 choicearray += (i + 1,)
#             option = st.selectbox('Choose with clothes you want to find?', choicearray)
#             st.write('You selected:', option)
#             #df['Power']=df['Power'].apply(lambda row: float(row))
#             dt_started_new = datetime.datetime.utcnow()
#             loaded_model = pickle.load(open('crawldata/' + results[option - 1]['name'] + '/finalresnet1.pkl', 'rb'))
#             imagearray = get_embedding(secondmodel, 'detect/' + filename + '_' + str(option - 1) + '.jpg')
#             thislist = sorted(filter(lambda x: os.path.isfile(os.path.join('crawldata/'+ results[option - 1]['name'] + '/', x)), os.listdir('crawldata/'+ results[option - 1]['name'] + '/')))
#             distance, indices = loaded_model.kneighbors([imagearray])
#             print(indices)
#             print(distance)
#             for j in range(4):
#                 print('crawldata/' + results[option - 1]['name'] + '/' + str(thislist[indices[0][j]*2]))
#             col1, col2, col3, col4 = st.columns(4)
#             with col1:
#                 st.image('crawldata/' + results[option - 1]['name'] + '/' + thislist[indices[0][0]*2])
#                 PATH = 'crawldata/'+ results[option - 1]['name'] + '/' + thislist[indices[0][0]*2 + 1]
#                 record = readfile(PATH)
#                 print('1')
#                 print(PATH)
#                 st.write(record['Name'])
#                 st.write(record['Price'])
#                 link = record['_id']
#                 link = '[Click here](http://localhost:3000/product/' + link +  ')'
#                 print(link)
#                 st.markdown(link, unsafe_allow_html=True)
#             with col2:
#                 st.image('crawldata/' + results[option - 1]['name'] + '/' + thislist[indices[0][1]*2])
#                 PATH = 'crawldata/'+ results[option - 1]['name'] + '/' + thislist[indices[0][1]*2 + 1]
#                 record = readfile(PATH)
#                 print('2')
#                 print(PATH)
#                 st.write(record['Name'])
#                 st.write(record['Price'])
#                 link = record['_id']
#                 link = '[Click here](http://localhost:3000/product/' + link +  ')'
#                 st.markdown(link, unsafe_allow_html=True)
#             with col3:
#                 st.image('crawldata/' + results[option - 1]['name'] + '/' + thislist[indices[0][2]*2])
#                 PATH = 'crawldata/'+ results[option - 1]['name'] + '/' + thislist[indices[0][2]*2 + 1]
#                 record = readfile(PATH)
#                 print('3')
#                 print(PATH)
#                 st.write(record['Name'])
#                 st.write(record['Price'])
#                 link = record['_id']
#                 link = '[Click here](http://localhost:3000/product/' + link +  ')'
#                 st.markdown(link, unsafe_allow_html=True)
#             with col4:
#                 st.image('crawldata/' + results[option - 1]['name'] + '/' + thislist[indices[0][3]*2])
#                 PATH = 'crawldata/'+ results[option - 1]['name'] + '/' + thislist[indices[0][3]*2 + 1]
#                 record = readfile(PATH)
#                 print('4')
#                 print(PATH)
#                 st.write(record['Name'])
#                 st.write(record['Price'])
#                 link = record['_id']
#                 link = '[Click here](http://localhost:3000/product/' + link +  ')'
#                 st.markdown(link, unsafe_allow_html=True)
#             dt_ended_new = datetime.datetime.utcnow()
#             print('Time for CNN: ' + str((dt_ended_new - dt_started_new).total_seconds()))

