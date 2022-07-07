<template>
    <span :title="username">{{slug}}</span>
  </template>

<script>
    export default {
    data() {
        return{}
      },
      created() {
        this.$store.dispatch('checkLogin',{path:'/login'})
      },
      computed:{
        username(){
          return this.$store.getters.username
        },
        slug(){
          return this.$store.getters.slug
        }
      },
      methods:{

      }
  }
</script>

<style scoped>

span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>
