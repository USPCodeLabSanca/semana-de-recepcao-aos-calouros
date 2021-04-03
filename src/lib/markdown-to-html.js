import remark from 'remark';
import html from 'remark-html';

/**
 * markdownToHtml
 *
 * @param {string} markdown
 *
 * @return {string}
 */
export default function markdownToHtml(markdown) {
  const result = remark().use(html).processSync(markdown);
  return result.toString();
}
