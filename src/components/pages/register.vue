<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="0" md="2"></v-col>  
                <v-col cols="12" md="8">
                    <v-card class=pa-4>
                        <v-form ref="form">
                        <v-card-title>
                            Create an account.
                        </v-card-title>
                        <v-card-subtitle>
                            It's free too.
                        </v-card-subtitle>                
                        <v-text-field
                            label="Company Name"
                            placeholder="Be proud, captain!"
                            v-model="account_name"
                            outlined
                            :rules="[rules.required]"                    
                        ></v-text-field>  
                        <v-text-field
                            label="Account URL"
                            placeholder="Make it memorable!"
                            outlined
                            v-model="account_url"
                            v-bind:hint=success_url  
                            :error-messages="errors_url"
                            @input="checkURL"
                            :rules="[rules.required, rules.length]"                    
                        ></v-text-field>  
                        <HR/><BR/>
                        <v-text-field
                            label="E-mail"
                            placeholder="You'll use this to manage your account."
                            outlined
                            v-model="account_email"
                            :error-messages="errors_email"
                            v-bind:hint=success_email                              
                            @input="checkEmail"                            
                            :rules="[rules.required]"                    
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
                                @input="clear_pass2"
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
                                @click=submitForm       
                                x-large>
                                    Create Account
                            </v-btn>
                        </v-form>          
                    </v-card>
                </v-col>
                <v-col cols="0" md="2"></v-col>  
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    import simplebookService from "../../services/simplebook.services";
    //import axios from "axios";

    export default {
        name: 'Register',    
        data: function () {
            return {
                account_name: '',
                account_url: '',
                success_url: '',
                errors_url: '',
                account_email: '',
                success_email: '',
                errors_email: '',
                show1: false,
                show2: false,
                confirm_password: '',
                original_password: '',
                val_url_unused: false,
                val_url_chars: false,
                val_email_unused: false,
                val_email_chars: false,
                rules: {
                    required: value => !!value || 'Required.',
                    length: value => value.length >= 5 || 'Minimum 5 characters',  
                    length8: value => value.length >= 8 || 'Minimum 8 characters',  
                    passwordMatch: () => ( this.original_password == this.confirm_password ) || (`The email and password you entered don't match`),
                }
            }
        },   
        methods: {
            checkURL() {
                if (this.account_url && this.account_url.length > 4) {
                    this.errors_url = '';  
                    this.success_url = '';  
                    simplebookService.checkURL(this.account_url)
                    .then(response => {
                        if (response.data.flag == true) {
                            this.success_url = "Very Nice! Your link will be: http://simplebook.it/" + this.account_url;
                            this.val_url_unused = true;
                        } else {
                            this.errors_url = "Sorry, this account URL is already in use.";
                            this.val_url_unused = false;
                        }
                    })
                    .catch( () => {
                            this.errors_url = "Sorry! This Account URL is not valid.";
                            this.val_url_unused = false;
                    });

                    var alphatester = /^[A-Za-z0-9]+$/;
                    if (alphatester.test(this.account_url) == false) {
                        this.errors_url = "Please use letters or numbers only.";
                        this.val_url_chars = false;
                    } else {
                        this.val_url_chars = true;
                    }
                }
            },
            checkEmail() {       
                if(this.account_email) {   
                    this.errors_email = '';
                    this.success_email = '';
                    simplebookService.checkEmail(this.account_email)
                    .then(response => {
                        if (response.data.flag == false) {
                            this.errors_email = "This e-mail is already in use.";
                            this.val_email_unused = false;
                        } else {
                            this.val_email_unused = true;
                        }
                    })
                    .catch( () => {
                            this.errors_email = "Sorry, unable to contact server.";
                            this.val_email_unused = false;
                        });

                    var emailtester = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (emailtester.test(this.account_email) == false) {
                        this.errors_email = "Please use a valid email address.";
                        this.val_email_chars = false;
                    } else {
                        this.val_email_chars = true;
                    }
                }
            },   
            togglepass1() {
                    this.show1 = !this.show1;
            },             
            togglepass2() {
                    this.show2 = !this.show2;
            },             
            clear_pass2() {
                this.confirm_password = "";
            },
            submitForm() {
                if(this.$refs.form.validate() == true 
                && this.val_url_unused == true
                && this.val_url_chars == true
                && this.val_email_unused == true
                && this.val_email_chars == true) {
                    var pass_data = {"account_url": this.account_url, 
                                "account_email": this.account_email,
                                "account_name": this.account_name,
                                "user_password": this.original_password
                                };
                    //var msg;
                    simplebookService.createAccount(pass_data).then( 
                        resp => {
                            const token = resp.data.accessToken;
                            localStorage.setItem('user-token', token);
                            //axios.defaults.headers.common['x-access-token'] = token;
                            this.$router.push('/initial-account');
                        });
                    //console.log("return msg " + msg);
                    
                }
            }
        }
    };

</script>