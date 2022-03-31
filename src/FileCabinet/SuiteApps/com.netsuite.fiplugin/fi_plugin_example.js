/**
 * @NApiVersion 2.x
 * @NScriptType fiConnectivityPlugin
 * @NModuleScope SameAccount
 */
define(['N/https', 'N/search', 'N/url'],
    function (https, search, url)
    {
        function getConfigurationIFrameUrl(context)
        {
            // // Show format profile configurationId
            // var configurationId = context.pluginConfiguration.getConfigurationFieldValue({fieldName: "configuration_id"});
            // log.debug("getConfigurationFieldValue", "configurationId: " + configurationId);
            //
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
