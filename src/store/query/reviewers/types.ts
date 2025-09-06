export const reviewers_status= {
    registered: '신청',
    appointed: '내정',
    selected: '선정',
    completed: '체험완료',
    posted: '게시완료',
    cancelled: '취소',
} as const;

export const channel_list= {
    "naver_blog": '네이버 블로그',
    "instagram": '인스타그램'
} as const;

type ReviewersStatusKey = keyof typeof reviewers_status;
type ChannelListKey = keyof typeof channel_list;
export type { ReviewersStatusKey, ChannelListKey };
