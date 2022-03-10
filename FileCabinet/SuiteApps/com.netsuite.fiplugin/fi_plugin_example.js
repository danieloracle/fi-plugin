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
                accountMappingKey: "CHECKING 000000001",
                displayName: "Checking (XXXX01)",
                accountType: "BANK",
                currency: "USD",
                groupName: "Oracle Bank",
                lastUpdated: "2022-03-08T01:23:45"
            });
            context.addAccount({
                accountMappingKey: "CHECKING 222222222",
                displayName: "Checking (XXXX22)",
                accountType: "BANK",
                currency: "USD",
                groupName: "Oracle Bank",
                lastUpdated: "2022-03-08T01:23:45"
            });

        }

        function getTransactionData(context)
        {
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
            // ------------
            var downloadedData =
            "01,BANKOFAMERICA,cas72068,181108,1330,1,80,1,2\n"+
            "02,cas72068,071000039,1,190109,2359,,2\n"+
            "03,9999999999,USD\n"+
            "16,165,25000,Z,965710090000149,004646894728\n"+
            "88,ME CTRL DIS 004646894728 CR\n"+
            "49,25000,4\n"+
            "98,25000,1,6\n"+
            "99,25000,1,8";
            context.addDataChunk({dataChunk: downloadedData});
            context.returnAccountRequestsJSON({accountsJson: context.accountRequestsJSON});
        }

        return {
            getConfigurationIFrameUrl: getConfigurationIFrameUrl,
            getAccounts: getAccounts,
            getTransactionData: getTransactionData
        }
    });