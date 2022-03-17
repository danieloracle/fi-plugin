# Status
## Issues / Enhancement list:
- Issue: 
    - 592360 FI Connectivity Plugin - automated daily import schedule to be customizable
    https://nlcorp.app.netsuite.com/app/crm/support/issuedb/issue.nl?id=86150277
- Description: 
    - FI Connectivity Plugin - automated daily import schedule to be customizable
- Notes: 
    - Duplicated Issue: 
        - 630249 Please allow users to configure the time and frequency of a FI plugin's execution
        https://nlcorp.app.netsuite.com/app/crm/support/issuedb/issue.nl?id=107659533
    - Case list: ...
    - PM response about Enhancement: ...

- Case:
    - Bank Feed - Match Bank Data > Update Imported Transaction Button > “A bank data import was not initiated because NetSuite can only import data from a financial institution every 60 minutes. Your data will be imported at the next scheduled import 7018799 Euroz Hartleys Limited
    https://nlcorp.app.netsuite.com/app/crm/support/supportcase.nl?id=110588307&whence=
- Description:
    - 7018799 Euroz Hartleys Limited
    Purpose: Customer would like to trigger bank import for their connection - Westpac Business but receives error upon rebuilding. As per recent update in Salt Edge due to changes in Bank Interface, they now require daily refresh/rebuild connection to trigger fetching of transactions.
    Impact: Since it is now required to rebuild connection to trigger fetching transactions in Salt Edge for connections in Westpac Australia and users are having issues with rebuilding connection, they are not able to proceed and trigger the import Users are not able to fully utilize the features of SuiteApp because of the error and would have to manually import which defeats purpose of Bank Feeds
    RN July 13,2021




## 9W feedback 20220316:
- A scheduling mechanism would be nice since we’re controlling the data but can’t control when the automations are being run
    Response: Issue 592360
- Likewise, it’s annoying that we can’t retry data within the 60 min window. This isn’t often needed but when trying to test issues that don’t actually resolve in an “error” this makes it hard to retry things. 
    - Response: *NEED TO CREATE ISSUE/ENHANCEMENT!!!*
    - Other Cases: 
        - Case:
            - 4288582 Bank Feed - Match Bank Data > Update Imported Transaction Button > “A bank data import was not initiated because NetSuite can only import data from a financial institution every 60 minutes. Your data will be imported at the next scheduled import 7018799 Euroz Hartleys Limited
            https://nlcorp.app.netsuite.com/app/crm/support/supportcase.nl?id=110588307&whence=
        - Issue:
            - *No Enhancement attached*
        - Description
            - 7018799 Euroz Hartleys Limited
            Purpose: Customer would like to trigger bank import for their connection - Westpac Business but receives error upon rebuilding. As per recent update in Salt Edge due to changes in Bank Interface, they now require daily refresh/rebuild connection to trigger fetching of transactions.
            Impact: Since it is now required to rebuild connection to trigger fetching transactions in Salt Edge for connections in Westpac Australia and users are having issues with rebuilding connection, they are not able to proceed and trigger the import Users are not able to fully utilize the features of SuiteApp because of the error and would have to manually import which defeats purpose of Bank Feeds
            RN July 13,2021


- Removing the transaction detail for each import is really a bad UX change. This feedback has been echoed by just about every client that we have using the bank feeds features (including Netsuite’s bank feed). It makes it really hard to understand what came in and debug if you think you’re seeing duplicates or things like that.
    - *Response: Need to make a call to better understand*


## FISPAN - JOANNE
We haven't seen any concerns from clients on the timing of the execution. All of our end users are based in North America (including the east coast) and it has not been problematic -- it's usually completed before they try reconciliation. However, end users have had a lot of difficulty with the mandatory 60 day download of transactions. For an account that they recently uploaded transactions for, this would be a deal breaker and result in the client not onboarding for these accounts. The "Exclude" functionality to remove duplicates is not effective at scale. Suggestion: There should be a way to prevent the 60 day download at onboarding, such as by changing the 60 days to only 1 via a checkbox in the format profile before saving.

We don't rely on the BAI2 parser, but instead instruct users to use the CSV parser and pass CSV data instead. We instruct clients to create "one format profile, per bank account" and fully configure every profile. It is an onboarding annoyance (especially if end users have a large number of bank accounts) but not a deal breaker. If NetSuite has any guidance on how to make the CSV parser work for multiple accounts under one profile, we would appreciate this!

## FISPAN - Before Joanne
- 592360 FI Connectivity Plugin - automated daily import schedule to be customizable


