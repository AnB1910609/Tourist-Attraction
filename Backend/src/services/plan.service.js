const knex = require('../database/knex');
class PlanService {
    constructor() {
        this.plan = knex('plan');
    }
    #getPlan(payload) {
        const Plan = { ...payload };
        const PlanProperties = [
            "username", "tourname", "numbersofdays", "cost"
        ];
        Object.keys(Plan).forEach(function (key) {
            if (PlanProperties.indexOf(key) == -1) {
                delete Plan[key];
            }
        });
        
        return Plan;
    }

    async create(payload) {
        const Plan = this.#getPlan(payload);
        const [id] = await this.plan.insert(Plan);
        
        return { id, ...Plan };
    }

    async all() {
        return await this.plan.select('*');
    }
    async findByName(username) {
        return await this.plan
            .where('username', 'like', `%${username}%`)
            .select('*');
    }

    async findById(id) {
        return await this.plan.where('id', id).select('*').first();
    }

    async update(id, payload) {
        const update = this.#getPlan(payload);
        return await this.plan.where('id', id).update(update);
    }

    async delete(id) {
        return await this.plan.where('id', id).del();
    }

    async deleteAll() {
        return await this.plan.del();
    }
}
module.exports = PlanService;