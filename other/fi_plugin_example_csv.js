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
            // Example: CSV/json example
            // ---------------------------            
            var accountRequests = JSON.parse(context.accountRequestsJSON);
            if (accountRequests != null) {
                accountRequests.forEach(function (accountRequest) {
                    var accountId = accountRequest.accountMappingKey;
                    var fromDateTime = accountRequest.dataStartTime;
                    var toDateTime = accountRequest.dataEndTime;
                    log.debug("accountRequests.forEach", accountId + " - " + fromDateTime + " - " + toDateTime);

                    //Make http request to get info
                    var downloadedData =
                    "TYPE;DATE;NAME;MEMO;AMOUNT\n"+
                    "CHECK;2017-04-13;Jessica L Sikes;;-1228.98\n" +
                    "CHECK;2017-04-13;Tom A Taylor;;-555.97";
    
                    context.addDataChunk({dataChunk: downloadedData});
                });
            }            
            context.returnAccountRequestsJSON({accountsJson: context.accountRequestsJSON});
        }

        return {
            getConfigurationIFrameUrl: getConfigurationIFrameUrl,
            getAccounts: getAccounts,
            getTransactionData: getTransactionData
        }
    });
