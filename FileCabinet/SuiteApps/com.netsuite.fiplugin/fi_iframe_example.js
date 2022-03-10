/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/runtime', 'N/record', 'N/search', 'N/url', 'N/http'],
    function(ui, runtime, record, search, url, http) {

        function onRequest(context) {

            var output = url.resolveScript({
                scriptId: 'customscript_fi_iframe_example',
                deploymentId: 'customdeploy_fi_iframe',
                returnExternalUrl: true
            });

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
                htmlContent.defaultValue = '<h1>Welcome</h1><h2>User already authenticated</h2>';
                htmlContent.defaultValue = htmlContent.defaultValue + '<a href="'+output+'">iFrame</a>'
                context.response.writePage(form);
            }
        }
        return {
            onRequest: onRequest
        };
    });