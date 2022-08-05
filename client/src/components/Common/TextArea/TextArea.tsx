import React, {  useMemo, useState } from 'react'
import {  Path, PathValue, UseControllerProps, UseFormReturn } from 'react-hook-form';
import {  useTheme } from '@mui/material';
import { EditorState, ContentState} from 'draft-js'
import { convertToHTML } from 'draft-convert';
import { Editor, EditorProps } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import 'draft-js/dist/Draft.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useStyles } from './TextArea.styles';


interface TextAreaProps<T> {
   form: UseFormReturn<T>
   name: Path<T>
   rules?: UseControllerProps['rules']
   defaultValue?: PathValue<T, Path<T>>
   handleChange?: (value: string) => void
}



export function TextArea<T>({ form, name, rules, defaultValue, handleChange, ...props }: TextAreaProps<T> & EditorProps){
   const { setValue } = form
   const styles = useStyles()
   const theme = useTheme()

   const contentBlock = htmlToDraft(defaultValue as string);
   const [editorState, setEditorState] = useState(
      contentBlock ? 
         EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock.contentBlocks)) 
      : 
         () => EditorState.createEmpty()
      )


    const  [convertedContent, setConvertedContent] = useState<any>(null);

    const handleEditorChange = (state: any) => {
      setEditorState(state);
      convertContentToHTML();
    }

    const convertContentToHTML = () => {
      const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
      setConvertedContent(currentContentAsHTML);

    }

    const toolbarOptions = useMemo(() => ({
      
      options: [
         'inline',
         'list',
         'emoji'
      ],
      inline: {
         options: ['bold', 'italic']
      },
      list: {
         options: ['unordered', 'ordered', ],
       },
   }), [])


   return (
      <Editor 
         // toolbarClassName={theme.palette.mode === 'dark' ? styles.textAreaToobar : ''}
         wrapperClassName={theme.palette.mode === 'dark' ? styles.textAreaWrapper : ''}
         toolbar={toolbarOptions}
         initialContentState={convertedContent}
         editorState={editorState}
         onContentStateChange={() => {
            setValue(name, convertedContent as PathValue<T, Path<T>>)

         }}
         
         onEditorStateChange={handleEditorChange}
         {...props}
      />
   )
      
}