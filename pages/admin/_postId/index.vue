<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submitpost="adminSave" @deletepost="adminDelete" />
    </section>
  </div>
</template>
<script>
import AdminPostForm from '@/components/ui/admin/AdminPostForm'
import $axios from '@/axiosWrap'

export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  asyncData(context) {
    let fireBaseDocument = `${context.params.postId}.json`
    return $axios
      .get(`posts/${fireBaseDocument}`)
      .then(axiosResponse => {
        let { data } = axiosResponse
        // asyncData will merge with component data
        return {
          loadedPost: {...data, id: context.params.postId}
        }
      })
      .catch(err => {
        context.error(err)
      })
  },
  methods: {
    adminSave(adminPost){
      this.$store.dispatch('updatePost', adminPost)
        .then(() => {
         this.$router.push('/admin')
      }).catch(err => {
        console.log(err)
      })
    },
    adminDelete(adminPost){
      this.$store.dispatch('deletePost', adminPost)
        .then(() => {
         this.$router.push('/admin')
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    postId(){
      return this.$route.params.postId
    }
  }
}
</script>
<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
