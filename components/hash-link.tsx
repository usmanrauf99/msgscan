import React, { useState } from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CopyIcon } from "lucide-react";
import { shortenHash } from "@/utils/hash";
import { cn } from "@/lib/utils";

interface HashLinkProps {
  hash: string;
  type: "address" | "transaction";
  color?: "primary" | "foreground" | "regular-foreground";
  sliceLength?: number;
}

export function HashLink({
  hash,
  type,
  color = "primary",
  sliceLength,
}: HashLinkProps) {
  const [copied, setCopied] = useState(false);
  const linkHref =
    type === "address" ? `/address/${hash}` : `/transactions/${hash}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Link
            href={linkHref}
            className={cn(
              color === "regular-foreground" && "text-card-foreground",
              color === "primary" &&
                "text-primary hover:underline hover:text-primary",
              color === "foreground" &&
                "text-card-foreground hover:underline hover:text-primary"
            )}
          >
            <span>{shortenHash(hash, type, sliceLength)}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="flex items-center space-x-2 h-8">
          {copied ? (
            <span>Copied!</span>
          ) : (
            <>
              <span>{hash}</span>
              <div
                className="h-4 w-4 justify-center items-center flex rounded-sm cursor-pointer group"
                onClick={handleCopy}
              >
                <CopyIcon
                  strokeWidth={1.5}
                  className="h-3 w-3 text-muted-foreground group-hover:text-card-foreground transition-colors duration-150"
                />
              </div>
            </>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
