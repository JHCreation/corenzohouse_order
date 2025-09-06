import { MessageCircleHeart, MessageSquareMore, ScrollTextIcon } from "@lucide/svelte";
import AudioWaveformIcon from "@lucide/svelte/icons/audio-waveform";
import BookOpenIcon from "@lucide/svelte/icons/book-open";
import BotIcon from "@lucide/svelte/icons/bot";
import ChartPieIcon from "@lucide/svelte/icons/chart-pie";
import CommandIcon from "@lucide/svelte/icons/command";
import FrameIcon from "@lucide/svelte/icons/frame";
import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
import MapIcon from "@lucide/svelte/icons/map";
import Settings2Icon from "@lucide/svelte/icons/settings-2";
import SquareTerminalIcon from "@lucide/svelte/icons/square-terminal";

export const menuData = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    userMenu: [
        // {
        //     title: "전체(리스트)",
        //     url: "/orders?type=list",
        //     icon: GalleryVerticalEndIcon
        // },
    ],
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEndIcon,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveformIcon,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: CommandIcon,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "주문",
            url: "/orders",
            icon: ScrollTextIcon,
            isActive: true,
            items: [
                {
                    title: "전체(리스트)",
                    url: `/orders`,
                    searchParams: { type: 'list'}
                },
                {
                    title: "테이블",
                    url: `/orders`,
                    searchParams: { type: 'table'}
                },
            ],
        },
        {
            title: "리뷰어",
            url: "/reviewers",
            icon: MessageCircleHeart,
            items: [
                {
                    title: "신청 리스트",
                    url: "/reviewers",
                },
            ],
            permission: ['super']
        },
        // {
        //     title: "Documentation",
        //     url: "#",
        //     icon: BookOpenIcon,
        //     items: [
        //         {
        //             title: "Introduction",
        //             url: "#",
        //         },
        //         {
        //             title: "Get Started",
        //             url: "#",
        //         },
        //         {
        //             title: "Tutorials",
        //             url: "#",
        //         },
        //         {
        //             title: "Changelog",
        //             url: "#",
        //         },
        //     ],
        // },
        // {
        //     title: "Settings",
        //     url: "#",
        //     icon: Settings2Icon,
        //     items: [
        //         {
        //             title: "General",
        //             url: "#",
        //         },
        //         {
        //             title: "Team",
        //             url: "#",
        //         },
        //         {
        //             title: "Billing",
        //             url: "#",
        //         },
        //         {
        //             title: "Limits",
        //             url: "#",
        //         },
        //     ],
        // },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: FrameIcon,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: ChartPieIcon,
        },
        {
            name: "Travel",
            url: "#",
            icon: MapIcon,
        },
    ],
};