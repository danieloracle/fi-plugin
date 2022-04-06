/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/runtime', 'N/record', 'N/search', 'N/url', 'N/https', 'N/file'],
    function(ui, runtime, record, search, url, https, file) {

        //https://tstdrv2043981.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1803&deploy=1&compid=TSTDRV2043981&h=829b94ee16a0b14a20fc
        //https://tstdrv2043981.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1803&deploy=1&compid=TSTDRV2043981

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
            // Using fi_iframe_example.js as the iFrame configuration
            var output = url.resolveScript({
                scriptId: 'customscript_fi_iframe_example',
                deploymentId: 'customdeploy_fi_iframe',
                returnExternalUrl: true
            });
            html = html + '<br>';
            html = html + '<a href="' +output + '"><h3>SuiteLet External LINK: </h3>'+output+'</a>';


            // output = 'https://tstdrv2043981.extforms.netsuite.com';
            output = 'https%3A%2F%2Ftstdrv2043981.extforms.netsuite.com%2Fapp%2Fsite%2Fhosting%2Fscriptlet.nl%3Fscript%3D1803%26deploy%3D1%26compid%3DTSTDRV2043981%26h%3D829b94ee16a0b14a20fc';
            // var APPROPRIATE_SCOPE = 'signinopenid';
            // var APPROPRIATE_SCOPE = 'signin%20openid';
            // var APPROPRIATE_SCOPE = 'signin';
            
            html = html + '<br>';
            html = html + '<br>';
            html = html + '<br>';
            var YOUR_CLIENT_ID = 'ce8f236739e34dae8d40c466d86e2b46';
            var YOUR_REDIRECT_URI = output;
            var APPROPRIATE_SCOPE = 'openid';
            var YOUR_STATE_VALUE = 'mystate';
            var capitalone_oauth_url = 'https://api-sandbox.capitalone.com/oauth2/authorize?client_id='+ YOUR_CLIENT_ID +'&redirect_uri=' + YOUR_REDIRECT_URI + '&scope='+APPROPRIATE_SCOPE+'&response_type=code&state='+ YOUR_STATE_VALUE;
            html = html + '<a href="' +capitalone_oauth_url + '"><h3>CAPITAL ONE OAUTH URL: </h3>'+capitalone_oauth_url+'</a>';


                //Test call CLOUD-ELEMENT.COM (get customers)
                //---------------------------
                // var user = 't7uUT3b16rcYaftD9y90Arsn5cqZMWSuuTE8SXsmVL4=';
                // var organization = '3fc04a9a9da5312244aa6b770526ec1d';
                // var element = 'rnzERGFYKJ8/xhwYAxTF3CDmnoLYkqCF8VoU4zR31MQ=';
    
                // var headerObj = {
                //     accept: 'application/json',
                //     Authorization: 'User '+user+', Organization '+organization+', Element '+element,
                // };
                // var response = https.get({
                //     url: 'https://staging.cloud-elements.com/elements/api-v2/customers',
                //     headers: headerObj
                // });

                // log.debug({
                //     title: 'Client Response Body',
                //     details: response.body
                // });
                // html = html + '<h2>Response from CLOUD-ELEMENT</h2>';
                // html = html + '<br>';
                // html = html + response.body;


                htmlContent.defaultValue = html;
                context.response.writePage(form);
            }
        }
        return {
            onRequest: onRequest
        };
    });