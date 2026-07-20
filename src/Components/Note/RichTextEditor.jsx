import { useRef, useEffect } from 'react'
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import { useEditor, EditorContent, useEditorState } from '@tiptap/react';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';

import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
  List,
  ListOrdered,
  Quote,
  Type,
  Highlighter,
  Undo,
  Redo
} from 'lucide-react';
import { useState } from 'react';


const MenuBar = ({ editor }) => {

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);


  const colorPickerRef = useRef(null);
  const highlightPickerRef = useRef(null);

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isUnderline: ctx.editor.isActive('underline') ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,

        // Lists 
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,

        isBlockquote: ctx.editor.isActive('blockquote') ?? false,

        // History
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false
      }
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
      }
      if (highlightPickerRef.current && !highlightPickerRef.current.contains(event.target)) {
        setShowHighlightPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!editor) {
    return null;
  }
  const colors = [
    '#000000', '#4B5563', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'
  ];

  const highlights = [
    '#FEF3C7', '#DBEAFE', '#D1FAE5', '#FCE7F3', '#F3E8FF', '#FFEDD5', 'transparent'
  ];

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-1.5 bg-gray-50 border-b border-gray-100 sticky top-0 z-10 rounded-t-2xl">

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        className={`p-1 rounded-md transition-all 
          ${editorState.isBold
            ? 'bg-white shadow-sm text-blue-600'
            : 'text-gray-400 hover:text-gray-600'}`}

      >
        <Bold className='size-4' />
      </button>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        className={`p-1 rounded-md transition-all 
          ${editorState.isItalic
            ? 'bg-white shadow-sm text-blue-600'
            : 'text-gray-400 hover:text-gray-600'}`}

      >
        <Italic className='size-4' />
      </button>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
        className={`p-1 rounded-md transition-all 
          ${editorState.isStrike
            ? 'bg-white shadow-sm text-blue-600'
            : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Strikethrough className='size-4' />
      </button>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editorState.canUnderline}
        className={`p-1 rounded-md transition-all 
          ${editorState.isUnderline
            ? 'bg-white shadow-sm text-blue-600'
            : 'text-gray-400 hover:text-gray-600'}`}
      >
        <Underline className='size-4' />
      </button>

      <div className="w-px h-4 bg-gray-200 mx-1" />


      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1 rounded-md transition-all 
          ${editorState.isBulletList
            ? 'bg-white shadow-sm text-blue-600'
            : 'text-gray-400 hover:text-gray-600'}`}
      >
        <List className='size-4' />
      </button>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1 rounded-md transition-all 
          ${editorState.isOrderedList
            ? 'bg-white shadow-sm text-blue-600'
            : 'text-gray-400 hover:text-gray-600'}`}
      >
        <ListOrdered className='size-4' />
      </button>

      <div className="w-px h-4 bg-gray-200 mx-1" />

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1 rounded-md transition-all 
          ${editorState.isBlockquote
            ? 'bg-white shadow-sm text-blue-600'
            : 'text-gray-400 hover:text-gray-600'}`}
        title='Quote'
      >
        <Quote className='size-4' />
      </button>

      <div className='relative' ref={colorPickerRef}>
        <button
          type='button'
          onClick={() => {
            setShowColorPicker(!showColorPicker);
            setShowHighlightPicker(false);
          }}
          className={`p-1 rounded-md transition-all flex items-center justify-center gap-1
            ${showColorPicker
              ? 'bg-white shadow-sm'
              : 'text-gray-400 hover:text-gray-600'} `
          }
          title='Text Color'
        >

          <Type className='size-4' />
          <div
            className='size-2 rounded-full border border-gray-200'
            style={{ backgroundColor: editor.getAttributes('textStyle').color || '#000' }}
          />
        </button>

        {showColorPicker && (
          <div className='absolute top-full left-1/2 -translate-x-1/2 mt-1 p-2 bg-white rounded-lg shadow-xl border border-gray-100 flex flex-wrap justify-center w-[140px] sm:w-auto sm:flex-nowrap gap-1 z-20'>
            {colors.map(color => (
              <button
                key={color}
                type='button'
                onClick={() => {
                  editor.chain().focus().setColor(color).run();
                  setShowColorPicker(false);
                }}
                className='size-5 rounded-md border border-gray-100 shadow-sm hover:scale-110 transition-transform'
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative" ref={highlightPickerRef}>
        <button
          type="button"
          onClick={() => {
            setShowHighlightPicker(!showHighlightPicker);
            setShowColorPicker(false);
          }}
          className={`p-1 rounded-md flex items-center gap-1 transition-all ${showHighlightPicker ? 'bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          title="Highlight"
        >
          <Highlighter className="w-4 h-4" />
          <div className="w-2 h-2 rounded-full border border-gray-200" style={{ backgroundColor: editor.getAttributes('highlight').color || 'transparent' }} />
        </button>
        {showHighlightPicker && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 p-2 bg-white rounded-lg shadow-xl border border-gray-100 flex flex-wrap justify-center w-[120px] sm:w-auto sm:flex-nowrap gap-1 z-20">
            {highlights.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => {
                  if (color === 'transparent') {
                    editor.chain().focus().unsetHighlight().run();
                  } else {
                    editor.chain().focus().setHighlight({ color }).run();
                  }
                  setShowHighlightPicker(false);
                }}
                className="w-5 h-5 rounded-md border border-gray-100 shadow-sm hover:scale-110 transition-transform"
                style={{ backgroundColor: color === 'transparent' ? '#fff' : color }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-1">

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo} className='p-1 rounded-md text-gray-400 hover:text-gray-900 disabled:opacity-30'>
          <Undo className='size-4' />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo} className='p-1 rounded-md text-gray-400 hover:text-gray-900 disabled:opacity-30'>
          <Redo className='size-4' />
        </button>
      </div>
    </div>


  )
}
// ------------------------------

const RichTextEditor = ({ value, onChange }) => {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true
        }
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),

    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor prose prose-sm focus:outline-none min-h-[150px] max-h-[200px] overflow-y-auto px-4 py-3 text-gray-700 leading-relaxed',
      },
    },
  });

  useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);
  return (
    <div className='w-full border border-gray-100 rounded-2xl focus-within:border-gray-200 focus-within:ring-2 focus-within:ring-blue-50 transition-all bg-white/50'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor
