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


            // // Example 1: CSV/json example
            // // ---------------------------
            // var downloadedData =
            //     "TYPE;DATE;NAME;MEMO;AMOUNT\n"+
            //     "CHECK;2017-04-13;Jessica L Sikes;;-1228.98\n" +
            //     "CHECK;2017-04-13;Tom A Taylor;;-555.97";
            //
            // var accountRequests = JSON.parse(context.accountRequestsJSON);
            // if (accountRequests != null) {
            //     accountRequests.forEach(function (accountRequest) {
            //         var accountId = accountRequest.accountMappingKey;
            //         var fromDateTime = accountRequest.dataStartTime;
            //         var toDateTime = accountRequest.dataEndTime;
            //         log.debug("accountRequests.forEach", accountId + " - " + fromDateTime + " - " + toDateTime);
            //         context.addDataChunk({dataChunk: downloadedData});
            //     });
            // }
            
            // Example 2: BAI2 file
            // --------------------
            var downloadedData =
            "01,ORABANK,NETSUITE,220316,0945,fileid123,80,1,2/\n"+
            "02,cas72068,071000039,4,220316,0945,USD,/\n"+
            "03,9999999999,USD/\n"+
            "16,165,4444,,123345,,\n"+
            "16,165,55555,,999902,,\n"+
            "49,59999,4/\n"+
            "03,000001,USD/\n"+
            "16,165,11111,,11111,,\n"+
            "16,165,12222,,12222,,\n"+
            "49,23333,4/\n"+
            "98,83332,2,10/\n"+
            "99,83332,1,12/\n";
            
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
