import { NodeAction, NodeType } from "@/generated/prisma/enums";
import { GlobeIcon, LucideIcon, MouseIcon, WebhookIcon } from "lucide-react";
import { object } from "zod";

type tnodeUiList = Record<NodeType, {
    name:string ,
    description:string,
    icon:LucideIcon|string,
    action:NodeAction
}>
export const nodeUiList:tnodeUiList = {
    MANUAL_TRIGGER:{
        name:"manual trigger",
        description:"trigger your workflow manually",
        icon:MouseIcon,
        action:"TRIGGER"
    },
    HTTP_REQUEST:{
        name:"http request",
        description:"send a http request with custom body and header",
        icon:GlobeIcon,
        action:"EXECUTION"
    },
    WEBHOOK:{
        name:"webhook trigger",
        description:"trigger your workflow via webhook",
        icon:WebhookIcon,
        action:"TRIGGER"
    },
    SEND_DISCORD_MESSAGE:{
        name:"send discord message",
        description:"send a message in discord",
        icon:'https://cdn.simpleicons.org/discord',
        action:"EXECUTION"
    },
    TELEGRAM_BOT:{
        name:"telegram bot message",
        description:"send a message via telegram bot",
        icon:'https://cdn.simpleicons.org/telegram',
        action:"EXECUTION"
    }
}
export const NodeListUiArray = Object.entries(nodeUiList).map((s)=>{
    return {
        type:s[0] as NodeType,
        ...s[1]
    }
})