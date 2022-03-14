/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/runtime', 'N/record', 'N/search', 'N/url', 'N/http'],
    function(ui, runtime, record, search, url, http) {

        function onRequest(context) {
            var configRecord = search.create({
                type: 'customrecord_ficonnsetup_example',
                columns: [
                    search.createColumn({
                        name: 'internalid'
                    }),
                    search.createColumn({
                        name: 'custrecord_fi_clientid'
                    }),
                    search.createColumn({
                        name: 'custrecord_fi_clientsecret'
                    }),
                    search.createColumn({
                        name: 'custrecord_fi_token'
                    }),
                    search.createColumn({
                        name: 'custrecord_fi_tokenurl'
                    }),
                    search.createColumn({
                        name: 'custrecord_fi_token'
                    })
                ]
            });

            var arrSearchResults = configRecord.run().getRange(0, 1);
            log.debug('configRecord: ',JSON.stringify(arrSearchResults[0]));
            var oConfig = arrSearchResults[0];

            var form = ui.createForm({
                title: 'FI Connectivity Access',
                hideNavBar: true
            });

            var htmlContent = form.addField({
                id: 'custpage_htmlfield',
                type: ui.FieldType.INLINEHTML,
                label: 'HTML Content'
            });

            if (context.request.method === 'GET') {

                //If there is no token then oAuth is started
                if(oConfig.getValue('custrecord_fi_token').length > 0)
                {
                    log.debug('token: ',oConfig.getValue('custrecord_fi_token'));
                    htmlContent.defaultValue = '<h1>Welcome</h1><h2>User already authenticated</h2>';
                }
                else
                {
                    htmlContent.defaultValue = '<h1>Welcome PNC</h1><h2>The user needs to be authenticated please go to SETUP</h2>';
                }
                context.response.writePage(form);
            }
        }
        return {
            onRequest: onRequest
        };
    });