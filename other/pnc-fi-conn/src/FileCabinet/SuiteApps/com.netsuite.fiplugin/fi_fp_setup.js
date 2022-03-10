/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/runtime', 'N/record', 'N/search', 'N/url', 'N/https', 'N/plugin', 'N/query'],
    function(serverWidget, runtime, record, search, url, https, plugin, query) {

        function onRequest(context) {

            var form = serverWidget.createForm({
                title: 'Financial Institution & Format profile SETUP',
                hideNavBar: true
            });

            if (context.request.method === 'GET') {

                form.addSubmitButton({
                    label: 'Create Financial institution and Format profile'
                });

                context.response.writePage(form);
            }

            if (context.request.method === 'POST') {
                //Validate if FINANCIAL_INSTITUTION already exist
                var fi_id = -1;
                var mySearch = search.create({
                    type: search.Type.FINANCIAL_INSTITUTION,
                    columns: []
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
                    if (financialinstitution == 'My Bank'){
                            fi_id =  resultRange[i].id;
                    }
                }
                //if FINANCIAL_INSTITUTION record does not exist then create it:
                if (fi_id == -1) {
                    // Create a financial institution record
                    //Reference: https://system.netsuite.com/app/help/helpcenter.nl?fid=section_1557257383.html
                    var newFIRecord = record.create({
                        type: record.Type.FINANCIAL_INSTITUTION,
                        isDynamic: false,
                        defaultValues: null
                    }).setValue({
                        fieldId: 'financialinstitution',
                        value: 'My Bank'
                    }).setValue({
                        fieldId: 'description',
                        value: 'My Bank'
                    }).save();
                    fi_id = newFIRecord;
                }
                log.debug('FINANCIAL_INSTITUTION', fi_id);


                //GET FI connectivity plugin ID:
                var ficPluginQuery = query.create({
                    type: query.Type.FI_CONNECTIVITY_PLUGIN
                });

                ficPluginQuery.columns = [
                    ficPluginQuery.createColumn({
                        fieldId: 'id'
                    }),
                    ficPluginQuery.createColumn({
                        fieldId: 'name'
                    }),
                    ficPluginQuery.createColumn({
                        fieldId: 'scriptid'
                    })
                ];

                ficPluginQuery.condition = ficPluginQuery.createCondition({
                    fieldId: 'scriptid',
                    operator: query.Operator.IS,
                    values: 'customscript_fi_plugin_example'
                });
                
                var results = ficPluginQuery.run().asMappedResults();
                var fi_connectivity_plugin_id = results[0].id;
                log.debug('fi_connectivity_plugin_id', fi_connectivity_plugin_id);

                //GET FI parser ID:
                var fipPluginQuery = query.create({
                    type: query.Type.F_I_PARSER_PLUGIN
                });

                fipPluginQuery.columns = [
                    fipPluginQuery.createColumn({
                        fieldId: 'id'
                    }),
                    fipPluginQuery.createColumn({
                        fieldId: 'name'
                    }),
                    fipPluginQuery.createColumn({
                        fieldId: 'scriptid'
                    })
                ];

                fipPluginQuery.condition = fipPluginQuery.createCondition({
                    fieldId: 'scriptid',
                    operator: query.Operator.IS,
                    values: 'customscript_fi_parser_plugin'
                });
                
                var results = fipPluginQuery.run().asMappedResults();
                var fi_parser_plugin_id = results[0].id;
                log.debug('fi_parser_plugin_id', fi_parser_plugin_id);
                

                // Create a format profile record
                // Reference: https://system.netsuite.com/app/help/helpcenter.nl?fid=section_1557261357.html
                var newFPRecord = record.create({
                    type: record.Type.FORMAT_PROFILE,
                    isDynamic: true
                });
                newFPRecord.setValue({
                    fieldId: 'formatprofile',
                    value: 'My Bank FP'
                });
                newFPRecord.setValue({
                    fieldId: 'financialinstitution',
                    value: fi_id
                });
                newFPRecord.setValue({
                    fieldId: 'transactionparser',
                    value: fi_parser_plugin_id
                });
                newFPRecord.setValue({
                    fieldId: 'connectivitymethod',
                    value: fi_connectivity_plugin_id
                });

                
                newFPRecord.setValue({
                    fieldId: 'description',
                    value: 'My Bank FP'
                });

                var fpID = newFPRecord.save();


                //Crete the form to show the values on screen
                var form = serverWidget.createForm({
                    title: 'Financial Institution & Format profile'
                });
    
                var fi_field = form.addField({
                    id: 'fi_id',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Financial Institution record id'
                });
                fi_field.defaultValue = fi_id;

                var fp_field = form.addField({
                    id: 'fp_id',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Format Profile record id'
                });
                fp_field.defaultValue = fpID;    
                context.response.writePage(form);
            }


        }
        return {
            onRequest: onRequest
        };
    });