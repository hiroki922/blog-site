export const validateRequired = (value, fieldName) => {
  if (!value || !value.toString().trim()) {
    return `${fieldName}は必須です`
  }
  return ''
}

export const validateEmail = (email) => {
  if (!email) {
    return 'メールアドレスは必須です'
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(email)) {
    return '有効なメールアドレスを入力してください'
  }
  return ''
}

export const validateSlug = (slug) => {
  if (!slug) {
    return 'スラッグは必須です'
  }
  const regex = /^[a-z0-9-]+$/
  if (!regex.test(slug)) {
    return 'スラッグは小文字の英数字とハイフンのみ使用できます'
  }
  return ''
}

export const validateUrl = (url) => {
  if (!url) return ''
  try {
    new URL(url)
    return ''
  } catch {
    return '有効なURLを入力してください'
  }
}
