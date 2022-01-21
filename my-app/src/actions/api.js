import axios from "axios";

const baseUrl = "http://localhost:17694/api/"

export default { 
    dCandidate(url = baseUrl + 'DonationCandidate/') {
        return {
            fetchAll: () => axios.get(url), 
            fetchById: (id) => axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url+id, updatedRecord), 
            delete: (id) => axios.delete(url + id)
        }
    }
}