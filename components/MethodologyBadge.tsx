import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface MethodologyBadgeProps {
    type: "verified" | "independent" | "visited";
    label?: string;
}

export function MethodologyBadge({ type, label }: MethodologyBadgeProps) {
    const configs = {
        verified: {
            text: "Verified Data",
            color: "bg-green-100 text-green-800 border-green-200",
            tooltip: "Data personally verified by our team through direct school contact."
        },
        independent: {
            text: "100% Independent",
            color: "bg-blue-100 text-blue-800 border-blue-200",
            tooltip: "We accept no payment or commission from this school."
        },
        visited: {
            text: "Site Visited",
            color: "bg-purple-100 text-purple-800 border-purple-200",
            tooltip: "Our team has physically visited and inspected this campus."
        }
    };

    const config = configs[type];
    const displayText = label || config.text;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Badge variant="outline" className={`${config.color} cursor-help gap-1`}>
                        {displayText}
                        <Info className="h-3 w-3 opacity-60" />
                    </Badge>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="max-w-xs text-xs">{config.tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
