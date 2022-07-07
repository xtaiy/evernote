import {getAll,updateNotebook,deleteNotebook,addNotebook} from "../../apis/noteBooks.js";
import {Message} from 'element-ui'

const state = {
  notebooks: null,
  curBookId: null
}
const getters = {
  notebooks: state => state.notebooks || [],

  curBook: state => {
    if(!Array.isArray(state.notebooks)) return {}
    if(!state.curBookId) return state.notebooks[0] || {}
    return state.notebooks.find(notebook => notebook.id === parseInt(state.curBookId) ) || {}
  }
}

const mutations = {
  setNotebooks(state, payload) {
    state.notebooks = payload.notebooks
  },

  addNotebook(state, payload) {
    state.notebooks.unshift(payload.notebook)
  },

  updateNotebook(state, payload) {
    let notebook = state.notebooks.find(notebook => notebook.id === parseInt(state.curBookId)) || {}
    notebook.title = payload.title
  },

  deleteNotebook(state, payload) {
    state.notebooks = state.notebooks.filter(notebook => notebook.id != payload.notebookId)
  },

  setCurBook(state, payload) {
    state.curBookId = payload.curBookId
  }
}
const actions = {
  getNotebooks({ commit }) {
    return getAll()
      .then(res => {
        commit('setNotebooks', { notebooks: res.data })
      })
  },

  addNotebook({ commit }, payload) {
    return addNotebook({ title: payload.title })
      .then(res => {
        console.log('add success...', res)
        commit('addNotebook', { notebook: res.data })
        // Message.success(res.msg)
      })
  },

  updateNotebook({ commit }, payload) {
    return updateNotebook(payload.notebookId, { title: payload.title })
      .then(res => {
        commit('updateNotebook', { notebookId: payload.notebookId, title: payload.title })
        Message.success(res.msg)
      })
  },

  deleteNotebook({ commit }, payload) {
    return deleteNotebook(payload.notebookId)
      .then(res => {
        commit('deleteNotebook', { notebookId: payload.notebookId })
        Message.success(res.msg)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
