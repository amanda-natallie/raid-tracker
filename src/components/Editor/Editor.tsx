/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate, ReactEditor } from 'slate-react';
import { Editor, Transforms, createEditor, Descendant, Element as SlateElement, BaseEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Button, Icon, Toolbar } from './components';
import { colors } from '@vallorisolutions/foa-design-system';

type CustomElement = {
    type: 'paragraph' | 'list-item' | 'heading-one' | 'heading-two' | 'block-quote' | 'bulleted-list' | 'numbered-list';
    children: CustomText[];
};

type CustomText = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    code?: boolean;
};

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}
const HOTKEYS: any = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
};

const LIST_TYPES: any = ['numbered-list', 'bulleted-list'];

interface RichTextEditorProps {
    value: any;
    setValue: (value: any) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, setValue }): JSX.Element => {
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor: any = useMemo(() => withHistory(withReact(createEditor())), []);

    return (
        <>
            <Slate editor={editor} value={value} onChange={(value): any => setValue(value)}>
                <Toolbar>
                    <MarkButton format="bold" icon="format_bold" />
                    <MarkButton format="italic" icon="format_italic" />
                    <MarkButton format="underline" icon="format_underlined" />
                    <MarkButton format="code" icon="code" />
                    <BlockButton format="heading-one" icon="looks_one" />
                    <BlockButton format="heading-two" icon="looks_two" />
                    <BlockButton format="block-quote" icon="format_quote" />
                    <BlockButton format="numbered-list" icon="format_list_numbered" />
                    <BlockButton format="bulleted-list" icon="format_list_bulleted" />
                </Toolbar>
                <Editable
                    style={{
                        minHeight: '200px',
                        padding: '2rem',
                        boxSizing: 'border-box',
                        backgroundColor: colors.background.paper,
                    }}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Digite sua mensagem"
                    spellCheck
                    onKeyDown={(event): any => {
                        for (const hotkey in HOTKEYS) {
                            if (isHotkey(hotkey, event as any)) {
                                event.preventDefault();
                                const mark = HOTKEYS[hotkey];
                                toggleMark(editor, mark);
                            }
                        }
                    }}
                />
            </Slate>
        </>
    );
};

const toggleBlock = (editor: any, format: any): any => {
    const isActive: any = isBlockActive(editor, format);
    const isList: any = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
        split: true,
    });
    const newProperties: Partial<SlateElement> = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor: BaseEditor & ReactEditor, format: string): any => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor: any, format: any): any => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    });

    return !!match;
};

const isMarkActive = (editor: any, format: any): any => {
    const marks: any = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }: any): any => {
    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>;
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>;
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>;
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>;
        case 'list-item':
            return <li {...attributes}>{children}</li>;
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>;
        default:
            return <p {...attributes}>{children}</p>;
    }
};

const Leaf = ({ attributes, children, leaf }: any): any => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }: any): any => {
    const editor = useSlate();
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={(event: any): any => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    );
};

const MarkButton = ({ format, icon }: any): any => {
    const editor = useSlate();
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={(event: any): any => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    );
};

export const richTextInitialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: ' ' }],
    },
];

export default RichTextEditor;
