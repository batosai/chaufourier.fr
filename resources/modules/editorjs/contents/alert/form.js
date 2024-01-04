export default ({ type, message }) => `<div class="form-control mb-5">
    <select name="type" class="select">
      <option value="info" ${type==='info' ? 'selected' : ''}>Info</option>
      <option value="success" ${type==='success' ? 'selected' : ''}>Success</option>
      <option value="warning" ${type==='warning' ? 'selected' : ''}>Warning</option>
      <option value="error" ${type==='error' ? 'selected' : ''}>Error</option>
    </select>
  </div>
  <div class="form-control mb-5">
    <textarea name="message" class="textarea">${message}</textarea>
  </div>
`
