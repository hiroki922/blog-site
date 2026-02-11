import { ref, computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { blogService } from '../services/blogService'

export function useBlog() {
  const blogs = ref([])
  const currentBlog = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // 公開ブログ一覧取得
  const fetchPublishedBlogs = async () => {
    loading.value = true
    error.value = null
    try {
      blogs.value = await blogService.getPublishedBlogs()
    } catch (err) {
      error.value = err.message
      console.error('Error fetching blogs:', err)
    } finally {
      loading.value = false
    }
  }

  // スラッグでブログ取得
  const fetchBlogBySlug = async (slug) => {
    loading.value = true
    error.value = null
    try {
      const blog = await blogService.getBlogBySlug(slug)

      // MarkdownをHTMLに変換
      const html = DOMPurify.sanitize(marked.parse(blog.content))

      currentBlog.value = {
        ...blog,
        contentHtml: html
      }

      return currentBlog.value
    } catch (err) {
      error.value = err.message
      console.error('Error fetching blog:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // 全ブログ取得（管理者用）
  const fetchAllBlogs = async () => {
    loading.value = true
    error.value = null
    try {
      blogs.value = await blogService.getAllBlogs()
    } catch (err) {
      error.value = err.message
      console.error('Error fetching all blogs:', err)
    } finally {
      loading.value = false
    }
  }

  // IDでブログ取得（管理者用）
  const fetchBlogById = async (id) => {
    loading.value = true
    error.value = null
    try {
      currentBlog.value = await blogService.getBlogById(id)
      return currentBlog.value
    } catch (err) {
      error.value = err.message
      console.error('Error fetching blog by ID:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // ブログ作成
  const createBlog = async (blogData) => {
    loading.value = true
    error.value = null
    try {
      const newBlog = await blogService.createBlog(blogData)
      blogs.value.unshift(newBlog)
      return newBlog
    } catch (err) {
      error.value = err.message
      console.error('Error creating blog:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // ブログ更新
  const updateBlog = async (id, updates) => {
    loading.value = true
    error.value = null
    try {
      const updated = await blogService.updateBlog(id, updates)
      const index = blogs.value.findIndex(b => b.id === id)
      if (index !== -1) {
        blogs.value[index] = updated
      }
      return updated
    } catch (err) {
      error.value = err.message
      console.error('Error updating blog:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // ブログ削除
  const deleteBlog = async (id) => {
    loading.value = true
    error.value = null
    try {
      await blogService.deleteBlog(id)
      blogs.value = blogs.value.filter(b => b.id !== id)
      return true
    } catch (err) {
      error.value = err.message
      console.error('Error deleting blog:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // 最新ブログ取得
  const getLatestBlogs = (count = 3) => {
    return blogs.value.slice(0, count)
  }

  // タグでフィルタリング
  const getPostsByTag = async (tag) => {
    loading.value = true
    error.value = null
    try {
      blogs.value = await blogService.getBlogsByTag(tag)
    } catch (err) {
      error.value = err.message
      console.error('Error fetching blogs by tag:', err)
    } finally {
      loading.value = false
    }
  }

  // 全タグ取得
  const getAllTags = computed(() => {
    const tags = new Set()
    blogs.value.forEach(blog => {
      blog.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  })

  return {
    blogs,
    currentBlog,
    loading,
    error,
    fetchPublishedBlogs,
    fetchBlogBySlug,
    fetchAllBlogs,
    fetchBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    getLatestBlogs,
    getPostsByTag,
    getAllTags
  }
}
