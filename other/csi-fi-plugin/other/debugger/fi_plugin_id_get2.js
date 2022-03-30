require(['N/query', 'N/record'], function(query, record) {

    var fiPluginQuery = query.create({
        type: query.Type.FI_CONNECTIVITY_PLUGIN
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
        values: 'customscript_fi_plugin_example'
    });
    var results = fiPluginQuery.run().asMappedResults();
    log.debug('fi plugin: ',results);
    log.debug('fi plugin id', results[i].id);


});