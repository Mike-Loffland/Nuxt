import Vue from 'vue'

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

const dateFilter = value => {
  return formatDate(value)
}

function formatDate(inputDate) {
  const date = new Date(inputDate)
  return date.toLocaleDateString('en-US', options)
}

Vue.filter('formatDate', dateFilter)
