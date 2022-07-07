import {getAll,deleteNote,revertNote} from '../../apis/trash'
import { Message } from 'element-ui'

const state= {
  trashNotes:null,
  curTrashNoteId:null,
}
const getters={
  trashNotes: state=>state.trashNotes || [],
  curTrashNote: (state, getters) => {
    if(!state.curTrashNoteId) return getters.trashNotes[0] || {}
    return state.trashNotes.find(note => note.id == state.curTrashNoteId) || {}
  },
  belongTo: (state, getters, rootState, rootGetters) => {
    let notebook = rootGetters.notebooks.find(notebook => notebook.id == getters.curTrashNote.notebookId) || {}
    return notebook.title || ''
  }
}
const mutations = {
  setTrashNotes(state,payload){
    state.trashNotes=payload.trashNotes
  },
  deleteTrashNote(state,payload){
    state.trashNotes=state.trashNotes.filter(note=>note.id!==payload.noteId)
  },
  setCurTrashNote(state, payload={}) {
    state.curTrashNoteId = payload.curTrashNoteId
  }

}
const actions = {
  getTrashNotes({ commit }) {
    return getAll()
      .then(res => {
        commit('setTrashNotes', { trashNotes: res.data })
      })
  },
  deleteTrashNote({ commit }, { noteId }) {
    return deleteNote({ noteId })
      .then(res => {
        commit('deleteTrashNote', { noteId })
        Message.success(res.msg)
      })
  },

  revertTrashNote({ commit }, { noteId }) {
    return revertNote({ noteId })
      .then(res => {
        commit('deleteTrashNote', { noteId })
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
