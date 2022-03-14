/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/runtime', 'N/record', 'N/search', 'N/url', 'N/http', 'N/file'],
    function(ui, runtime, record, search, url, http, file) {
        function getBAI(){
            var downloadedData =
            "chr01,BANKOFAMERICA,cas72068,181108,1330,1,80,1,2\n"+
            "02,cas72068,071000039,1,190109,2359,,2\n"+
            "03,9999999999,USD\n"+
            "16,165,25000,Z,965710090000149,004646894728\n"+
            "88,ME CTRL DIS 004646894728 CR\n"+
            "49,25000,4\n"+
            "98,25000,1,6\n"+
            "99,25000,1,8"
            return downloadedData;
        }

        function onRequest(context) {
            // Show iFrame link
            var output = url.resolveScript({
                scriptId: 'customscript_fi_iframe_example',
                deploymentId: 'customdeploy_fi_iframe',
                returnExternalUrl: true
            });
            var form = ui.createForm({
                title: 'FI Connectivity Access',
                hideNavBar: true
            });

            html = '<h1>Welcome</h1>';
            // html = html + '<h2>User already authenticated</h2>';
            // Show iFrame
            html = html + '<h2>iFrame example</h2>';
            html = html + '<a href="'+output+'">iFrame URL</a>';
            html = html + '<br> <br>';
            // Show bai2 file content
            html = html + '<h2>BAI2 file example content to import</h2>';
            html = html + '<div>';
            html = html + getBAI();
            html = html + '</div>';

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