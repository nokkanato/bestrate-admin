<template>
    <v-content>
      <!-- Desktop -->
        <!-- navbar -->
        <v-layout row wrap class="navbar-sm">
            <v-flex xs2>
                <!-- logo -->
                  <img style="margin-top:25px; margin-left:10px;" height="35px" width="" src="~@/assets/logo.png" />
            </v-flex>
            <v-flex xs2></v-flex>
            <v-flex xs2>
                <p style="font-size:15px;" @click="changeState('Branches')" class="navbar-fontt underline">Branches</p>
            </v-flex>
            <v-flex xs2>
                <p  style="font-size:15px;" @click="changeState('Currencies')" class="navbar-fontt underline">Currencies</p>
            </v-flex>
            <v-flex xs4>
              <div style="cursor:pointer;">
                  <p @click="signout" style="text-align:right; margin-right:20px; color:#3C84C5; font-weight:400; font-size:15px; margin-top:35px;">
                    <!-- <v-icon>person</v-icon> -->
                    Sign out
                    </p>
                </div>
            </v-flex>
        </v-layout>
        <Branches style="backgroun-color:#ffffff;" row wrap v-if="state === 'Branches'"></Branches>
        <Currencies style="backgroun-color:#ffffff;" row wrap v-if="state === 'Currencies'"></Currencies>
    </v-content>
</template>
<script>
import Branches from '@/components/sm/Branches'
import Currencies from '@/components/sm/Currency'
import Api from '@/api/api'
export default {
  mounted () {
    if (!Api.isLogined()) {
      this.$router.push({name: 'login'})
    }
    this.state = this.$router.history.current.params.state || 'Branches'
  },
  methods: {
    changeState (e) {
      this.state = e
    },
    signout () {
      // window.location.replace('')
      let backlen = history.length
      localStorage.clear()
      history.go(-backlen)
      this.$router.push({name: 'login'})
    }
  },
  components: {
    Branches,
    Currencies
  },
  data () {
    return {
      state: 'Branches'
    }
  }
}
</script>
<style>
.navbar-fontt {
    margin-top:35px;
    font-size: 15px;
    color: #707070;
    cursor: pointer;
}
.navbar-sm {
    height:100px;
    background-color:white;
    box-shadow: 0 3px 3px rgba(0,0,0,0.25), 0 3px 3px rgba(0,0,0,0.22);
    top: 0;
    position: fixed;
    width: 100%;
    z-index: 10;
}
.underline {
    letter-spacing:1px;
    display: inline-block;
    position:relative;
}
.underline:before{
  content:"";
  width:100%;
  background:linear-gradient(to right, white 50%, #3C84C5 50%);
}
.underline:after{
  content:"";
  width:100%;
  height:3px;
  left:0;
  bottom:0;
  position:absolute;
  z-index:9;
  background:linear-gradient(to right, #8B0000 60%, white 50%);
}
</style>
