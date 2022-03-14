require(['N/query'], function(query) {

    var fiPluginQuery = query.create({
        type: query.Type.SCRIPT
    });

    fiPluginQuery.columns = [
        fiPluginQuery.createColumn({
            fieldId: 'id'
        }),
        fiPluginQuery.createColumn({
            fieldId: 'name'
        })
    ];

    fiPluginQuery.condition = fiPluginQuery.createCondition({
        fieldId: 'scriptid',
        operator: query.Operator.IS,
        values: 'customscript_fi_plugin_example'
    });
    
    var results = fiPluginQuery.run().asMappedResults();
    log.debug(results);

    var fi_parser_plugin_id = results[0].id;
    log.debug(fi_parser_plugin_id);

});