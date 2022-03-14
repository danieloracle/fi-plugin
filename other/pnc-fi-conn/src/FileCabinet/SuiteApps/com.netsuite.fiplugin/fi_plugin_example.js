/**
 * @NApiVersion 2.x
 * @NScriptType fiConnectivityPlugin
 * @NModuleScope SameAccount
 * Reference: https://system.netsuite.com/app/help/helpcenter.nl?fid=section_157851408518.html&whence=
 */
define(['N/https', 'N/search', 'N/url'],
    function (https, search, url)
    {
        function getConfigurationIFrameUrl(context)
        {
            var output = url.resolveScript({
                scriptId: 'customscript_fi_iframe_sl_example',
                deploymentId: 'customdeploy_fi_iframe_sl_example',
                returnExternalUrl: true
            });
            context.configurationIFrameUrl = output;
        }

        function getAccounts(context) {}

        function getTransactionData(context) {}

        return {
            getConfigurationIFrameUrl: getConfigurationIFrameUrl,
            getAccounts: getAccounts,
            getTransactionData: getTransactionData
        }
    });