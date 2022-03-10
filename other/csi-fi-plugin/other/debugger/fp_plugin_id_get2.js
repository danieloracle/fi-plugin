require(['N/query'], function(query) {

    var fpPluginQuery = query.create({
        type: query.Type.F_I_PARSER_PLUGIN
    });

    fpPluginQuery.columns = [
        fpPluginQuery.createColumn({
            fieldId: 'id'
        }),
        fpPluginQuery.createColumn({
            fieldId: 'name'
        }),
        fpPluginQuery.createColumn({
            fieldId: 'scriptid'
        })
    ];

    fpPluginQuery.condition = fpPluginQuery.createCondition({
        fieldId: 'scriptid',
        operator: query.Operator.IS,
        values: 'customscript_fi_parser_plugin'
    });
    
    var results = fpPluginQuery.run().asMappedResults();
    log.debug(results);

    var fp_parser_plugin_id = results[0].id;
    log.debug(fp_parser_plugin_id);
    
});