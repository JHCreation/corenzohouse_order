import { jwtDecode } from "jwt-decode";
import _ from "lodash";
import { writable } from "svelte/store";
import { authUrl } from "~/store/comm_store.svelte";
import { type LogTypes, type AuthToken, type PayloadType } from "~/store/query/_auth/types"

export const loginUrl= '/login';
export type LogAction = {
  setLog: (log) => void
}

export interface RefreshResponse {
    res: AuthToken | null
    log: LogTypes | null
}
const requestRefresh= async ():Promise<RefreshResponse>=> {
    const res= await fetch(`${authUrl}/refresh`, {
        method: 'POST',
        credentials: "include",
    })
    const data= await res.json()
    let responseLog:RefreshResponse['log']= null
    if( data?.access_token ) {
        const { access_token }= data;
        const payload:PayloadType= jwtDecode(access_token)
        // console.log(payload)
        responseLog= {
            access_token: access_token,
            userid: payload.userid,
            usertype: payload.usertype,
            permission: payload.permission,
            state: true,
            is_login: true,
        }
    }
    return { res: data, log: responseLog }
}

const isTokenValid= (token)=> {
    if( !token ) return false
    const decoded = jwtDecode<any>(token);
    const isValid= decoded?.exp > Date.now()/1000;
    return isValid
}

interface AuthorizationProps {
    log: LogTypes
    setLog: LogAction['setLog']
    valid?: (log:RefreshResponse['log'])=> void
    invalid?: (log:RefreshResponse['log'])=> void
    expired?: (log:RefreshResponse['log'])=> void
}
export const authorization= async ({log, setLog, valid, invalid, expired}:AuthorizationProps)=> {
    const isValid= isTokenValid(log?.access_token)
    if( isValid ) {
        valid && valid(log)
        return
    }
    if( !isValid ) {
        expired && expired(log)
        const { res, log: newLog }= await requestRefresh()
        console.log('refresh 되었음.', newLog)
        if( newLog?.access_token ) {
            setLog({ access_token:newLog?.access_token, state:newLog })
            valid && valid(newLog)
        }
        if( !newLog?.access_token ) {
            invalid && invalid(newLog)
            handleLogout(setLog)
            throw new Error("Invalid or expired token(토큰인증 실패)"); 
        }
    }
}

export const handleLogout= (setLog)=> {
    console.log('로그아웃시도!')
    fetch(`${authUrl}/logout`, {
        method: 'POST', 
        credentials: "include"
    })
    setLog(null)
}

export const log= writable<LogTypes>({
    access_token: '',
    userid: '',
    usertype: '',
    permission: '',
    state: null,
    is_login: false,
})

const defaultLog:LogTypes= {
    access_token: '',
    userid: '',
    usertype: '',
    permission: '',
    state: false,
    is_login: false
}

export const setLog= (param)=> {
    if( !param ){
        log.set(defaultLog)
    }
    if( param ){
        const { access_token, state }= param

        const payload:PayloadType= jwtDecode(access_token)
        const logState= _.merge(payload, {access_token, ...state})
        console.log(logState)
        log.set(logState)
    }
    
}