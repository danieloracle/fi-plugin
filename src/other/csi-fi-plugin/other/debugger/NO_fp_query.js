require(['N/query'], function(query) {

    var ppPluginQuery = query.create({
        // type: query.Type.CUSTOM_RECORD_TYPE
        type: query.Type.CUSTOM_RECORD_ACTION_SCRIPT
    });


    ppPluginQuery.columns = [
        ppPluginQuery.createColumn({
            // fieldId: 'id'
        })
    ];

    // ppPluginQuery.condition = ppPluginQuery.createCondition({
    //     fieldId: 'type',
    //     operator: query.Operator.IS,
    //     values: 'formatprofile'
    // });
    
    var results = ppPluginQuery.run().asMappedResults();
    log.debug(results);

    // var pp_parser_plugin_id = results[0].id;
    var pp_parser_plugin_id = results[0];
    log.debug(pp_parser_plugin_id);

});