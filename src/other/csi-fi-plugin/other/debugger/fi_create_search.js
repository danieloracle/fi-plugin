/**
 * @NApiVersion 2.x
 */

 require (['N/search', 'N/record'], function (search, record) {

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
    log.debug(myResultSet);
    log.debug(resultRange);
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
log.debug('fi_id');
log.debug(fi_id);

});