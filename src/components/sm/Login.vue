<template>
    <v-content >
        <v-progress-linear v-show="indeterminate" style="margin-top:0px;" :indeterminate="indeterminate"></v-progress-linear>
        <v-container style="margin-top:50px;">
            <v-layout row wrap>
                <v-flex xs3></v-flex>
                <v-flex xs6 class="boxx" style="">
                    <v-layout row wrap>
                        <!-- header -->
                        <v-flex xs12>
                            <p class="header">BestRate</p>
                        </v-flex>
                        <!-- divider -->
                        <v-flex xs2></v-flex>
                        <v-flex xs8>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs2></v-flex>
                        <!-- sub divider -->
                        <v-flex xs12>
                            <p style="margin-top:10px; font-size:20px; color:#3C84C5;">Login</p>
                        </v-flex>
                        <div style="margin-top:50px;"></div>
                        <!-- username -->
                        <v-flex xs2></v-flex>
                        <v-flex xs8>
                            <form
                                @submit="login"
                                >
                                <v-text-field class="login"
                                    label="Username"
                                    v-model="username"
                                    single-line
                                    outline
                                ></v-text-field>
                                <v-text-field
                                    label="Password"
                                    v-model="password"
                                    type="password"
                                    single-line
                                    outline
                                ></v-text-field>
                            </form>
                        </v-flex>
                        <v-flex xs2></v-flex>
                        <!-- login button -->
                        <v-flex xs2></v-flex>
                        <v-flex @click="login" xs8 class="login-but" style="">
                            <p class="font-in-but">Login</p>
                        </v-flex>
                        <v-flex xs2></v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs3></v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>
<script>
import Api from '@/api/api'
export default {
  mounted () {
    if (Api.isLogined()) {
      this.$router.push({name: 'DashBoard'})
    }
  },
  data () {
    return {
      indeterminate: false,
      username: '',
      password: ''
    }
  },
  methods: {
    reset () {
      this.username = ''
      this.password = ''
    },
    login () {
      this.indeterminate = true
      let payload = {
        username: this.username,
        password: this.password
      }
      Api.login(payload, x => {
        if (x === 400) {
          alert('wrong username or password')
          this.reset()
          this.indeterminate = false
          return
        }
        // Store.state.token = x.data
        this.indeterminate = false
        localStorage.setItem('token', x.data)
        this.$router.push({name: `DashBoard`})
      })
    }
  }
}
</script>
<style>
.login-but {
  border: solid 1px #264089;
  height:50px;
  border-radius:20px;
  cursor:pointer;
  background-color:#264089;
  transition: 0.4s;
}
.login-but:hover {
    background-color: #3C84C5;
    border: solid 1px #3C84C5;
}
.login {
    height: 50 !important;
}
.boxx {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 20px 20px rgba(0,0,0,0.22);
    height:320px;
    border-radius: 20px;
}
.header {
    font-size:22px;
    letter-spacing: 1px;
    margin-top:10px;
    color:#264089;
    font-weight: 700;
    margin-bottom:10px;
}
.subheader {
    text-align: center;
    margin-top:10px;
    font-size:18px;
    letter-spacing: 1px;
    color:#3C84C5;
    font-weight: 300;
}
.font-in-but {
     margin-top:10px;
    font-size:20px;
    letter-spacing: 1px;
    color:white;
    font-weight: 300;
}
</style>
