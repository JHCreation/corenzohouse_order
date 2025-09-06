import { channel_list } from "~/store/query/reviewers/types"
import { attachJosa, removeParentheticalText, stringToParse } from "~/utils/basic"

const channelList = (channels) => {
    const channel = stringToParse(channels)
    console.log(channel)
    const names = channel.map(channel => channel_list[channel]).join(', ')
    return names
}
export const makeMsgBasic= (param)=> {
return `${param.name}님, 안녕하세요.
와인바 '시크릿키친' 입니다. 저희 서비스에 관심 가지고 신청해 주셔서 감사드립니다!
이번 리뷰어(체험단)에 선정되셨습니다.

저희 매장에 방문해 주셔서 준비된 와인과 푸드를 체험해 주시고 정성스런 리뷰를 작성 부탁드립니다.
금,토,익일 휴일,월(휴무) 제외한 영업시간내 인원 제한 없이 가능합니다.

네이버 예약으로 일정을 확정하시고(메모에 "리뷰어" 기재), 변동사항이 있을시 별도 연락을 드려 조정하도록 하겠습니다. 더 궁금하신 사항은 언제든 문의 주시기 바랍니다.
감사합니다.

[네이버] https://naver.me/xSFa3YoP`
}

export const makeMsgCustom= (param)=> {
return `${param.name}님, 체험단에 선정되셨습니다.
안녕하세요. 와인바 '시크릿키친' 입니다. 저희 서비스에 관심 가지고 신청해 주셔서 감사드립니다!
이번 리뷰어(체험단)에 선정되셨습니다.

저희 매장에 방문해 주셔서 ${param.service}${attachJosa(removeParentheticalText(param.service), ["을", "를"])} 체험해 주시고 정성스런 리뷰를 작성 부탁드립니다. 제안주신 채널 [${channelList(param.channel)}] 외에 인스타그램, 블로그, 네이버 영수증 리뷰, 카카오맵 리뷰등 다양한 채널에 작성해 주시면 더욱 감사하겠습니다. (네이버 영수증 리뷰, 카카오맵 리뷰는 꼭 부탁드립니다!)
일정은 한달 이내로 체험을 부탁드리며, 금,토,익일 휴일,월(휴무) 제외한 영업시간내 인원 제한 없이 가능합니다.

네이버 예약으로 일정을 확정하시고(메모에 "리뷰어" 기재), 변동사항이 있을시 별도 연락을 드려 조정하도록 하겠습니다. 더 궁금하신 사항은 언제든 문의 주시기 바랍니다.
감사합니다.

[웹사이트(메뉴)] https://www.secret-kitchen.net
[네이버] https://naver.me/xSFa3YoP`
}