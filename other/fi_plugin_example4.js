/**
 * @NApiVersion 2.x
 * @NScriptType fiConnectivityPlugin
 * @NModuleScope SameAccount
 */
define(['N/https', 'N/search'],
    function (https, search)
    {
        function getConfigurationIFrameUrl(context)
        {
            log.debug("getConfigurationIFrameUrl", "Loading iFrame");
            // Hardcoded url for testing, should use url.resolveScript: https://netsuite.custhelp.com/app/answers/detail/a_id/44705
            context.configurationIFrameUrl = "https://tstdrv2043981.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=651&deploy=1&compid=TSTDRV2043981&h=bb36c81f418fabe491ac";
        }

        function getAccounts(context)
        {
            log.debug("getAccounts", "Getting customers accounts from Bank");
            context.addAccount({
                accountMappingKey: "CHECKING 0002153851",
                displayName: "Checking (XXXX11)",
                accountType: "BANK",
                currency: "USD",
                groupName: "Example Bank",
                lastUpdated: "2020-06-30T01:23:45"
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