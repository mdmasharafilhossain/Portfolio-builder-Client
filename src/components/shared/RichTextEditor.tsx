/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import './quill-custom.css';
import { RichTextEditorProps } from '@/types';

// ✅ Load ReactQuill only on the client
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write something amazing...',
  height = 400,
  error,
}) => {
  const quillRef = useRef<any>(null);

  // Custom image handler
  const imageHandler = () => {
  if (typeof document === 'undefined') return;

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.click();

  input.onchange = async () => {
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const quill = quillRef.current?.__quill || quillRef.current?.getEditor?.();
        if (e.target?.result && quill) {
          const range = quill.getSelection(true);
          quill.insertEmbed(range?.index || 0, 'image', e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };
};


  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: { image: imageHandler }
    },
    clipboard: { matchVisual: false }
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ];

  return (
    <div className="w-full">
      <div
        className={`border border-gray-300 dark:border-dark-600 rounded-lg overflow-hidden ${
          error ? 'border-red-500 dark:border-red-500' : ''
        }`}
      >
        
        <ReactQuill
  value={value}
  onChange={onChange}
  modules={modules}
  formats={formats}
  placeholder={placeholder}
  style={{ height: `${height}px` }}
  theme="snow"
  onChangeSelection={() => {
    // Ensure quillRef is correctly assigned
    if (!quillRef.current) {
      const editor = document.querySelector('.ql-editor');
      if (editor) quillRef.current = editor;
    }
  }}
/>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default RichTextEditor;
