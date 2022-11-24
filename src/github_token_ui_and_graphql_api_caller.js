/* global SpreadsheetApp, UrlFetchApp, PropertiesService */

/**
 * メニューの追加などの初期化処理
 *
 * @returns {void}
 */
function registerGhgraph () { // eslint-disable-line no-unused-vars
  createAccessTokenMenu()
}

//
// UI
//

/**
 * メニューを生成
 *
 * @returns {void}
 */
function createAccessTokenMenu () {
  SpreadsheetApp.getUi()
    .createMenu('GitHub token')
    .addItem('show token', 'GitHubGraphQLRequest.dialogShowingToken')
    .addItem('input token', 'GitHubGraphQLRequest.dialogEdittingToken')
    .addItem('delete token', 'GitHubGraphQLRequest.dialogConfirmDeletingToken')
    .addToUi()
}

/**
 * token を表示するダイアログを作成
 *
 * @returns {void}
 */
function dialogShowingToken () { // eslint-disable-line no-unused-vars
  const token = accessToken()

  const ui = SpreadsheetApp.getUi()
  ui.alert(`acess token : ${token || ''}`, ui.ButtonSet.OK)
}

/**
 * token を入力するダイアログを作成し、入力を受け付ける
 */
function dialogEdittingToken () { // eslint-disable-line no-unused-vars
  const token = accessToken()

  const ui = SpreadsheetApp.getUi()
  const response = ui.prompt(
    'Input your access token',
    token || '',
    ui.ButtonSet.OK_CANCEL
  )

  if (response.getSelectedButton() === ui.Button.OK) {
    setAccessToken(response.getResponseText())

    dialogConfirmReloading()
  }
}

/**
 * Spreadsheet を reload するように促すダイアログを作成
 */
function dialogConfirmReloading () {
  const ui = SpreadsheetApp.getUi()
  ui.alert('Please reload sheet', ui.ButtonSet.OK)
}

/**
 * token の削除を確認するダイアログを作成
 */
function dialogConfirmDeletingToken () { // eslint-disable-line no-unused-vars
  const ui = SpreadsheetApp.getUi()
  const buttonResponse = ui.alert('Delete token ?', ui.ButtonSet.OK_CANCEL)

  if (buttonResponse === ui.Button.OK) {
    deleteAccessToken()
  }
}

//
// API request
//

/**
 * @param {string} query
 * @param {string} url
 * @param {string} token
 * @returns {HTTPResponse}
 */
function request (query, url = endpoint(), token = accessToken()) { // eslint-disable-line no-unused-vars
  return UrlFetchApp.fetch(
    url,
    {
      method: 'POST',
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: JSON.stringify({ query })
    }
  )
}

//
// around GitHub and GitHub token
//

/**
 * @returns {string}
 */
function endpoint () {
  return 'https://api.github.com/graphql'
}

/**
 * @returns {string}
 */
function accessToken () {
  return PropertiesService.getUserProperties().getProperty('github_access_token')
}

/**
 * @param {string} token
 * @returns {object}
 */
function setAccessToken (token) {
  return PropertiesService.getUserProperties().setProperty('github_access_token', token)
}

/**
 * @retutns {Property}
 */
function deleteAccessToken () {
  return PropertiesService.getUserProperties().deleteProperty('github_access_token')
}
