/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/record', 'N/url'],
    function(ui, record, url) {
        function onRequest(context) {
            // Show iFrame
            html = '<h1>Extra PARSER configuration if needed</h1>';
            html = html + '<h2>iFrame example</h2>';
            html = html + '<br> <br>';

            var form = ui.createForm({
                title: '- FI PARSER PLUGIN Custom Configuration - ',
                hideNavBar: true
            });


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