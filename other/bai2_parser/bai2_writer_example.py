import pyperclip as clip
from bai2 import bai2
from bai2 import models
from datetime import datetime

bai2_file = models.Bai2File()
bai2_file.header.sender_id = 'ORABANK'
bai2_file.header.receiver_id = 'NETSUITE'
bai2_file.header.file_id = 'fileid123'
now = datetime.now()
bai2_file.header.creation_date = now
bai2_file.header.creation_time = now


bai2_file.children.append(models.Group())
bai2_file.children[0].header.originator_id = 'ORABANK'

transactions = [models.TransactionDetail(amount=100)]
bai2_file.children[0].children.append(models.Account(children=transactions))

# write to string
output = bai2.write(bai2_file)

clip.copy(f"{output}")