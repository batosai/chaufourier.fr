import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Delimiter from '@editorjs/delimiter'
import NestedList from '@editorjs/nested-list'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import Underline from '@editorjs/underline'
import Hyperlink from 'editorjs-hyperlink'

import DragDrop from 'editorjs-drag-drop'
import Undo from 'editorjs-undo'

import Alert from '../editorjs/alert'
import ImagePicker from '../editorjs/imagePicker'
import CodeTool from '../editorjs/code'

// editor.js

// todo preview @editorjs/link

const id = 'editorjs'

export default () => ({
  id,
  editor: null,

  init() {
    this.$refs.data.style.display = 'none'
    this.editor = new EditorJS({
      holderId: this.id,
      // autofocus: true,
      placeholder: 'Type text or paste a link',
      data: this.$refs.data.value ? JSON.parse(this.$refs.data.value) : {},
      onReady: () => {
        new Undo({
          editor: this.editor,
        })
        new DragDrop(this.editor)
      },
      onChange: (api, event) => {
        this.editor
          .save()
          .then((outputData) => {
            this.$refs.data.value = JSON.stringify(outputData)
          })
          .catch((error) => {
            console.log('Saving failed: ', error)
          })
      },
      tools: {
        image: ImagePicker,
        header: {
          class: Header,
          shortcut: 'CMD+SHIFT+H',
          inlineToolbar: true,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4],
            defaultLevel: 3,
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+O',
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: "Quote's author",
          },
        },
        alert: {
          class: Alert,
          shortcut: 'CMD+SHIFT+W',
        },
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered',
          },
        },
        table: {
          class: Table,
          inlineToolbar: true,
        },
        Marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+C',
        },
        embed: Embed,
        underline: Underline,
        delimiter: Delimiter,
        code: CodeTool,
        hyperlink: {
          class: Hyperlink,
          config: {
            shortcut: 'CMD+L',
            target: '_blank',
            rel: 'nofollow',
            availableTargets: ['_blank', '_self'],
            // availableRels: ['author', 'noreferrer'],
            validate: true,
          },
        },
      },
    })
  },
})
