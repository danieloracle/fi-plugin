/**
 * @NApiVersion 2.x
 */

 require (['N/search', 'N/record'], function (search, record) {
    //Delete if exist
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
        log.debug(resultRange[i]);
        var createdFIRecord = record.load({
            type: record.Type.FINANCIAL_INSTITUTION,
            id: resultRange[i].id,
            isDynamic: false
        });
        var financialinstitution = createdFIRecord.getValue({
            fieldId: 'financialinstitution'
        });
        if (financialinstitution == 'Oracle Banking'){
            record.delete({
                type: record.Type.FINANCIAL_INSTITUTION,
                id: resultRange[i].id
            });
        }
    }
});
    
    