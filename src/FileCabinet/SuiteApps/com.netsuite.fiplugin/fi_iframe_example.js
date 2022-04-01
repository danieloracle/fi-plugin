/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/runtime', 'N/record', 'N/search', 'N/url', 'N/http', 'N/file'],
    function(ui, runtime, record, search, url, http, file) {

        function onRequest(context) {
            var form = ui.createForm({
                title: 'FI Connectivity Access',
                hideNavBar: true
            });

            html = '<h1>Welcome</h1>';
            // html = html + '<h2>User already authenticated</h2>';
            // Show iFrame
            html = html + '<h2>iFrame example</h2>';

            var htmlContent = form.addField({
                id: 'custpage_htmlfield',
                type: ui.FieldType.INLINEHTML,
                label: 'HTML Content'
            });

            if (context.request.method === 'GET') {
                htmlContent.defaultValue = html;
                context.response.writePage(form);
            }
        }
        return {
            onRequest: onRequest
        };
    });