/**
 * @file Constants.js
 * @author Micah Chen
 * @date Last Modified: 5/20/2024
 * 
 * Description: This file contains the keys for accessing and storing tokens in local storage or cookies.
 * 
 * - `ACCESS_TOKEN`: This key is used to store the access token, which is used to authenticate and authorize users for API calls.
 * - `REFRESH_TOKEN`: This key is used to store the refresh token, which is used to obtain a new access token when the current one expires.
 */
export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';