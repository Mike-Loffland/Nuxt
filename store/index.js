// Vuex is installed with Nuxt
import Vuex from 'vuex'
import $axios from '@/axiosWrap'
import { fireBase } from '@/localconfig.js'

const createStore = () => {
  // run on server... so, return a new Vuex.Store for each session... otherwise, all sessions would share the same store
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },
    mutations: {
      SET_POSTS(state, posts) {
        state.loadedPosts = posts
      },
      ADD_POST(state, post) {
        state.loadedPosts.push(post)
      },
      UPDATE_POST(state, post) {
        let postIndex = state.loadedPosts.findIndex(lp => lp.id === post.id)
        //console.log('found post', state.loadedPosts, post)
        state.loadedPosts[postIndex] = post
      },
      REMOVE_POST(state, post) {
        state.loadedPosts = state.loadedPosts.filter(lp => lp.id != post.id)
      },
    },
    actions: {
      nuxtServerInit(vuexContext, nuxtContext) {
        // special action dispatched by nuxt
        // *** nuxtServerInit requires that you return a Promise if you're executing an async action
        // ***** nuxtServerInit will do all the magic to initialize data in the store
        return $axios
          .get(fireBase.postsJsonNode)
          .then(axiosResponse => {
            const postArray = []
            let { data } = axiosResponse
            Object.keys(data).forEach(key => {
              postArray.push({ ...data[key], id: key })
            })
            vuexContext.dispatch('setPosts', postArray)
          })
          .catch(err => {
            nuxtContext.error(err)
          })
      },
      setPosts({ commit }, posts) {
        commit('SET_POSTS', posts)
      },
      addPost({ commit }, post) {
        let createdPost = { ...post, updatedDate: new Date() }
        return $axios
          .post(fireBase.postsJsonNode, createdPost)
          .then(result => {
            commit('ADD_POST', { ...createdPost, id: result.data.name })
          })
          .catch(err => {
            console.log(err)
          })
      },
      updatePost({ commit }, post) {
        let fireBaseDocument = `${post.id}.json`
        post.updatedDate = new Date()
        return $axios
          .put(`${fireBase.postsNode}${fireBaseDocument}`, post)
          .then(result => {
            commit('UPDATE_POST', post)
          })
          .catch(err => {
            console.log(err)
          })
      },
      deletePost({ commit }, post) {
        let fireBaseDocument = `${post.id}.json`
        return $axios
          .delete(`${fireBase.postsNode}${fireBaseDocument}`)
          .then(result => {
            commit('REMOVE_POST', post)
          })
          .catch(err => {
            console.log(err)
          })
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
    },
  })
}

export default createStore
