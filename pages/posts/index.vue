<template>
  <div class="posts-page">
      <PostList :posts="loadedPosts" />
  </div>
</template>
<script>
import PostList from '@/components/posts/PostList'
export default {
  components: {
    PostList
  },
  // nuxt specific lifecycle
  // behaves just like asyncData regarding unning on the server for first page load and on the client after that
  // fetch(context){
  //   return new Promise((resolve,reject) => {
  //           setTimeout(()=> {
  //             resolve({
  //               loadedPosts: [
  //                 {
  //                   id: '100',
  //                   title: 'Mocked title 100',
  //                   previewText: 'Some mocked preview text stuff',
  //                   thumbnailUrl: 'https://avatars2.githubusercontent.com/u/23360933?s=200&v=4'
  //                 },
  //                 {
  //                   id: '200',
  //                   title: 'Mocked title 200',
  //                   previewText: 'Some mocked preview text stuff 2',
  //                   thumbnailUrl: 'https://avatars2.githubusercontent.com/u/23360933?s=200&v=4'
  //                 }
  //               ]
  //             })
  //             // reject(new Error('error error error'))
  //         }, 2000)
  //         })
  //         .then(data => {
  //           context.store.dispatch('setPosts', data.loadedPosts)
  //         })
  //         .catch(e => {
  //           console.log(e)
  //           context.error(new Error('some random promise pattern error'))
  //         })
  // },
  computed: {
    loadedPosts(){
      return this.$store.getters.loadedPosts
    }
  }
  // created(){
  //   this.$store.dispatch('setPosts', this.loadedPosts)
  // },
  // exclude the callback parameter in the signature... else, Nuxt will think you want to use the callback pattern
  // *** asyncData will merge with data()
  // asyncData(context){
  //     return new Promise((resolve,reject) => {
  //       setTimeout(()=> {
  //         resolve({
  //           loadedPosts: [
  //             {
  //               id: '100',
  //               title: 'Mocked title 100',
  //               previewText: 'Some mocked preview text stuff',
  //               thumbnailUrl: 'https://avatars2.githubusercontent.com/u/23360933?s=200&v=4'
  //             },
  //             {
  //               id: '200',
  //               title: 'Mocked title 200',
  //               previewText: 'Some mocked preview text stuff 2',
  //               thumbnailUrl: 'https://avatars2.githubusercontent.com/u/23360933?s=200&v=4'
  //             }
  //           ]
  //         })
  //         // reject(new Error('error error error'))
  //     }, 2000)
  //     })
  //     .then(posts => {
  //       return posts
  //     })
  //     .catch(e => {
  //       console.log(e)
  //       context.error(new Error('some random promise pattern error'))
  //     })
  // }
}
</script>
<style scoped>
  .posts-page {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .featured-posts {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>
