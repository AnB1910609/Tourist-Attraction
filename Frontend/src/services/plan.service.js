import axios from "axios";
const url = import.meta.env.VITE_APP_API_URL;

class PlanService {
  constructor() {
    this.baseUrl = `${url}/api/plan`;
    this.api = axios.create({
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  async getMany() {
    return (await this.api.get(this.baseUrl)).data;
  }

  async create(touristAttraction) {
    return (await this.api.post(this.baseUrl, touristAttraction)).data;
  }

  async deleteMany() {
    return (await this.api.delete(this.baseUrl)).data;
  }

  async get(id) {
    return (await this.api.get(`${this.baseUrl}/${id}`)).data;
  }

  async update(id, touristAttraction) {
    return (await this.api.put(`${this.baseUrl}/${id}`, touristAttraction)).data;
  }

  async delete(id) {
    return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
  }
}

export const planService = new PlanService();
