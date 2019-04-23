<template>
    <v-content>
        <v-layout>
            <!-- name -->
                <v-flex xs3>
                    <v-text-field class="login"
                        v-model="tempName"
                        style="width:200px;"
                        label="Currency"
                        single-line
                    ></v-text-field>
                </v-flex>
                <!-- flag -->
                <v-flex xs2>
                    <!-- without flag -->
                    <div style="margin-left:20px;" class="add-flag" v-if="tempFlag === ''">
                        <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                        <input
                                type="file"
                                style="display: none"
                                ref="image"
                                accept="image/*"
                                @change="onFilePicked"
                        >
                    </div>
                    <!-- with flag -->
                    <img height="26" width="39" v-if="tempFlag !== ''" style="margin-top:20px;" v-bind:src="'data:image/jpeg;base64,'+ tempFlag" />
                </v-flex>
                <v-flex xs2>
                  <v-text-field v-if="tempFlag !== ''" label="change image"  @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                        <input v-if="tempFlag !== ''"
                                type="file"
                                style="display: none"
                                ref="image"
                                accept="image/*"
                                @change="onFilePicked"
                        >
                </v-flex>
                <v-flex xs2>
                    <p v-if="saveState" class="element-save-ha">Save</p>
                    <p v-if="!saveState" @click="save()" class="element-save">Save</p>
                </v-flex>
                <v-flex v-if="this.id" xs2 @click="deleteCurrency()">
                    <p class="element-delete">Delete</p>
                </v-flex>
                <v-flex v-if="!this.id" xs2 @click="handle()">
                    <p class="element-delete">Delete</p>
                </v-flex>
                <v-dialog
                    v-model="dialog"
                    max-width="290"
                >
                    <v-card>
                        <v-progress-circular
                            indeterminate
                            color="primary"
                        ></v-progress-circular>
                    </v-card>
                </v-dialog>
        </v-layout>
    </v-content>
</template>
<script>
import Api from '@/api/api'
export default {
  props: ['name', 'flag', 'id', 'index'],
  mounted () {
    this.tempName = this.name
    this.tempFlag = this.flag
    if (this.tempName !== '') {
      this.saveState = true
    }
  },
  watch: {
    tempName: function () {
      if (this.tempName !== this.name) {
        // this.tempFlag = ''
        this.saveState = false
      }
    },
    imageName: function () {
      this.saveState = false
    }
  },
  methods: {
    reset () {
      this.$emit('reset')
    },
    handle () {
      this.$emit('handle', {index: this.index})
    },
    deleteCurrency () {
      let payload = {
        _id: this.id
      }
      Api.deleteCurrency(payload, x => {
        if (x === 401) {
          alert('Session Expired')
          Api.resetToken()
          return
        }
        this.reset()
      })
    },
    save () {
      let _this = this
      if (this.tempName === '' || this.tempFlag === '') {
        alert('Please fill all the form')
        return
      }
      if (this.id) {
        let payload = {
          _id: _this.id,
          name: _this.tempName,
          flag: _this.tempFlag,
        }
        Api.editCurrency(payload, x => {
          switch (x) {
            case 401: {
              alert('Session Expired')
              Api.resetToken()
              _this.$router.push({name: 'login'})
              break
            }
            case 500: {
              alert('there was a problem')
              _this.reset()
              break
            }
            default: {
              alert('successful')
              _this.dialog = false
              _this.saveState = true
              _this.reset()
              break
            }
          }
        })
      } else {
        let payload = {
          name: _this.tempName,
          flag: _this.tempFlag,
        }
        Api.createCurrency(payload, x => {
          switch (x) {
            case 401: {
              alert('Session Expired')
              Api.resetToken()
              _this.$router.push({name: 'login'})
              break
            }
            case 500: {
              alert('there was a problem')
              _this.reset()
              break
            }
            default: {
              alert('successful')
              _this.dialog = false
              _this.saveState = true
              _this.reset()
              break
            }
          }
        })
      }
    },
    pickFile () {
      this.$refs.image.click()
    },
    getBase64 (file) {
      let _this = this
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        _this.tempFlag = reader.result.split(',')[1]
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
          this.getBase64(this.imageFile)
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    }
  },
  data () {
    return {
      indeterminate: true,
      saveState: false,
      dialog: false,
      tempName: '',
      imageName: '',
      imageFile: '',
      imageUrl: '',
      tempFlag: '',
      filename: '',
      base64: ''
    }
  }
}
</script>
<style>
.element-save {
  padding-top:15px;
  font-size: 16px;
  font-weight: 300;
  color: #3C84C5;
  cursor: pointer;
  transition: 0.3s;
}
.element-save-ha {
  padding-top:15px;
  font-size: 16px;
  font-weight: 300;
  color: gray;
  cursor: pointer;
  transition: 0.3s;
}
</style>
