/**
 * @NApiVersion 2.0
 * @NScriptType SDFInstallationScript
 */
define(['N/record', 'N/search', 'N/runtime'], function(record, search, runtime) {
    function migrate(context) {	
		log.debug('context', context);
        if (context.fromVersion === '1.0.0' && context.toVersion === '1.1.0') {
			log.debug('from 100 to 110');
        	// var tSearch = search.create({
        	// 	type: search.Type.TRANSACTION,
        	// 	columns: [{
        	// 		name: 'internalid'
        	// 	}],
        	// 	filters: [{
        	// 		name: 'recordtype',
        	// 		operator: search.Operator.IS,
        	// 		values: ['customtransaction_install_script']
        	// 	}]
        	// });
        	// tSearch.run().each(function(result) {
        	// 	var tranInternalId = result.getValue({name: 'internalid'});
        	// 	var tran = record.load({
        	// 		type: 'customtransaction_install_script',
        	// 		id: tranInternalId
        	// 	});
        	// 	var fieldValue = runtime.getCurrentScript().getParameter({name: 'custscript1'});
        	// 	tran.setValue({
        	// 		fieldId: 'custbody_install_script',
        	// 		value: fieldValue
        	// 	});
        	// 	tran.save();
        	// })
        }
    }
    return {
    	run: function run(context) {
    		migrate(context);
        }
    };
}); 