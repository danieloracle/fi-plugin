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
                accountMappingKey: "CHECKING 0002153852",
                displayName: "Checking (XXXX12)",
                accountType: "BANK",
                currency: "USD",
                groupName: "Oracle Bank",
                lastUpdated: "2022-03-08T01:23:45"
            });
        }

        function getTransactionData(context)
        {
            var downloadedData =
                "TYPE;DATE;NAME;MEMO;AMOUNT\n"+
                "CHECK;2017-04-13;Jessica L Sikes;;-1228.98\n" +
                "CHECK;2017-04-13;Tom A Taylor;;-555.97";

            context.addDataChunk({dataChunk: downloadedData});
            context.returnAccountRequestsJSON({accountsJson: context.accountRequestsJSON});
        }

        return {
            getConfigurationIFrameUrl: getConfigurationIFrameUrl,
            getAccounts: getAccounts,
            getTransactionData: getTransactionData
        }
    });