<template>
    <v-content>
        <!-- Add branches button -->
        <v-layout row wrap style="margin-top:100px;">
            <v-flex xs8></v-flex>
            <v-flex xs2>
                <div @click="toggleDialog" class="button-add-branches">
                    <p style="margin-top:10px;">
                        <v-icon style="color:#3C84C5;">add</v-icon>
                        Add Branches
                    </p>
                </div>
            </v-flex>
        </v-layout>
        <!-- Branches -->
        <v-layout row wrap>
            <v-flex xs2></v-flex>
            <v-flex xs8>
                <v-layout row wrap>
                <v-flex  xs3 v-for="(x, index) in branches" v-bind:key="index">
                    <div class="element-branch">
                        <!--  -->
                        <p class="element-header">{{x.name.substring(0,25)}}</p>
                        <p style="text-align:left; margin-top:30px; margin-left:20px;">
                            <span @click="edit(x)" class="element-edit ">Edit</span>
                            <span @click="toggleRemoveDialog(x._id, x.name)" class="element-delete">Delete</span>
                        </p>
                    </div>
                </v-flex>
            </v-layout>
            </v-flex>
            <v-flex xs2></v-flex>
        </v-layout>
        <!-- remove dialog -->
        <div class="text-xs-center">
          <v-dialog
            v-model="removeDialog"
            width="500"
            height="500"
          >
            <div style="background-color:white; border-radius:10px;">
              <v-progress-linear v-show="indeterminate" style="margin-top:0px;" :indeterminate="indeterminate"></v-progress-linear>
              <v-layout row wrap>
                <v-flex xs12>
                  <p style="font-weight:500;" class="subheader">Confirm Remove Branch</p>
                </v-flex>
                <!-- button -->
                <v-flex xs2></v-flex>
                <v-flex @click="removeBranch" xs4 class="yes-but" style="margin-right:20px;">
                    <p class="font-in-but">Yes</p>
                </v-flex>
                <v-flex @click.stop="removeDialog = false" xs4 class="no-but" style="">
                    <p class="font-in-but">No</p>
                </v-flex>
                <v-flex xs2></v-flex>
              </v-layout>
            </div>
          </v-dialog>
        </div>
        <!-- add dialog -->
        <div class="text-xs-center">
          <v-dialog
            v-model="dialog"
            width="500"
            height="500"
          >
            <div style="background-color:white; border-radius:10px;">
                <v-progress-linear v-show="indeterminate" style="margin-top:0px;" :indeterminate="indeterminate"></v-progress-linear>
              <v-layout row wrap>
                <v-flex xs12>
                  <p class="subheader">Add branch</p>
                </v-flex>
                <v-flex xs2></v-flex>
                <v-flex xs8 style="margin-bottom:30px;">
                  <v-text-field v-model="branchName" label="branch name" ></v-text-field>
                </v-flex>
                <v-flex xs2></v-flex>
                <!-- button -->
                <v-flex xs2></v-flex>
                <v-flex @click="createBranch" xs8 class="save-but" style="">
                    <p class="font-in-but">Save</p>
                </v-flex>
                <v-flex xs2></v-flex>
              </v-layout>
            </div>
          </v-dialog>
        </div>
    </v-content>
</template>
<script>
import Api from '@/api/api'
export default {
  mounted () {
    Api.getbranches(x => {
      this.branches = x
    })
  },
  data () {
    return {
      removeDialog: false,
      branches: [],
      dialog: false,
      branchName: '',
      indeterminate: false,
      id: ''
    }
  },
  methods: {
    reset () {
      Api.getbranches(x => {
        this.branches = x
      })
    },
    toggleRemoveDialog (id, name) {
      this.id = id
      this.removeDialog = !this.removeDialog
    },
    removeBranch () {
      this.indeterminate = true
      let payload = {
        _id: this.id
      }
      Api.removeBranch(payload, x => {
        if (x === 401) {
          alert('Sesstion Expired')
          Api.resetToken()
          this.$router.push({name: 'login'})
          this.indeterminate = false
          return
        }
        this.reset()
        this.removeDialog = false
        this.id = ''
        this.indeterminate = false
      })
    },
    createBranch () {
      if (this.branchName.trim() === '') {
        alert('please enter the name')
        this.dialog = false
        return
      }
      this.indeterminate = true
      let payload = {
        name: this.branchName
      }
      Api.createBranch(payload, x => {
        if (x === 401) {
          alert('Sesstion Expired')
          Api.resetToken()
          this.$router.push({name: 'login'})
          return
        }
        this.branchName = ''
        this.dialog = false
        this.reset()
        this.indeterminate = false
      })
    },
    toggleDialog () {
      this.dialog = !this.dialog
    },
    edit (id) {
      this.$router.push({path: `EditBranch`, query: {id: id._id}})
    }
  }
}
</script>
<style>
.font-in-but {
     margin-top:10px;
    font-size:20px;
    letter-spacing: 1px;
    color:white;
    font-weight: 300;
}
.yes-but {
  border: solid 1px #264089;
  height:50px;
  border-radius:20px;
  cursor:pointer;
  background-color:#264089;
  transition: 0.4s;
  margin-bottom: 30px;
}
.no-but {
  border: solid 1px #3C84C5;
  height:50px;
  border-radius:20px;
  cursor:pointer;
  background-color:#3C84C5;
  transition: 0.4s;
  margin-bottom: 30px;
}
.save-but {
  border: solid 1px #264089;
  height:50px;
  border-radius:20px;
  cursor:pointer;
  background-color:#264089;
  transition: 0.4s;
  margin-bottom: 30px;
}
.save-but:hover {
    background-color: #3C84C5;
    border: solid 1px #3C84C5;
}
.subheader {
    text-align: left;
    margin-top:20px;
    margin-left:20px;
    font-size:20px;
    letter-spacing: 1px;
    color:#264089;
    font-weight: 300;
}
.element-edit {
  font-size: 16px;
  font-weight: 300;
  color: #3C84C5;
  cursor: pointer;
  transition: 0.3s;
}
.element-edit:hover {
  text-decoration: underline;
}
.element-delete:hover {
  text-decoration: underline;
}
.element-delete {
  transition: 0.3s;
  font-size: 16px;
  font-weight: 300;
  color:#C41414;
  padding-left:20px;
  cursor: pointer;
}
.element-header {
  font-weight: 500;
  font-size: 18px;
  text-align: left;
  margin-left:20px;
  margin-top:10px;
  color: #264089;
  letter-spacing: 1px;
}

.element-branch {
  min-height: 130px;
  margin-top:50px;
  border-radius: 10px;
  height: 50px;
  border: solid 1px white;
  box-shadow: 2px 3px 3px rgba(0,0,0,0.25), 0 3px 3px rgba(0,0,0,0.22);
}
.button-add-branches:hover {
    background-color: #264089;
    color:white;
    border: #264089 solid 1px;
    cursor: pointer;
}
.button-add-branches {
  transition:  0.4s;
  margin-left:100px;
  font-size:15px;
  font-weight: 600;
  color: #264089;
  width: 160px;
  margin-top:50px;
  border-radius: 10px;
  height: 50px;
  border: solid 1px white;
  box-shadow: 0 3px 3px rgba(0,0,0,0.25), 0 3px 3px rgba(0,0,0,0.22);
}
</style>
