import http from "../settings/http";

class simplebookService {
    checkURL(passed_value) {
        return http.get(`/account-url-check/${passed_value}`);
    }

    checkEmail(data) {
        return http.get(`/account-email-check/${data}`);        
    }  
    
    createAccount(data) {
        return http.post(`/account-create`, data);
    }
    
    displayAccount() {
        return http.get(`/account-display`, {
            headers: {
                "x-access-token": localStorage.getItem('user-token')
            }
        });   
    }
}

export default new simplebookService();

