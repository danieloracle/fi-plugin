/**
 * @NApiVersion 2.0
 * @NScriptType SDFInstallationScript
 */
define(['N/record', 'N/search', 'N/query'], function(record, search, query) {
    function migrate(context) {	
		var fi_name = 'Oracle Bank SuiteApp';
		var fi_description = 'Oracle Bank Scripted';
		var fp_name = 'Oracle Bank Scripted';
		var fp_description = 'Oracle Bank Scripted';
		var fi_connectivity_plugin_id = 'customscript_fi_plugin_example';
		var fi_parser_plugin_id = 'customscript_fi_parser_plugin_example'; //var fi_parser_plugin_id = 'customscript_bsp_parser_bai2';
    
		//Check if exists FINANCIAL_INSTITUTION
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
        	fi_id = newFIRecord;
        	log.debug('new fi_id', fi_id);

			//GET FI_CONNECTIVITY_PLUGIN ID:
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
			var fi_connectivity_plugin_id = results[0].id;
			log.debug('fi_connectivity_plugin_id', fi_connectivity_plugin_id);


			//GET PARSER PLUGIN
			var fiPluginQuery = query.create({
				type: query.Type.ALL_PARSER_PLUGIN
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
				values: fi_parser_plugin_id
			});

			var results = fiPluginQuery.run().asMappedResults();
			var fi_parser_plugin_id = results[0].id;
			log.debug('fi_parser_plugin_id', fi_parser_plugin_id);

			//CREAT FORMAT PROFILE
			log.debug('-- Create FORMAT_PROFILE --', 'hia');
			var newFPRecord = record.create({
				type: record.Type.FORMAT_PROFILE,
				isDynamic: true
			});
			newFPRecord.setValue({
				fieldId: 'formatprofile',
				value: fp_name
			});
			newFPRecord.setValue({
				fieldId: 'financialinstitution',
				value: fi_id
			});
			newFPRecord.setValue({
				fieldId: 'transactionparser',
				value: fi_parser_plugin_id
			});
			newFPRecord.setValue({
				fieldId: 'connectivitymethod',
				value: fi_connectivity_plugin_id
			});
			newFPRecord.setValue({
				fieldId: 'description',
				value: fp_description
			});
			var fpID = newFPRecord.save();
			log.debug('-- FORMAT_PROFILE --', fpID);

		}
        
    }
    return {
    	run: function run(context) {
    		migrate(context);
        }
    };
}); 