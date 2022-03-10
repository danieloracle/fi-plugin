/**
 * @NApiVersion 2.x
 * @NScriptType fiParserPlugin
 * Reference: https://system.netsuite.com/app/help/helpcenter.nl?fid=section_159078138928.html
 */
 define(['N/query', 'N/url'],
 function (query, url)
 {
     function getConfigurationPageUrl(context)
     {
         var configurationId = context.pluginConfiguration.getConfigurationFieldValue({fieldName: "configuration_id"});
         var output = url.resolveScript({
            scriptId: 'customscript_fi_iframe_sl_example',
            deploymentId: 'customdeploy_fi_iframe_sl_example',
            returnExternalUrl: true
        });
        context.configurationPageUrl = output;
     }

     function parseData(context){}

     function getStandardTransactionCodes(context) {}

     function getExpenseCodes(context) {}

     return {
         getConfigurationPageUrl: getConfigurationPageUrl,
         parseData: parseData,
         getStandardTransactionCodes: getStandardTransactionCodes,
         getExpenseCodes: getExpenseCodes
     }
 });