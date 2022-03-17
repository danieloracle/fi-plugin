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

# Group info:
currency = 'USD'
group_index = 0

bai2_file.children.append(models.Group())
bai2_file.children[group_index].header.originator_id = 'ORABANK'
bai2_file.children[group_index].header.currency = currency
bai2_file.children[group_index].header.group_status = constants.GroupStatus.test_only
bai2_file.children[group_index].header.as_of_date = now
bai2_file.children[group_index].header.as_of_time = now
bai2_file.children[group_index].header.originator_id = '071000039'
bai2_file.children[group_index].header.ultimate_receiver_id = 'cas72068'

# Account 1:
currency = 'USD'
customer_account_number = '9999999999'
account_index = 0

transactions = [
    models.TransactionDetail(amount=4444, bank_reference='123345'),
    models.TransactionDetail(amount=55555, bank_reference='999902')
    ]
# Transaction
bai2_file.children[group_index].children.append(models.Account(children=transactions))
bai2_file.children[group_index].children[account_index].header.currency = currency
bai2_file.children[group_index].children[account_index].header.customer_account_number = customer_account_number
transaction_index = 0
bai2_file.children[group_index].children[account_index].children[transaction_index].type_code = constants.TypeCode(code='165', description='Preauthorized ACH Credit', level=constants.TypeCodeLevel.detail, transaction=constants.TypeCodeTransaction.credit)
transaction_index = 1
bai2_file.children[group_index].children[account_index].children[transaction_index].type_code = constants.TypeCode(code='165', description='Preauthorized ACH Credit', level=constants.TypeCodeLevel.detail, transaction=constants.TypeCodeTransaction.credit)


# ACOUNT 2
currency = 'USD'
customer_account_number = '000001'
account_index = 1

transactions = [
    models.TransactionDetail(amount=11111, bank_reference='11111'),
    models.TransactionDetail(amount=12222, bank_reference='12222')
    ]
bai2_file.children[group_index].children.append(models.Account(children=transactions))
bai2_file.children[group_index].children[account_index].header.currency = currency
bai2_file.children[group_index].children[account_index].header.customer_account_number = customer_account_number
transaction_index = 0
bai2_file.children[group_index].children[account_index].children[transaction_index].type_code = constants.TypeCode(code='165', description='Preauthorized ACH Credit', level=constants.TypeCodeLevel.detail, transaction=constants.TypeCodeTransaction.credit)
transaction_index = 1
bai2_file.children[group_index].children[account_index].children[transaction_index].type_code = constants.TypeCode(code='165', description='Preauthorized ACH Credit', level=constants.TypeCodeLevel.detail, transaction=constants.TypeCodeTransaction.credit)


# write to string
output = bai2.write(bai2_file)
print(output)


text_file = open("output.txt", "w")
n = text_file.write(output)
text_file.close()



"Convierto texto a inlinehtml"
ret = ''
for l in output.splitlines():
    ret = ret + '"' + l + '\\n"+' + '\n'
clip.copy(f"{ret}")