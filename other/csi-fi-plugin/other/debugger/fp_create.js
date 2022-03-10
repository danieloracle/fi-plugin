/**
 * @NApiVersion 2.x
 */
 require (['N/search', 'N/record', 'N/query'], function (search, record, query) {
    //Validate if FINANCIAL_INSTITUTION already exist
    //TODO: Refactoring run and filter
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
        if (financialinstitution == 'Oracle Banking'){
                fi_id =  resultRange[i].id;
        }
    }
    //if FINANCIAL_INSTITUTION record does not exist then create it:
    if (fi_id == -1) {
        // Create a financial institution record
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
    var newFPRecord = record.create({
        type: record.Type.FORMAT_PROFILE,
        isDynamic: true
    });
    newFPRecord.setValue({
        fieldId: 'formatprofile',
        value: 'Oracle Banking FP'
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
        value: 'Oracle Banking FP'
    });

    // Set this values after creating the account in the GL and in HSBC
    // newFPRecord.selectNewLine({
    //     sublistId: 'accountmapping'
    // });

    // newFPRecord.setCurrentSublistValue({
    //     sublistId: "accountmapping",
    //     fieldId: "accountmappingkey",
    //     value: 123
    // });
    // newFPRecord.setCurrentSublistValue({
    //     sublistId: 'accountmapping',
    //     fieldId: 'mappednetsuiteaccount',
    //     value: 1
    // });
    // newFPRecord.commitLine({
    //     sublistId: 'accountmapping'
    // });
    var fpID = newFPRecord.save();
    log.debug('-- FORMAT_PROFILE --', fpID);
});