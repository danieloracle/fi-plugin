/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/runtime', 'N/record', 'N/search', 'N/url', 'N/http', 'N/file'],
    function(ui, runtime, record, search, url, http, file) {

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

            html = '<h1>Welcome</h1><h2>User already authenticated</h2>';
            // Show iFrame
            html = html + '<a href="'+output+'">iFrame</a>';
            html = html + '<br> <br>';
            // Show bai2 file content
            try{
                var file_id = '/SuiteApps/com.netsuite.fiplugin/src/bai2.txt';
                var fileObj = file.load({id: file_id});
                var c = fileObj.getContents();
                html = html + "<br>";
                html = html  + "<div>"+JSON.stringify(c)+"</div>";
            }catch(e){
                log.error("load file error", e);
                html = html  + "<div>"+JSON.stringify(e)+"</div>";
            }
            
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