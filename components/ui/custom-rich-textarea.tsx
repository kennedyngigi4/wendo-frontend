"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

interface Props {
    value?: string
    onChange?: (value: string, textLength: number) => void
    placeholder?: string
    error?: string
    className?: string
}

export function CustomRichTextarea({
    value = "",
    onChange,
    placeholder = "Write something...",
    error,
    className,
}: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Placeholder.configure({
                placeholder,
                emptyEditorClass: "is-editor-empty",
            })
        ],
        content: "",
        immediatelyRender: false,
        onUpdate({ editor }) {
            const html = editor.getHTML()
            const text = editor.getText().trim()

            onChange?.(html, text.length);
        },
    })


    useEffect(() => {
        if (!editor) return;

        const current = editor.getHTML();

        // prevent infinite loop
        if (value !== current) {
            editor.commands.setContent(value || "", false);
        }
    }, [value, editor]);

    


    return (

        <div>
            <div className="border rounded-md focus-within:ring-2 focus-within:ring-primary">

                {/* Toolbar */}
                <div className="flex gap-2 border-b p-2">
                    <select
                        onChange={(e) => {
                            const value = e.target.value

                            if (value === "p") {
                                editor.chain().focus().setParagraph().run()
                            } else {
                                editor.chain().focus().toggleHeading({ level: Number(value) }).run()
                            }
                        }}
                        className="border rounded px-2 py-1 text-sm"
                    >
                        <option value="p">Paragraph</option>
                        <option value="1">Heading 1</option>
                        <option value="2">Heading 2</option>
                        <option value="3">Heading 3</option>
                        <option value="4">Heading 4</option>
                        <option value="5">Heading 5</option>
                        <option value="6">Heading 6</option>
                    </select>

                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        Bold
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    >
                        Italic
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    >
                        Underline
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    >
                        Bullet
                    </Button>

                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    >
                        Numbered
                    </Button>
                </div>

                {/* Editor */}
                <EditorContent
                    editor={editor}
                    className="min-h-[150px] w-full p-3 focus:outline-none [&_.ProseMirror]:min-h-[150px]"
                />
            </div>
            {error && (
                <p className="text-sm text-destructive mt-2">{error}</p>
            )}
        </div>
    )
}