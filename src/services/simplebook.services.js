import http from "../settings/http";

class simplebookService {
    checkURL(passed_value) {
        return http.get(`/account-url-check/${passed_value}`);
    }

    checkEmail(data) {
        return http.get(`/account-email-check/${data}`);        
    }    
}

export default new simplebookService();

