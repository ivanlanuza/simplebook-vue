<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="0" md="2"></v-col>  
                <v-col cols="12" md="8">
                    <v-card class=pa-4>
                        <v-card-title>
                            Create an account.
                        </v-card-title>
                        <v-card-subtitle>
                            It's free too.
                        </v-card-subtitle>                
                        <v-text-field
                            label="Company Name"
                            placeholder="Be proud, captain!"
                            outlined
                            :rules="[rules.required]"                    
                        ></v-text-field>  
                        <v-text-field
                            label="Account URL"
                            placeholder="Make it memorable!"
                            outlined
                            v-model="account_url"
                            @input="checkURL"
                            v-bind:hint=success_url  
                            :rules="[rules.required, rules.length]"                    
                        ></v-text-field>  
                        <HR/><BR/>
                        <v-text-field
                            label="E-mail"
                            placeholder="You'll use this to manage your account."
                            outlined
                            v-model="account_email"
                            :rules="[rules.required, rules.validEmail]"                    
                        ></v-text-field>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'"
                                label="Password"
                                v-model="original_password"
                                outlined
                                counter
                                @click:append="togglepass1"
                                :rules="[rules.required, rules.length8]"                    
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show2 ? 'text' : 'password'"
                                label="Confirm Password"
                                v-model="confirm_password"
                                outlined
                                counter
                                @click:append="togglepass2"
                                :rules="[rules.required, rules.passwordMatch]"                    
                                ></v-text-field>
                            </v-col>
                            </v-row>
                            <HR/><BR/>
                            <v-btn 
                                block 
                                color="primary"       
                                x-large>
                                    Create Account
                            </v-btn>
                                  
                    </v-card>
                </v-col>
                <v-col cols="0" md="2"></v-col>  
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    import simplebookService from "../../services/simplebook.services";

    export default {
    name: 'Register',    
    data: function () {
        return {
            account_url: '',
            success_url: '',
            show1: false,
            show2: false,
            confirm_password: '',
            original_password: '',
            account_email: '',
            rules: {
                required: value => !!value || 'Required.',
                length: value => value.length >= 5 || 'Minimum 5 characters',  
                length8: value => value.length >= 8 || 'Minimum 8 characters',  
                passwordMatch: () => ( this.original_password == this.confirm_password ) || (`The email and password you entered don't match`),
                validEmail: function(account_email) {
                    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(account_email);                    
                } || ('Invalid Email') 
            }
        }
    },   
    methods: {
        checkURL() {            
            //console.log(this.account_url);

            simplebookService.checkURL(this.account_url)
            .then(response => {
                if (response.data.flag == 1) {
                    this.success_url = "Very Nice! Your link will be: http://simplebook.it/" + this.account_url;
                } else {
                    this.success_url = "Sorry! This Account URL is already taken.";
                }
              })
              .catch( () => {
                    this.success_url = "Sorry! This Account URL is already taken.";
                });
          },    
        togglepass1() {
                this.show1 = !this.show1;
            },             
        togglepass2() {
                this.show2 = !this.show2;
            },             
        }
    };

</script>