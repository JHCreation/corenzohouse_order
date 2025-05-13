export const makeMsg= (param)=> {
return `${param.name}님, 안녕하세요.
와인바 '시크릿키친' 입니다. 저희 서비스에 관심 가지고 신청해 주셔서 감사드립니다!
이번 리뷰어(체험단)에 선정되셨습니다.

저희 매장에 방문해 주셔서 준비된 와인과 푸드를 체험해 주시고 정성스런 리뷰를 작성 부탁드립니다.
금,토,익일 휴일,월(휴무) 제외한 영업시간내 인원 제한 없이 가능합니다.

네이버 예약으로 일정을 확정하시고(메모에 "리뷰어" 기재), 변동사항이 있을시 별도 연락을 드려 조정하도록 하겠습니다. 더 궁금하신 사항은 언제든 문의 주시기 바랍니다.
감사합니다.

[네이버] https://naver.me/xSFa3YoP`
}


export const sendSMS= async (checkedList, setLoading)=> {
    console.log(checkedList[0].phone)
    // return
    
    const params= checkedList.map((checked,i)=> ({
        "type": "LMS",
        "countryCode": "82",
        "from": "01028268268",
        "subject": "string",
        "contentType": "COMM",
        "content": "test.",
        "messages": [
            {
            "subject": "체험단 선정",
            "content": makeMsg(checked),
            "to": checked.phone
            }
        ]
    }))
    const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/reviewers-confirm`, {
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