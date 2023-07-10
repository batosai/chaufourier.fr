export default () => ({
  open: false,
  textInput: '',
  tags: [],
  results: [],
  minLength: 2,
  urls: {
    find: '/admin/tags/find',
    search: '/admin/tags?search=',
  },
  init() {
    const data = this.$el.parentNode.dataset.tags
    if (data) {
      this.tags = JSON.parse(data)
    }

    const dataMinLength = this.$el.parentNode.dataset.minLength
    if (dataMinLength) {
      this.minLength = dataMinLength
    }
  },
  async addTag(tag) {
    tag = tag.trim()
    if (tag != '' && !this.hasTag(tag) && tag.length >= this.minLength) {
      const response = await fetch(this.urls.find, {
        method: 'POST',
        body: JSON.stringify({ name: tag }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
      })

      this.tags.push(await response.json())
    }
    this.clearSearch()
    this.$refs.textInput.focus()
  },
  hasTag(tag) {
    var tag = this.tags.find((e) => {
      return e.name.toLowerCase() === tag.toLowerCase()
    })
    return tag != undefined
  },
  hasInResults(tag) {
    if (tag.length < this.minLength) {
      return true
    }

    var tag = this.results.find((e) => {
      return e.name.toLowerCase() === tag.toLowerCase()
    })
    return tag != undefined
  },
  removeTag(index) {
    this.tags.splice(index, 1)
  },
  async search(q) {
    const response = await fetch(`${this.urls.search}${q}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'xmlhttprequest',
      },
    })

    if (response.ok) {
      this.results = (await response.json()).data
    }

    if (q.includes(',')) {
      q.split(',').forEach(async (val) => {
        this.addTag(val)
      }, this)
    }
    this.toggleSearch()
  },
  clearSearch() {
    this.textInput = ''
    this.results = []
    this.toggleSearch()
  },
  toggleSearch() {
    this.open = this.textInput != ''
  },
})
