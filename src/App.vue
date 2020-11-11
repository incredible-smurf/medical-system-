<template>
  <div>
    <headPart v-if="isLogging"/>
    <router-view/>
  </div>
</template>

<script>
import headPart from './components/headPart'
export default {
  components:{headPart},
  data(){
    return {
      isLogging:false
    }
  },
  watch:{
    '$route': 'displayHeadpart'
  },
  methods:{
    displayHeadpart(){
      if(this.$route.path==='/login'||this.$route.path==='/createaccount')
      this.isLogging=false
      else
      this.isLogging=true
    }
  }

}
</script>

<style>

</style>
