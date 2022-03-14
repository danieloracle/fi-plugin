/**
 * @NApiVersion 2.x
 * @NScriptType fiConnectivityPlugin
 * @NModuleScope SameAccount
 */
define(['N/https', 'N/search', 'N/url'],
    function (https, search, url)
    {
        function getConfigurationIFrameUrl(context)
        {
            // // Show format profile configurationId
            // var configurationId = context.pluginConfiguration.getConfigurationFieldValue({fieldName: "configuration_id"});
            // log.debug("getConfigurationFieldValue", "configurationId: " + configurationId);
            //
            var output = url.resolveScript({
                scriptId: 'customscript_fi_iframe_example',
                deploymentId: 'customdeploy_fi_iframe',
                returnExternalUrl: true
            });
            log.debug("getConfigurationIFrameUrl", "Loading iFrame: " + output);
            context.configurationIFrameUrl = output;
        }

        function getAccounts(context)
        {
            log.debug("getAccounts", "Getting customers accounts from Bank");
            context.addAccount({
                accountMappingKey: "000000001",
                displayName: "Checking (000000001)",
                accountType: "BANK",
                currency: "USD",
                groupName: "Oracle Bank",
                lastUpdated: "2022-03-08T01:23:45"
            });
            context.addAccount({
                accountMappingKey: "CHECKING 222222222",
                displayName: "Checking (XXXX22)",
                accountType: "BANK",
                currency: "USD",
                groupName: "Oracle Bank",
                lastUpdated: "2022-03-08T01:23:45"
            });
        }

        function getTransactionData(context)
        {
            // // Example 1: CSV/json example
            // // ---------------------------
            // var downloadedData =
            //     "TYPE;DATE;NAME;MEMO;AMOUNT\n"+
            //     "CHECK;2017-04-13;Jessica L Sikes;;-1228.98\n" +
            //     "CHECK;2017-04-13;Tom A Taylor;;-555.97";
            //
            // var accountRequests = JSON.parse(context.accountRequestsJSON);
            // if (accountRequests != null) {
            //     accountRequests.forEach(function (accountRequest) {
            //         var accountId = accountRequest.accountMappingKey;
            //         var fromDateTime = accountRequest.dataStartTime;
            //         var toDateTime = accountRequest.dataEndTime;
            //         log.debug("accountRequests.forEach", accountId + " - " + fromDateTime + " - " + toDateTime);
            //         context.addDataChunk({dataChunk: downloadedData});
            //     });
            // }

            // Example 2: BAI2 file
            // --------------------
            // error: "Version Number" has an invalid field data: "2/02"
            var downloadedData =
            "01,BANKOFAMERICA,cas72068,181108,1330,1,80,1,2/"+
            "02,cas72068,071000039,1,190109,2359,,2/"+
            "03,000000001,USD/"+
            "16,165,25000,Z,965710090000149,004646894728/"+
            "88,ME CTRL DIS 004646894728 CR/"+
            "49,25000,4/"+
            "98,25000,1,6/"+
    		"99,25000,1,8/";

            // Example 2b: BAI2 file
            // ---------------------
            var downloadedData =
            "01,021000021,H1234567 DT,130710,0920,3,,,2/"+
            "02,H1234567 DT,021000021,1,130710,0920,,3/"+
            "03,999999999999999,USD,010,5806693,,,030,3236371,,,040,3236371,,/"+
            "88,100,0,0,,400,2570322,11,,470,2570322,11,/"+
            "16,475,2077335,V,071105,1234,809070558322,0000000006512/"+
            "88,CHECK NO=0000000001234  AVAIL: 2077335  1DAY: 0  2+PLUS: 0"+
            "16,475,345900,0,8870236994,0000000001235/"+
            "88,CHECK NO=0000000001235"+
            "16,475,63153,0,8670188879,0000000001236/"+
            "88,CHECK NO=0000000001236"+
            "16,475,26670,0,8870436103,0000000001237/"+
            "88,CHECK NO=0000000001237"+
            "16,475,22767,0,8870254898,0000000001238/"+
            "88,CHECK NO=0000000001238"+
            "16,475,16185,V,071105,2234,808870810884,0000000001239/"+
            "88,CHECK NO=0000000001239  AVAIL: 16185  1DAY: 0  2+PLUS: 0"+
            "16,475,6749,0,8870226548,0000000001240/"+
            "88,CHECK NO=0000000001240"+
            "16,475,5150,0,8370025365,0000000001241/"+
            "88,CHECK NO=0000000001241"+
            "16,475,3585,0,8870272351,0000000001242/"+
            "88,CHECK NO=0000000001242"+
            "16,475,2740,0,8870112719,0000000001243/"+
            "88,CHECK NO=0000000001243"+
            "16,475,088,V,071105,2234,808670817281,0000000001244/"+
            "88,CHECK NO=0000000001244  AVAIL: 88  1DAY: 0  2+PLUS: 0"+
            "49,19990401,25/"+
            "03,999999999999998,USD,010,0,,,030,0,,,040,0,100,120137111,7,400,120137111,4/"+
            "16,115,66717093,S,394993,37593200,28728900,0101852310LB,00001/"+
            "88,REMARK=LOCKBOX NO: 00001 FOR 3000 ITEMS AT 15:00 7 TRN: 0101852310LB"+
            "16,115,31995221,S,1874721,28661400,1459100,0101850310LB,00002/"+
            "88,REMARK=LOCKBOX NO: 00002 FOR 1843 ITEMS AT 03:00 7 TRN: 0101850310LB"+
            "16,115,20765607,S,936907,16486700,3342000,0101851310LB,00001/"+
            "88,REMARK=LOCKBOX NO: 00001 FOR 1170 ITEMS AT 09:30 7 TRN: 0101851310LB"+
            "16,166,319864,S,319864,0,0,3090792015TC,/"+
            "88,ORIG CO NAME=COMPANY ABC,ORIG ID=9200602101,DESC DATE=OFFSET,ENTRY DESCR=E-CHK,"+
            "88,ENTRY CLASS=CCD,TRACE NO=021000020792015,ENTRY DATE=071106,IND ID NO=9200602"+
            "88,101,IND NAME=EFT FILE NAME: FTO1L2,COMPANY DATA=000001 FTO1L2,REMARK=EFT/ACH"+
            "88, CREATED OFFSET FOR ORIGIN#:9200602101 CO EFF DATE: 07/11/06"+
            "16,266,248323,S,248323,0,0,,/"+
            "88,REMARK=REDEPOSIT CHECK CRED                         000002"+
            "88,                     # OF ITEMS00009"+
            "16,266,81003,S,81003,0,0,,/"+
            "88,REMARK=REDEPOSIT CHECK CRED                         000003"+
            "88,                     # OF ITEMS00002"+
            "16,357,10000,S,10000,0,0,,000001/"+
            "88,REMARK=RESEARCH ADJ 3693-06NOV07  CREDIT FOR AN ENCODING ERROR POSTED ON 10/"+
            "88,15/07. AN ITEM FOR $131.47, DEPOSITED TO YOUR ACCOUNT $31.47. OUR CASE #3693"+
            "88,-06NOV07. CHECK #1234           .  STORE #54321.    LOCKBOX #000001."+
            "16,397,0,S,-47500,0,47500,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,397,0,S,-46100,0,46100,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,397,0,S,-35800,0,35800,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,397,0,S,-33400,0,33400,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,397,0,S,-31300,0,31300,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,397,0,S,-29100,0,29100,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,397,0,S,-25000,0,25000,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,397,0,S,-25000,0,25000,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,397,0,S,-16500,0,16500,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,397,0,S,-13200,0,13200,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,397,0,S,-26000,0,26000,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,555,248323,0,,/"+
            "88,REMARK=REDEPOSIT CHECK RTRN                         654321"+
            "88,                     # OF ITEMS00009"+
            "16,555,146805,0,,/"+
            "88,REMARK=DEPOSITED ITEM RETURNED                      765432"+
            "88,                     # OF ITEMS00004"+
            "16,555,81003,0,,/"+
            "88,REMARK=REDEPOSIT CHECK RTRN                         876543"+
            "88,                     # OF ITEMS00002"+
            "16,575,119660980,0,0074970780XF,/"+
            "88,REMARK=AUTOMATIC DOLLAR TRANSFER TO ACCOUNT 000000099999999 TRN: 0074970780X"+
            "88,F  AVAIL: 236261180  1DAY: -82741300  2+PLUS: -33858900"+
            "49,480548444,57/"+
            "03,999999999999997,USD,010,5252958712,,,030,4204059523,,,040,4071751223,,/"+
            "88,100,3756208011,,400,4805107200,2,/"+
            "16,175,1170771703,S,21208383,,36325635,9170666316,109640,/"+
            "16,175,906664455,S,46240474,876543211,29962441,9170672260,109650,/"+
            "16,175,878109884,S,29872775,987654322,31491148,9170669068,109620,/"+
            "16,175,610288719,S,9414304,897654321,7729330,9170671384,109600,/"+
            "16,175,153152240,S,26338675,987655432,3921759,9170668464,109660,/"+
            "16,175,37195600,S,4215000,12345678,509825,9170671796,109590,/"+
            "16,175,22950,S,0,5850,17100,987654321,109610,/"+
            "16,214,2460,S,2460,0,0,,/"+
            "88,REMARK=Intl Coll L32497 B520484 I230 FX ADJUST FAMT633.76 REFTRAN 11/05/07"+
            "16,397,0,S,-77800,77800,0,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,397,0,S,-25800,25800,0,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,397,0,S,-5000,5000,0,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,397,0,S,-2400,0,2400,,/"+
            "88,REMARK=FLOAT ADJUSTMENT INCREASE"+
            "16,495,4805100000,0,0452600310FE,0452600310FE/"+
            "88,YOUR REF=12345678910A,PAID TO=DF-JPMORGAN CHASE GOVT PROC CHICAGO IL,B/O CUS"+
            "88,TOMER=BANKTWO STATE OF NEW YORK,ACCT PARTY=/99999999 BANKTWO STATE OF NEW"+
            "88,YORK,REMARK=DR AC 999999999 CR FNB AC BANKTWO CR 88888888 ATTN POSITION MGMT"+
            "88,,REC GFP=11062125"+
            "16,699,7200,0,,304186015/"+
            "88,REMARK=RESEARCH ADJ 2260-17SEP07  DEBIT FOR $72.00 FOR A LISTING ERROR IN YO"+
            "88,UR DEPOSIT OF 09/14/07. OUR CASE #2260-17SEP07. AN ITEM FOR $125,111.75, WAS"+
            "88, LISTED AS $125,183.75.    STORE #777777777.         DEPOSIT TOTAL  $7749148"+
            "88,.81. BUNDLE TOTAL  $125183.75."+
            "49,26579656197,30/"+
            "98,27080195042,3,114/"+
            "99,27080195042,1,116/";
	    
            log.debug("downloadedData", downloadedData);
            context.addDataChunk({dataChunk: downloadedData});
            context.returnAccountRequestsJSON({accountsJson: context.accountRequestsJSON});
        }

        return {
            getConfigurationIFrameUrl: getConfigurationIFrameUrl,
            getAccounts: getAccounts,
            getTransactionData: getTransactionData
        }
    });
