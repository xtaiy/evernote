import request from "../helpers/request";
import {friendlyDate} from "../helpers/util"
const URL={
  GET:'/notebooks',
  ADD:'/notebooks',
  UPDATE:'/notebooks/:id',
  DELETE:'/notebooks/:id'
}

  export function getAll(){
    return new Promise((resolve,reject)=>{
    request(URL.GET).then(res=>{
      res.data = res.data.sort((notebook1, notebook2) => notebook1.createdAt < notebook2.createdAt ? 1 : -1)
      res.data.forEach(notebook=>{
        notebook.createAtFriendly=friendlyDate(notebook.createdAt)
        notebook.updatedAtFriendly=friendlyDate(notebook.updatedAt)
      })
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
  }
  export function updateNotebook(notebookId, {title=''}={title:''}){
    return request(URL.UPDATE.replace(':id',notebookId),'PATCH',{title: title})
  }
  export function deleteNotebook(notebookId){
    return request(URL.DELETE.replace(':id',notebookId),'DELETE')
  }
  export function addNotebook({title=''}={title:''}){
    return new Promise((resolve,reject)=>{
      request(URL.ADD,'POST',{title: title})
        .then((res)=>{
          res.data.createAtFriendly=friendlyDate(res.data.createdAt)
          res.data.updatedAtFriendly=friendlyDate(res.data.updatedAt)
          resolve(res)
        }).catch(err=>{
          reject(err)
      })
    })
  }
