"use client";

import React, { useMemo, useState } from "react";
import DOMPurify from "dompurify";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableAboutProps {
    html: string;
}

export const ExpandableAbout = ({
    html,
}: ExpandableAboutProps) => {
    const [expanded, setExpanded] = useState(false);

    const sanitizedHtml = useMemo(() => {
        return DOMPurify.sanitize(html || "");
    }, [html]);

    return (
        <div>
            <div
                className={`
                    prose prose-sm md:prose-base
                    max-w-none
                    prose-p:text-gray-600
                    prose-p:leading-8
                    prose-headings:text-secondary
                    transition-all
                    duration-300
                    overflow-hidden
                    relative
                    ${!expanded ? "line-clamp-8" : ""}
                `}
                dangerouslySetInnerHTML={{
                    __html: sanitizedHtml,
                }}
            />

            {/* FADE EFFECT */}
            {!expanded && (
                <div className="h-16 -mt-16 bg-gradient-to-t from-white to-transparent relative z-10 pointer-events-none" />
            )}

            <button
                onClick={() => setExpanded(!expanded)}
                className="
                    mt-4
                    inline-flex
                    items-center
                    gap-2
                    text-primary
                    font-semibold
                    hover:text-secondary
                    transition-colors
                "
            >
                {expanded ? (
                    <>
                        See Less
                        <ChevronUp size={18} />
                    </>
                ) : (
                    <>
                        See More
                        <ChevronDown size={18} />
                    </>
                )}
            </button>
        </div>
    );
};