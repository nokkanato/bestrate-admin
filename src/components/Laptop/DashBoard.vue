<template>
    <v-content>
      <!-- Desktop -->
        <!-- navbar -->
        <v-layout row wrap class="navbar-lg">
            <v-flex xs2>
                <!-- logo -->
                  <img style="margin-top:15px; margin-left:10px;" height="65px" width="" src="~@/assets/logo.png" />
            </v-flex>
            <v-flex xs2></v-flex>
            <v-flex xs2 @click="changeState('Branches')">
                <p style="font-size:25px;" @click="changeState('Branches')" class="navbar-font underline-lg">Branches</p>
            </v-flex>
            <v-flex xs2 @click="changeState('Currencies')">
                <p style="font-size:25px;" @click="changeState('Currencies')" class="navbar-font underline-lg">Currencies</p>
            </v-flex>
            <v-flex xs4>
              <div style="cursor:pointer;">
                  <p @click="signout" style="text-align:right; margin-right:20px; color:#3C84C5; font-weight:400; font-size:18px; margin-top:35px;">
                    <!-- <v-icon>person</v-icon> -->
                    Sign out
                    </p>
                </div>
            </v-flex>
        </v-layout>
        <!-- <v-btn @click="changeState('Currencies')">ss</v-btn> -->
        <Branches style="backgroun-color:#ffffff;" row wrap v-if="state === 'Branches'"></Branches>
        <Currencies style="backgroun-color:#ffffff;" row wrap v-if="state === 'Currencies'"></Currencies>
    </v-content>
</template>
<script>
import Branches from '@/components/Laptop/Branches'
import Currencies from '@/components/Laptop/Currency'
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
.navbar-font {
    margin-top:25px;
    font-size: 20px;
    color: #707070;
    cursor: pointer;
}
.navbar-lg {
    height:100px;
    background-color:white;
    box-shadow: 0 3px 3px rgba(0,0,0,0.25), 0 3px 3px rgba(0,0,0,0.22);
}
.underline-lg {
    font-size:25px;
    letter-spacing:1px;
    display: inline-block;
    position:relative;
}
.underline-lg:before{
  content:"";
  width:100%;
  background:linear-gradient(to right, white 50%, #3C84C5 50%);
}
.underline-lg:after{
  content:"";
  width:100%;
  height:3px;
  left:0;
  bottom:0;
  position:absolute;
  z-index:9;
  background:linear-gradient(to right, #3C84C5 60%, white 50%);
}
</style>
