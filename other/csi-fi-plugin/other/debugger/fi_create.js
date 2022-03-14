/**
 * @NApiVersion 2.x
 */

 require (['N/search', 'N/record'], function (search, record) {
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
    log.debug(newFIRecord);
});