import form from './contents/alert/form'

export default class Alert {
  /**
   * Notify core that read-only mode is supported
   */
  static get isReadOnlySupported() {
    return true
  }

  /**
   * Get Toolbox settings
   *
   * @public
   * @returns {string}
   */
  static get toolbox() {
    return {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1)transform: msFilter:"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>',
      title: 'Alert',
    }
  }

  /**
   * Allow to press Enter inside the Alert
   *
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks() {
    return true
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {AlertData} data — previously saved data
   * @param {object} api - Editor.js API
   * @param {boolean} readOnly - read-only mode flag
   */
  constructor({ data, api, readOnly }) {
    this.api = api
    this.readOnly = readOnly

    this.data = {
      type: data.type || '',
      message: data.message || '',
    }
  }

  /**
   * Create Warning Tool container with inputs
   *
   * @returns {Element}
   */
  render() {
    return up.element.createFromHTML(`<div class="my-2">${form(this.data)}</div>`)
  }

  /**
   * Extract Alert data from Alert Tool element
   *
   * @param {HTMLDivElement} alertElement - element to save
   * @returns {WarningData}
   */
  save(alertElement) {
    const type = alertElement.querySelector('select')
    const message = alertElement.querySelector('textarea')

    return Object.assign(this.data, {
      type: type.value,
      message: message.value,
    })
  }

  /**
   * Sanitizer config for Warning Tool saved data
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      type: {},
      message: {},
    }
  }
}
