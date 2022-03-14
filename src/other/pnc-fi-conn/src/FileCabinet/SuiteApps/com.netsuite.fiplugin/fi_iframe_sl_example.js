/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/runtime', 'N/record', 'N/search', 'N/url', 'N/http'],
    function(ui, runtime, record, search, url, http) {

        function onRequest(context) {
            var form = ui.createForm({
                title: 'FI Connectivity Plugin IFRAME',
                hideNavBar: true
            });

            var htmlContent = form.addField({
                id: 'custpage_htmlfield',
                type: ui.FieldType.INLINEHTML,
                label: 'HTML Content'
            });

            if (context.request.method === 'GET') {
                htmlContent.defaultValue = '<h1>Welcome</h1><h2>Here the user can authenticate to the FINANCIAL INSTITUTION</h2>';
                context.response.writePage(form);
            }
        }
        return {
            onRequest: onRequest
        };
    });