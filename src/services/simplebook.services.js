import http from "../settings/http";

class simplebookService {
    checkURL(data) {
        return http.get(`/account-url-check/${data}`);
    }
}

export default new simplebookService();