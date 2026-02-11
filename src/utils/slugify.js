export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // スペースをハイフンに
    .replace(/[^\w\-]+/g, '')    // 英数字とハイフン以外を削除
    .replace(/\-\-+/g, '-')      // 連続するハイフンを1つに
    .replace(/^-+/, '')          // 先頭のハイフンを削除
    .replace(/-+$/, '')          // 末尾のハイフンを削除
}
