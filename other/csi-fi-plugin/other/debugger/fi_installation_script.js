/**
 * @NApiVersion 2.x
 */

 require (['N/search', 'N/record'], function (search, record) {

    var fi_name = 'Oracle Bank Scripted';
    var fi_description = 'Oracle Bank Scripted';
    var fp_name = 'Oracle Bank Scripted';
    var fp_description = 'Oracle Bank Scripted';
    var fi_connectivity_plugin_id = 'customscript_fi_plugin_example'; //<connectivitymethod>1787</connectivitymethod>
    var fi_parser_plugin_id = 'customscript_fi_plugin_example'; //<transactionparser>882</transactionparser>
    


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
    log.debug('myResultSet', myResultSet);
    log.debug('resultRange', resultRange);
    for (var i = 0; i < resultRange.length; i++) {
        var createdFIRecord = record.load({
            type: record.Type.FINANCIAL_INSTITUTION,
            id: resultRange[i].id,
            isDynamic: false
        });
        var financialinstitution = createdFIRecord.getValue({
            fieldId: 'financialinstitution'
        });
        if (financialinstitution == fi_name){
                fi_id =  resultRange[i].id;
        }
    }
    log.debug('fi_id', fi_id);
    if(fi_id == -1){
        log.debug('create fi');
        // Create a financial institution record
        var newFIRecord = record.create({
            type: record.Type.FINANCIAL_INSTITUTION,
            isDynamic: false,
            defaultValues: null
        }).setValue({
            fieldId: 'financialinstitution',
            value: fi_name
        }).setValue({
            fieldId: 'description',
            value: fi_description
        }).save();
        log.debug(newFIRecord);
    }
});