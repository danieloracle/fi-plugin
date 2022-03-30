require(['N/query', 'N/record'], function(query, record) {

    //https://system.netsuite.com/app/help/helpcenter.nl?fid=section_1510878994.html
    
    // var fiPluginQuery = query.create({
    //     type: query.Type.F_I_PARSER_PLUGIN
    // });
    var fiPluginQuery = query.create({
        type: query.Type.ALL_PARSER_PLUGIN
    });

    

    fiPluginQuery.columns = [
        fiPluginQuery.createColumn({
            fieldId: 'id'
        }),
        fiPluginQuery.createColumn({
            fieldId: 'name'
        }),
        fiPluginQuery.createColumn({
            fieldId: 'scriptid'
        })
    ];

    fiPluginQuery.condition = fiPluginQuery.createCondition({
        fieldId: 'scriptid',
        operator: query.Operator.IS,
        values: 'customscript_bsp_parser_bai2'
    });
    var results = fiPluginQuery.run().asMappedResults();
    log.debug('fi plugin: ',results);
    log.debug('fi plugin id', results[0].id);


});