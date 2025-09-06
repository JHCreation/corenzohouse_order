import type { ReviewersStatusKey } from "~/store/query/reviewers/types"
import { makeMsgBasic, makeMsgCustom } from "./sms_messasges"

export const sendSMS= async (checkedList, setLoading)=> {
    
    const params= {
        sms:[],
        data: []
    } as any
    checkedList.map((checked,i)=> {
        params.sms.push({
            "type": "LMS",
            "countryCode": "82",
            "from": "01028268268",
            "subject": "string",
            "contentType": "COMM",
            "content": "체험단 선정",
            "messages": [
                {
                "subject": "체험단 선정",
                "content": makeMsgCustom(checked),
                "to": checked.phone
                }
            ]
        })
        params.data.push({
            id: checked.id,
            service: checked.service,
            status: 'selected' as ReviewersStatusKey,
        })
    })
    // console.log(params.sms)
    // return

    // const param= {
    //     sms: smsParam,
    //     data: { service: }
    // }
    const res= await fetch(`${import.meta.env.VITE_API_IP}/reviewers-confirm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    const result= await res.json()
    setLoading(false)
    console.log(res, result)

}


export const updatesQuery= async (checkedList, setLoading) => {
    const params:any= []
    checkedList.map((checked,i)=> {
        
        params.push({
            id: checked.id,
            service: checked.service,
            status: 'appointed' as ReviewersStatusKey,
        })
    })
    
    const res= await fetch(`${import.meta.env.VITE_API_IP}/reviewers-updates`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    const result= await res.json()
    setLoading(false)
    console.log(res, result)
}