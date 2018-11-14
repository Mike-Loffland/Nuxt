<template>
    <section class="post-list">
      <PostPreview :is-admin="isAdmin" id="1" title="Test Title" previewText="Some test preview text for you" thumbnailUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMOSQ3HeWbaK1eN1oTHRvxUFh13yRQe67VDNru4vehc-BhuOnzvw" />
      <PostPreview :is-admin="isAdmin" id="2" title="Test Title 2" previewText="Some test preview text for you 2" thumbnailUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMOSQ3HeWbaK1eN1oTHRvxUFh13yRQe67VDNru4vehc-BhuOnzvw" />
      <PostPreview :is-admin="isAdmin" id="3" title="Test Title 3" previewText="Some test preview text for you 3" thumbnailUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMOSQ3HeWbaK1eN1oTHRvxUFh13yRQe67VDNru4vehc-BhuOnzvw" />
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
