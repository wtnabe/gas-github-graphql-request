# GitHubGraphQLRequest for Google Apps Script

GitHubGraphQLRequest Library for Google Apps Script Project ( **Sheets Container-bound** script )

## Prerequisite

Sheets Container-bound script Project.

## How to Use

### 0. Prepare Sheet

This library is for Spreadsheet Container-bound Script as it adds menus to Spreadsheet.

### 1. Add Library code

Choose one of them please.

 1. add Project ID for your project as Library `14hP6p8PPzAy_yclpF-kXDSIpylKEDx-iJvMJtd1DSJJzJVV8miYzv_fS`
 2. Copy and Paste this code

I would recommend #2 for speed of execution, but #1 is also a good option for administrative costs.

### 2. Write setup code

open Script Editor

```javascript
function onOpen () {
  GitHubGraphQLRequest.registerGhgraph()
}
```

### 3. Prepare Your Token

Set your GitHub Access Token into UserProperty with menu `[ GitHub Token ]`

### 4. Write Your Google Apps Script Code

example

```javascript
/**
 * @returns {object}
 * @customfunction
 */
function request () {
  try {
    const body = JSON.parse(
      GitHubGraphQLRequest.request(query)
        .getContentText()
    )
    return transform(body...nodes)
  } catch (e) {
    console.error(e)
    return [['Something', 'wrong']]
  }
}
```

`transform()` is a function that transforms a nested JavaScript Object into an Array of Arrays ( e.g. [ [], [], ...] ) for Spreadsheet.

### 5. call function from Spreadsheet

```javascript
=request()
```
