require(['N/query'], function(query) {

    var ppPluginQuery = query.create({
        type: query.Type.SCRIPT
    });

    ppPluginQuery.columns = [
        ppPluginQuery.createColumn({
            fieldId: 'id'
        }),
        ppPluginQuery.createColumn({
            fieldId: 'name'
        })
    ];

    ppPluginQuery.condition = ppPluginQuery.createCondition({
        fieldId: 'scriptid',
        operator: query.Operator.IS,
        values: 'customscript_fi_parser_plugin'
    });
    
    var results = ppPluginQuery.run().asMappedResults();
    log.debug(results);

    var pp_parser_plugin_id = results[0].id;
    log.debug(pp_parser_plugin_id);

});