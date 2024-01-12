import hljs from 'highlight.js'

hljs.configure({ languages: ['js', 'html', 'css', 'ruby', 'erb', 'bash', 'markdown', 'dockerfile', 'json',  'php', 'python', 'rust', 'sql', 'nginx'] })

document.body.addEventListener('htmx:load', function() {
  hljs.highlightAll()
})

import 'highlight.js/styles/atom-one-dark.min.css'
