import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Warning from '@editorjs/warning'
import Delimiter from '@editorjs/delimiter'
import NestedList from '@editorjs/nested-list'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import Underline from '@editorjs/underline'
import CodeBox from '@bomdi/codebox'
import Hyperlink from 'editorjs-hyperlink'

import DragDrop from 'editorjs-drag-drop'
import Undo from 'editorjs-undo'

// editor.js

const editor = new EditorJS({
  // autofocus: true,
  placeholder: 'Type text or paste a link',
  data: JSON.parse(document.querySelector('[name="body"]').value),
  onReady: () => {
    new Undo({
      editor,
      // config: {
      //   shortcuts: {
      //     undo: 'CMD+Z',
      //     redo: 'CMD+SHIFT+Z'
      //   }
      // }
    })
    new DragDrop(editor)
  },
  onChange: (api, event) => {
    editor.save().then((outputData) => {
      document.querySelector('[name="body"]').value = JSON.stringify(outputData)
    }).catch((error) => {
      console.log('Saving failed: ', error)
    })
  },
  tools: {
    // paragraph: {
    //   class: Paragraph,
    //   inlineToolbar: true,
    // },
    header: {
      class: Header,
      shortcut: 'CMD+SHIFT+H',
      inlineToolbar: true,
      config: {
        placeholder: 'Enter a header',
        // levels: [2, 3, 4],
        defaultLevel: 3
      }
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+O',
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: 'Quote\'s author',
      },
    },
    warning: {
      class: Warning,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+W',
      config: {
        titlePlaceholder: 'Title',
        messagePlaceholder: 'Message',
      },
    },
    delimiter: Delimiter,
    list: {
      class: NestedList,
      inlineToolbar: true,
      config: {
        defaultStyle: 'unordered'
      },
    },
    embed: {
      class: Embed,
      // config: {
      //   services: {
      //     youtube: true,
      //     coub: true
      //   }
      // }
    },
    table: {
      class: Table,
      inlineToolbar: true,
      // config: {
      //   rows: 2,
      //   cols: 3,
      // },
    },
    Marker: {
      class: Marker,
      shortcut: 'CMD+SHIFT+M',
    },
    inlineCode: {
      class: InlineCode,
      shortcut: 'CMD+SHIFT+C',
    },
    underline: Underline,
    codeBox : {
      class: CodeBox,
      // config: {
      //   themeURL: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css', // Optional
      //   themeName: 'atom-one-dark', // Optional
      //   useDefaultTheme: 'light' // Optional. This also determines the background color of the language select drop-down
      // }
    },
    hyperlink: {
      class: Hyperlink,
      // config: {
      //   shortcut: 'CMD+L',
      //   target: '_blank',
      //   rel: 'nofollow',
      //   availableTargets: ['_blank', '_self'],
      //   availableRels: ['author', 'noreferrer'],
      //   validate: false,
      // }
    },
  }
})
// todo preview @editorjs/link
