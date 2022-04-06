/**
 * @NApiVersion 2.x
 * @NScriptType fiConnectivityPlugin
 * @NModuleScope SameAccount
 */
define(['N/https', 'N/url'],
    function (https, url)
    {
        function getConfigurationIFrameUrl(context)
        {
            // Using fi_iframe_example.js as the iFrame configuration
            var output = url.resolveScript({
                scriptId: 'customscript_fi_iframe_example',
                deploymentId: 'customdeploy_fi_iframe',
                returnExternalUrl: true
            });
            log.debug("getConfigurationIFrameUrl", "Loading iFrame: " + output);
            context.configurationIFrameUrl = output;
        }

        function getAccounts(context)
        {
            log.debug("getAccounts", "Getting customers accounts from Bank");
            context.addAccount({
                accountMappingKey: "9999999999",
                displayName: "9999999999",
                accountType: "BANK",
                currency: "USD",
                groupName: "Oracle Bank",
                lastUpdated: "2022-03-08T01:23:45"
            });
            context.addAccount({
                accountMappingKey: "000001",
                displayName: "000001",
                accountType: "BANK",
                currency: "USD",
                groupName: "Oracle Bank",
                lastUpdated: "2022-03-08T01:23:45"
            });
        }

        function getTransactionData(context)
        {
            //Show accounts to request transaction
            var accountRequests = JSON.parse(context.accountRequestsJSON);
            if (accountRequests != null) {
                accountRequests.forEach(function (accountRequest) {
                    var accountId = accountRequest.accountMappingKey;
                    var fromDateTime = accountRequest.dataStartTime;
                    var toDateTime = accountRequest.dataEndTime;
                    log.debug("accountId", accountId);
                    log.debug("fromDateTime", fromDateTime);
                    log.debug("toDateTime", toDateTime);
                });
            }

            //Perform http request with context.accountRequestsJSON as the data payload or the requred format

            // Example: json example
            // ---------------------------            

            var data = {
                "accounts": [
                    {
                        "accountId": "9999999999",
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
            
            var downloadedData = JSON.stringify(data);
            log.debug("downloadedData", downloadedData);
            context.addDataChunk({dataChunk: downloadedData});
            context.returnAccountRequestsJSON({accountsJson: context.accountRequestsJSON});
            
        }

        return {
            getConfigurationIFrameUrl: getConfigurationIFrameUrl,
            getAccounts: getAccounts,
            getTransactionData: getTransactionData
        }
    });
