<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submitpost="onSubmitted" />
    </section>
  </div>
</template>
<script>
import AdminPostForm from '@/components/ui/admin/AdminPostForm'

export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  methods: {
    onSubmitted(postData){
      this.$store.dispatch('addPost', postData)
        .then(() => {
         this.$router.push('/admin')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scope>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
