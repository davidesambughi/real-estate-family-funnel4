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
            color: "bg-trust-light text-trust border-trust/30",
            tooltip: "Data personally verified by our team through direct school contact."
        },
        independent: {
            text: "100% Independent",
            color: "bg-brand-light text-brand border-brand/30",
            tooltip: "We accept no payment or commission from this school."
        },
        visited: {
            text: "Site Visited",
            color: "bg-surface-subtle text-ink-secondary border-border",
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
