<template>
    <section class="post-list">
      <PostPreview
        v-for="(post, index) in posts"
        :key="`post${post.id}`"
        :is-admin="isAdmin"
        :id="post.id"
        :title="post.title"
        :previewText="post.previewContent"
        :thumbnailUrl="post.thumbnailLink" />
    </section>
</template>
<script>
import PostPreview from '@/components/posts/PostPreview'
export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped>
  .post-list {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>
