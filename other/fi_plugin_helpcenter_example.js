/**
 * @NApiVersion 2.x
 * @NScriptType fiConnectivityPlugin
 * @NModuleScope SameAccount
 */
 define(['N/search'],
 function (search)
 {

     // internal function used to load configuration for this plug-in from a custom record
     function loadConfiguration(configurationId)
     {
         var searchResults = search.create({
             type: 'customrecord_sampleconfig',
             filters: [{
                 name: 'custrecord_configurationid',
                 operator: 'is',
                 values: [configurationId]
             }]
         });
         return searchResults.run().getRange({start: 0, end: 1});
     }

     function getConfigurationIFrameUrl(context)
     {
         var configurationId = context.pluginConfiguration.getConfigurationFieldValue({fieldName: "configuration_id"});
         context.configurationIFrameUrl = "/app/site/hosting/scriptlet.nl?script=1&deploy=1&configurationId=" + configurationId;
     }

     function getAccounts(context)
     {
         var configurationId = context.pluginConfiguration.getConfigurationFieldValue({fieldName: "configuration_id"});
         var configuration = loadConfiguration(configurationId)
         context.addAccount({
             accountMappingKey: "12345",
             displayName: "Checking (XXXX11)",
             accountType: "BANK",
             currency: "USD",
             groupName: "Bank of America",
             lastUpdated: "2020-06-30T01:23:45"
         });
     }

     function getTransactionData(context)
     {
         var configurationId = context.pluginConfiguration.getConfigurationFieldValue({fieldName: "configuration_id"});
         var configuration = loadConfiguration(configurationId)
         var accountRequests = JSON.parse(context.accountRequestsJSON);
         if (accountRequests != null) {
             accountRequests.forEach(function (accountRequest) {
                 var accountId = accountRequest.accountMappingKey;
                 var fromDateTime = accountRequest.dataStartTime;
                 var toDateTime = accountRequest.dataEndTime;
                
                 var downloadedData = "... Retrieve the account data using a web service request or a file transfer...";

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