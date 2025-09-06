export interface AuthToken {
  access_token: string
  token_type: string
  userid: string
  refresh_token: string
}

export interface PayloadType {
  userid: string
  usertype: string
  permission: string
}

export interface LogTypes extends PayloadType {
  access_token: string
  state: boolean | null | 'fail';
  is_login: boolean
} 