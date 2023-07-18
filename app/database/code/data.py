import json
import cv2

# CRAWLFILE = '../final_database.json'
CRAWLFILE = '../../../knnsummary.json'
# DATAPATH = '../cropped_database/'
DATAPATH = '../../../subset/'
data = []
with open(CRAWLFILE, 'r') as f:
    temp = json.loads(f.read())
    for s in range(len(temp)):
        name = temp[s]['name']
        cate = temp[s]['category']
        _id = temp[s]['_id']['$oid']
        price_org = temp[s]['price_org']
        price_sale = temp[s]['price_sale']
        imagelink = temp[s]['imageLink']
        no = temp[s]['no']
        record = {
            'Name': name,
            '_id': _id,
            'Original_Price': price_org,
            'Sale_Price': price_sale,
            'Category': cate,
            'ImageLink': imagelink
        }
        data.append(record)
        category = record['Category']
        num = str(no).zfill(6)
        PATH = f'{DATAPATH}{category}/{num}_0.json'
        with open(PATH, 'w') as f:
            json.dump(record, f)
    print('Done')
    