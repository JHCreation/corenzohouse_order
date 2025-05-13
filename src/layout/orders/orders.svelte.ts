import dayjs from "dayjs"
import queryString from "query-string"
import { readable, writable } from "svelte/store"

export const orderStatusKeys = {
    사용중: 'use',
    결제완료: 'paid'
} as const

export const orderGroupStatusKeys = {
    'use': '사용중',
    'paid': '결제완료'
} as const
// export type OrderGroupStatus= typeof orderStatusKeys[keyof typeof orderStatusKeys]
export type OrderGroupStatus= keyof typeof orderGroupStatusKeys



export const deleteOrder= async ({ order_id })=> {
    const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/orders`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order_id
        })
    })
    const result= await res.json()
    return result
}


export const deleteOrderItem= async ({ key })=> {
    const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/orders-item`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            key
        })
    })
    const result= await res.json()
    console.log(result)
    return result
}

export const orderList= writable([])
export const orderGroup= writable(null)
export const getOrders= async ()=> {
    function getSaleDate() {
        const now= dayjs().format('HH:mm')
        const overTodayTime= now <= '06:00' && now >= '00:00'
        const saleDate= overTodayTime ? dayjs().subtract(1, 'day') : dayjs()
        // const saleDate= dayjs().subtract(1, 'day') 
        return saleDate
    }
    const param:{ status?: OrderGroupStatus, sale_date: string }= {
            // tid: ['1', '2', 4],
            // status: 'use' ,
    sale_date: getSaleDate().format('YYYY-MM-DD')
        }
    const qry= queryString.stringify(param)
        
    const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/order-groups?${qry}`)
    const result= await res.json()

    const group= result?.group
    const list= result?.list && result?.list.map(item=> {
        let content
        try {
            content= JSON.parse(item.content)
        } catch (error) {
            console.log(error)
            content= item.content
        }
        return {
            ...item, 
            content
        }
    })
    orderGroup.set(group)
    orderList.set(list)

}