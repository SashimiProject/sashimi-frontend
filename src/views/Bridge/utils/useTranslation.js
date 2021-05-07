import en from '../config/en.json'
export const t = (key, options) => {
  let text = en.translation[key] || key
  if (typeof options === 'object') {
    Object.keys(options).forEach((i) => {
      if (typeof text === 'string') {
        text = text.replace(`{{${i}}}`, options[i])
      }
    })
  }
  return text
}
const useTranslation = () => {
  return { t }
}
export default useTranslation
