/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/runtime', 'N/record', 'N/search', 'N/url', 'N/https', 'N/plugin'],
    function(ui, runtime, record, search, url, https, plugin) {

        function onRequest(context) {
//            '        xhttp.open("GET", "https://tstdrv2043981.app.netsuite.com/app/common/scripting/pluginlist.nl?whence=", true);' +
            // var configRecord = search.create({
            //     type: 'customrecord_ficonnsetup_example',
            //     columns: [
            //         search.createColumn({
            //             name: 'internalid'
            //         }),
            //         search.createColumn({
            //             name: 'custrecord_fi_clientid'
            //         }),
            //         search.createColumn({
            //             name: 'custrecord_fi_clientsecret'
            //         }),
            //         search.createColumn({
            //             name: 'custrecord_fi_token'
            //         }),
            //         search.createColumn({
            //             name: 'custrecord_fi_tokenurl'
            //         }),
            //         search.createColumn({
            //             name: 'custrecord_fi_token'
            //         })
            //     ]
            // });

            // var arrSearchResults = configRecord.run().getRange(0, 1);
            // log.debug('configRecord: ',JSON.stringify(arrSearchResults[0]));
            // var oConfig = arrSearchResults[0];

            var form = ui.createForm({
                title: 'CSI Financial Institution & Format profile SETUP',
                hideNavBar: true
            });

            var htmlContent = form.addField({
                id: 'custpage_htmlfield',
                type: ui.FieldType.INLINEHTML,
                label: 'HTML Content'
            });

            if (context.request.method === 'GET') {

                var my_url = url.resolveScript({
                    scriptId: 'customscript_fi_fp_setup',
                    deploymentId: 'customdeploy_fi_fp_setup',
                    returnExternalUrl: false
                });
        
                log.debug('my_url',my_url);

                //Test using N/plugin
                //ref: https://system.netsuite.com/app/help/helpcenter.nl?fid=section_157072709890.html
                var impls = plugin.findImplementations({
                    // type: 'customscript_fi_parser_plugin'
                    // type: 'customscript_test_custom_plugin'
                    // type: 'customscript_custom_plugin'
                    type: 'customscript_ei_pl_sending_plugin'
                });
                
                log.debug('impls.length: ', impls.length);
                log.debug('findImplementations: ', impls);
                // log.debug('findImplementations: ',JSON.stringify(impls));

                //Test Scraping Plug-In Implementations list view
                //>>> https://system.netsuite.com/app/common/scripting/pluginlist.nl?whence=

                htmlContent.defaultValue = '<h1>Welcome</h1><h2>Get plugin IDs</h2>';
                htmlContent.defaultValue = htmlContent.defaultValue + '' +
                '<script>' +
                'function my_code(){' +
                    //'alert(" Alert inside my_code function");' +
                '}' +
                'document.onload=my_code();' +
                '</script>';

                htmlContent.defaultValue = htmlContent.defaultValue + '' +
                '<button type="button" onclick="loadDoc()">Request data</button>' +
                '</br>' +
                '<p id="p_fi_plugin">customscript_fi_plugin_example: </p><span id="fi_plugin"></span>' + 
                '<p id="p_parser_plugin">customscript_fi_plugin_example: </p><span id="parser_plugin"></span>' + 
                '</br>' +
                '<button type="button" onclick="send_fi_fp_ids()">Create FI & FP records</button>' +

'<script>' + 
'var plugins_imp = "hia";' +
'var fi_plugin_id = "hia";' +
'var parser_plugin_id = "hia";' +
'' +
'    function loadDoc() {' +
'        var xhttp = new XMLHttpRequest();' +
'        xhttp.onreadystatechange = function() {' +
'            if (this.readyState == 4 && this.status == 200) {' +
'                const parser = new DOMParser();' +
'                var fi_plugin_name = "customscript_fi_plugin_example";' + 
'                plugins_imp = parser.parseFromString(this.responseText, "text/html");' +
'                var plugin_xpath = "//*[contains(text(),\'customscript_fi_plugin_example\')]/following-sibling::td";' +
'                var query_plugins = document.evaluate(plugin_xpath, plugins_imp, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);' +
'                fi_plugin_id = query_plugins.snapshotItem(3).textContent;' +
'                console.log("fi_plugin_id");' +
'                console.log(fi_plugin_id);' +
// '                document.getElementById("fi_plugin").innerHTML = "<div>customscript_fi_plugin_example id: " + fi_plugin_id + "</div>";' +
// '                document.getElementById("fi_plugin").innerHTML = " " + fi_plugin_id + " ";' +
'                document.getElementById("fi_plugin").innerHTML = fi_plugin_id;' +
'                var parser_plugin_name = "customscript_fi_parser_plugin";' +
'                plugins_imp = parser.parseFromString(this.responseText, "text/html");' +
'                var plugin_xpath = "//*[contains(text(),\'customscript_fi_parser_plugin\')]/following-sibling::td";' +
'                var query_plugins = document.evaluate(plugin_xpath, plugins_imp, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);' +
'                parser_plugin_id = query_plugins.snapshotItem(3).textContent;' +
'                console.log("parser_plugin_id");' +
'                console.log(parser_plugin_id);' +
'                document.getElementById("parser_plugin").innerHTML = parser_plugin_id;' +
'            }' +
'        };' +
'        xhttp.open("GET", "https://tstdrv2043981.app.netsuite.com/app/common/scripting/pluginlist.nl?whence=", true);' +
'        xhttp.send();' +
'    }' +

'' +
'    function send_fi_fp_ids() {' +
'       var xhttp = new XMLHttpRequest();' +
'       console.log("send_fi_fp_ids: " + fi_plugin_id);' +
'       fi_plugin_id = document.getElementById("fi_plugin").innerHTML;' +
'       parser_plugin_id = document.getElementById("parser_plugin").innerHTML;' +
'       console.log(fi_plugin_id);' +
'        var params = "&fi_plugin_id=" + fi_plugin_id + "&parser_plugin_id="+parser_plugin_id;' +
'        console.log(params);' +
'        xhttp.onreadystatechange = function() {' +
'            if (this.readyState == 4 && this.status == 200) {' +
'               alert(this.responseText);' +
'            }' +
'        };' +
 
'        var post_url = "'+ my_url +'" + params;' +
'        console.log(post_url);' +
'        xhttp.open("POST", post_url, true);' +
'        xhttp.send();' +
'    }' +
'</script>';
        


                //                 xhttp.open("GET", "ajax_info.txt", true);
                // xhttp.send();

                // var headerObj = {
                //     name: 'Accept-Language',
                //     value: 'en-us'
                // };
                // var response = https.get({
                //     url: 'https://system.netsuite.com/app/common/scripting/pluginlist.nl?whence=',
                //     headers: headerObj
                // });
                // log.debug('response', response);



                // for (var i = 0; i < impls.length; i++) {
                //     var pl = plugin.loadImplementation({
                //         type: 'customscript_magic_plugin',
                //         implementation: impls[i]
                //     });
                //     log.debug('impl ' + impls[i] + ' result = ' + pl.doTheMagic(10, 20));
                // }

                // var pl = plugin.loadImplementation({
                //     type: 'customscript_magic_plugin'
                // });
                // log.debug('default impl result = ' + pl.doTheMagic(10, 20));
    
               
               






                // //If there is no token then oAuth is started
                // if(oConfig.getValue('custrecord_fi_token').length > 0)
                // {
                //     log.debug('token: ',oConfig.getValue('custrecord_fi_token'));
                //     htmlContent.defaultValue = '<h1>Welcome</h1><h2>User already authenticated</h2>';
                // }
                // else
                // {
                //     htmlContent.defaultValue = '<h1>Welcome PNC</h1><h2>The user needs to be authenticated please go to SETUP</h2>';
                // }
                context.response.writePage(form);
            }

            if (context.request.method === 'POST') {
                // log.debug('HIA in POST: ',context.request);
                var fi_plugin_id = context.request.parameters.fi_plugin_id;
                var parser_plugin_id = context.request.parameters.parser_plugin_id;
                // log.debug('HIA in POST context.request.parameters: ',context.request.parameters);
                log.debug('HIA in POST: fi_plugin_id',fi_plugin_id);
                log.debug('HIA in POST: parser_plugin_id',parser_plugin_id);



                //Get FI if exist
                var fi_id = -1;
                var mySearch = search.create({
                    type: search.Type.FINANCIAL_INSTITUTION,
                    columns: []
                    // filters: ['financialinstitution', 'contains', 'New']
                });
                var myResultSet = mySearch.run();
                var resultRange = myResultSet.getRange({
                    start: 0,
                    end: 50
                });
                for (var i = 0; i < resultRange.length; i++) {
                    var createdFIRecord = record.load({
                        type: record.Type.FINANCIAL_INSTITUTION,
                        id: resultRange[i].id,
                        isDynamic: false
                    });
                    var financialinstitution = createdFIRecord.getValue({
                        fieldId: 'financialinstitution'
                    });
                    if (financialinstitution == 'Oracle Banking'){
                            fi_id =  resultRange[i].id;
                    }
                }
                log.debug('FINANCIAL_INSTITUTION', fi_id);
                if (fi_id == -1) {
                    // Create a financial institution record if not exist
                    var newFIRecord = record.create({
                        type: record.Type.FINANCIAL_INSTITUTION,
                        isDynamic: false,
                        defaultValues: null
                    }).setValue({
                        fieldId: 'financialinstitution',
                        value: 'Oracle Banking'
                    }).setValue({
                        fieldId: 'description',
                        value: 'Oracle Banking'
                    }).save();
                    fi_id = newFIRecord;
                }
                log.debug("-------");
                log.debug('FINANCIAL_INSTITUTION', fi_id);
                log.debug("-------");



                //Get FP if exist
                        //Get FI if exist
                        var fi_id = -1;
                        var mySearch = search.create({
                            type: search.Type.FINANCIAL_INSTITUTION,
                            columns: []
                            // filters: ['financialinstitution', 'contains', 'New']
                        });
                        var myResultSet = mySearch.run();
                        var resultRange = myResultSet.getRange({
                            start: 0,
                            end: 50
                        });
                        for (var i = 0; i < resultRange.length; i++) {
                            var createdFIRecord = record.load({
                                type: record.Type.FORMAT_PROFILE,
                                id: resultRange[i].id,
                                isDynamic: false
                            });
                            var financialinstitution = createdFIRecord.getValue({
                                fieldId: 'financialinstitution'
                            });
                            if (financialinstitution == 'Oracle Banking'){
                                    fi_id =  resultRange[i].id;
                            }
                        }
                        log.debug('FINANCIAL_INSTITUTION', fi_id);
                        if (fi_id == -1) {
                            // Create a financial institution record if not exist
                            var newFIRecord = record.create({
                                type: record.Type.FINANCIAL_INSTITUTION,
                                isDynamic: false,
                                defaultValues: null
                            }).setValue({
                                fieldId: 'financialinstitution',
                                value: 'Oracle Banking'
                            }).setValue({
                                fieldId: 'description',
                                value: 'Oracle Banking'
                            }).save();
                            fi_id = newFIRecord;
                        }
                        log.debug("-------");
                        log.debug('FINANCIAL_INSTITUTION', fi_id);
                        log.debug("-------");





                // // Create a format profile record
                // var newFPRecord = record.create({
                //     type: record.Type.FORMAT_PROFILE,
                //     isDynamic: true
                // });
                // newFPRecord.setValue({
                //     fieldId: 'formatprofile',
                //     value: 'Oracle Banking FP'
                // });
                // newFPRecord.setValue({
                //     fieldId: 'financialinstitution',
                //     value: fi_id
                // });
                // newFPRecord.setValue({
                //     fieldId: 'transactionparser',
                //     value: 1565
                // });
                // newFPRecord.setValue({
                //     fieldId: 'connectivitymethod',
                //     value: 1560
                // });

                
                // var fpID = newFPRecord.save();
                // log.debug("-------");
                // log.debug('FORMAT_PROFILE', fpID);
                // log.debug("-------");








                context.response.write({
                    output: 'Hello World' 
                });
            }

            // //
            // // Create a financial institution record
            // var newFIRecord = record.create({
            //     type: record.Type.FINANCIAL_INSTITUTION,
            //     isDynamic: false,
            //     defaultValues: null
            // }).setValue({
            //     fieldId: 'financialinstitution',
            //     value: 'New XYZ Bank'
            // }).setValue({
            //     fieldId: 'description',
            //     value: 'Description for XYZ Bank'
            // }).save();

            // Load a financial institution record
            // var createdFIRecord = record.load({
            //     type: record.Type.FINANCIAL_INSTITUTION,
            //     id: 1,
            //     isDynamic: false
            // });
            // // Get value of the description field
            // var description = createdFIRecord.getValue({
            //     fieldId: 'description'
            // });

            // // Update the description field
            // createdFIRecord.setValue({
            //     fieldId: 'description',
            //     value: 'Edited Description for XYZ Bank'
            // });
            // var recId = createdFIRecord.save();
            //





        }
        return {
            onRequest: onRequest
        };
    });