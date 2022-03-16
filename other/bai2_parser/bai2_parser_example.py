from locale import currency
import pyperclip as clip
from bai2 import bai2
from bai2 import models, constants
from datetime import datetime

filepath = '/Users/daniel/workspace/oracle/oracle-github/fiplugin/fi-plugin/other/bai2_parser/bai2.txt'
with open(filepath) as f:
    bai2_fileTXT = bai2.parse_from_file(f)

bai2_file = models.Bai2File()
bai2_file.header.sender_id = 'ORABANK'
bai2_file.header.receiver_id = 'NETSUITE'
bai2_file.header.file_id = 'fileid123'
now = datetime.now()
bai2_file.header.creation_date = now
bai2_file.header.creation_time = now
# ??? >
bai2_file.header.physical_record_length = 80
bai2_file.header.block_size = 1


bai2_file.children.append(models.Group())
bai2_file.children[0].header.originator_id = 'ORABANK'
bai2_file.children[0].header.currency = 'USD'
bai2_file.children[0].header.group_status = constants.GroupStatus.test_only
bai2_file.children[0].header.as_of_date = now
bai2_file.children[0].header.as_of_time = now
bai2_file.children[0].header.originator_id = '071000039'
bai2_file.children[0].header.ultimate_receiver_id = 'cas72068'


# Account info:
currency = 'USD'
customer_account_number = '9999999999'

# Transaction 0
transaction_index = 0
amount = 4444
bank_reference = '123345'
transactions = [models.TransactionDetail(amount=amount, bank_reference=bank_reference)]
bai2_file.children[0].children.append(models.Account(children=transactions))
bai2_file.children[0].children[transaction_index].header.currency = currency
bai2_file.children[0].children[transaction_index].header.customer_account_number = customer_account_number
bai2_file.children[0].children[transaction_index].children[0].type_code = constants.TypeCode(code='165', description='Preauthorized ACH Credit', level=constants.TypeCodeLevel.detail, transaction=constants.TypeCodeTransaction.credit)

# Transaction 1
transaction_index = 1
amount = 55555
bank_reference = '55555'
transactions = [models.TransactionDetail(amount=amount, bank_reference=bank_reference)]
bai2_file.children[0].children.append(models.Account(children=transactions))
bai2_file.children[0].children[transaction_index].header.currency = currency
bai2_file.children[0].children[transaction_index].header.customer_account_number = customer_account_number
bai2_file.children[0].children[transaction_index].children[0].type_code = constants.TypeCode(code='165', description='Preauthorized ACH Credit', level=constants.TypeCodeLevel.detail, transaction=constants.TypeCodeTransaction.credit)

# transactions2 = [models.TransactionDetail(amount=101, bank_reference='123345')]


# bai2_file.children[0].children.append(models.Account(children=transactions2))
# bai2_file.children[0].children[1].header.currency = currency
# bai2_file.children[0].children[1].header.customer_account_number = customer_account_number


# write to string
output = bai2.write(bai2_file)
print(output)

clip.copy(f"{output}")

text_file = open("output.txt", "w")
n = text_file.write(output)
text_file.close()