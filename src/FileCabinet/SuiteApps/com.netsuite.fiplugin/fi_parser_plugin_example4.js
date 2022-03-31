/**
 * @NApiVersion 2.0
 * @NScriptType bankStatementParserPlugin
 */
define(['N/file', 'N/log'],
    function(file, log)   {
        return {
            parseBankStatement: function (context) {

                var accountStatement = context.output.createNewAccountStatement();

                accountStatement.accountMappingKey = "CHECKING 0002153851";
                accountStatement.statementDate = "2017-04-17";

                log.debug({
                    title: 'Adding a new account statement',
                    details: accountStatement
                });

                var accountStatementId = context.output.addAccountStatement({"parsedAccountStatement":accountStatement});
                log.debug({
                    title: 'New account statement ID',
                    details: accountStatementId
                });

                var statementFile = context.input.file;
                log.debug("statementFile", statementFile);

                var statementLineIterator = statementFile.lines.iterator();
                statementLineIterator.next();
                statementLineIterator.each(function (line) {
                    log.debug({
                        title: 'Read a line from the statement',
                        details: line.value
                    });

                    var formatProfileId = context.input.formatProfileId;
                    log.debug({
                        title: 'Format Profile Id',
                        details: formatProfileId

                    });
                    var partsOfCSVLine = line.value.split(';');
                    var transaction = context.output.createNewTransaction();
                    transaction.accountStatementId = accountStatementId;
                    transaction.transactionMappingKey = partsOfCSVLine[0];
                    var rawDate = partsOfCSVLine[1];
                    transaction.date = rawDate;
                    Math.random()*100000;
                    transaction.customerName = partsOfCSVLine[2];
                    transaction.payee = partsOfCSVLine[2];
                    transaction.memo = partsOfCSVLine[3];
                    transaction.amount = partsOfCSVLine[4];
                    transaction.currency = "USD";
                    var transactionNumber = Math.random()*100000;
                    transactionNumber = Math.floor(transactionNumber);
                    transaction.transactionNumber = transactionNumber;
                    // transaction.payee = partsOfCSVLine[1];
                    // transaction.customerRawId = partsOfCSVLine[6];
                    // transaction.customerName = partsOfCSVLine[7];
                    // transaction.invoices = partsOfCSVLine[8].split(',');

                    log.debug({
                        title: 'Adding a new transaction',
                        details: transaction
                    });

                    try {
                        context.output.addTransaction({"parsedTransaction":transaction});
                        return true;
                    }catch(error){
                        log.debug("error", error);
                        return false;
                    }
                });

            },
            getStandardTransactionCodes: function (context) {
                var tranTypes = ["ACH", "CHECK", "CREDIT", "DEBIT", "DEPOSIT", "FEE", "INTEREST", "PAYMENT", "TRANSFER", "OTHER"];
                for (var i = 0; i < tranTypes.length; ++i)
                {
                    var standardTransactionCode = context.output.createNewStandardTransactionCode();
                    standardTransactionCode.tranCode = tranTypes[i];
                    standardTransactionCode.tranType = tranTypes[i];
                    context.output.addStandardTransactionCode({"standardTransactionCode":standardTransactionCode});

                    // log.debug({
                    //     title: 'Adding a new standard transaction code',
                    //     details: standardTransactionCode
                    // });
                }
            }
        }
    }
);