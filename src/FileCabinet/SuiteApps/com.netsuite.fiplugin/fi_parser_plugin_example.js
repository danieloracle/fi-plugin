/**
 * @NApiVersion 2.0
 * @NScriptType fiparserplugin
 */
define(['N/url'],
    function(url) {

        function parseData(context) {
            /*
                Sample data:

                {
                    "accounts": [
                        {
                            "accountId": "ACCOUNT1",
                            "employeeId": "EMPLOYEE1",
                            "cardHolder": "Card Holder",
                            "dataAsOfDate": "2020-07-01",
                            "openingBalance": 0.0,
                            "closingBalance": 100.0,
                            "currentBalance": 100.0,
                            "dueBalance": 100.0,
                            "transactions": [
                                {
                                    "date": "2020-07-01",
                                    "amount": 100.0,
                                    "transactionTypeCode": "CHARGE",
                                    "uniqueId": "TRN001",
                                    "id": "CHK001",
                                    "payee": "A Customer",
                                    "currency": "US",
                                    "memo": "Customer Credit",
                                    "transactionStatus": "Posted",
                                    "customerReferenceId": "CUST01",
                                    "invoiceReferenceIds": ["101", "102"],
                                    "billedTaxAmount": 10.0,
                                    "localChargeAmount": 100.0,
                                    "currencyExchangeRate": 1.0,
                                    "expenseCode": "CC"
                                }
                            ]
                        }
                    ]
                }
             */

			var data = JSON.parse(context.inputData.getContents());

            for (var accountIndex = 0; accountIndex < data.accounts.length; accountIndex++) {
                var account = data.accounts[accountIndex];

                var accountData = context.createAccountData({
                    accountId: account.accountId,
                    employeeId:  account.employeeId,
                    cardHolder: account.cardHolder,
                    dataAsOfDate: account.dataAsOfDate,
                    openingBalance: account.openingBalance,
                    closingBalance: account.closingBalance,
                    currentBalance: account.currentBalance,
                    dueBalance: account.dueBalance
                });

                for (var transactionIndex = 0; transactionIndex < account.transactions.length; transactionIndex++) {
                    var transaction = account.transactions[transactionIndex];
                    accountData.createNewTransaction({
                        date: transaction.date,
                        amount: transaction.amount,
                        transactionTypeCode: transaction.transactionTypeCode,
                        uniqueId: transaction.uniqueId,
                        id: transaction.id,
                        payee: transaction.payee,
                        currency: transaction.currency,
                        memo: transaction.memo,
                        transactionStatus: transaction.transactionStatus,
                        customerReferenceId: transaction.customerReferenceId,
                        invoiceReferenceIds: transaction.invoiceReferenceIds,
                        billedTaxAmount: transaction.billedTaxAmount,
                        localChargeAmount: transaction.localChargeAmount,
                        currencyExchangeRate: transaction.currencyExchangeRate,
                        expenseCode: transaction.expenseCode
                    });
                }
            }

        }

        function getStandardTransactionCodes(context) {
            var tranTypes = {
                'ACH': 'ACH',
                'CHECK': 'CHECK',
                'CREDIT': 'CREDIT',
                'DEBIT': 'DEBIT',
                'DEPOSIT': 'DEPOSIT',
                'FEE': 'FEE',
                'INTEREST': 'INTEREST',
                'CHARGE': 'PAYMENT',
                'TRANSFER': 'TRANSFER',
                'OTHER':'OTHER'
            };
            for (var key in tranTypes) {
                var standardTransactionCode = context.output.createNewStandardTransactionCode();
                standardTransactionCode.tranCode = key;
                standardTransactionCode.tranType = tranTypes[key];
                context.output.addStandardTransactionCode({"standardTransactionCode":standardTransactionCode});              
              }
        }

        function getExpenseCodes(context) {
            context.createNewExpenseCode({
            	code: '4',
            	description: 'RESTAURANT'
			});
            context.createNewExpenseCode({
                code: 'CC',
                description: 'Customer Credit'
            });
        }

        function getConfigurationPageUrl(context) {
            log.debug('hia getConfigurationPageUrl', 'getConfigurationPageUrl');
 
            var output = url.resolveScript({
                scriptId: 'customscript_fi_parser_iframe_example',
                deploymentId: 'customdeploy_fi_parser_iframe_example',
                returnExternalUrl: true
            });

            log.debug('hia2 getConfigurationPageUrl', output);
            context.configurationPageUrl = output;



        }


        return {
            parseData: parseData,
            getStandardTransactionCodes: getStandardTransactionCodes,
            getExpenseCodes: getExpenseCodes,
            getConfigurationPageUrl: getConfigurationPageUrl
        }
    
    });