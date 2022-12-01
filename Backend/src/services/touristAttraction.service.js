const knex = require('../database/knex');
class TouristAttractionService {
    constructor() {
        this.touristattraction = knex('touristAttraction');
    }
    #getTouristAttraction(payload) {
        const TouristAttraction = { ...payload };
        const TouristAttractionProperties = [
            "name", "address", "describe", "fare", "favorite"
        ];
        Object.keys(TouristAttraction).forEach(function (key) {
            if (TouristAttractionProperties.indexOf(key) == -1) {
                delete TouristAttraction[key];
            }
        });
        
        return TouristAttraction;
    }

    async create(payload) {
        const TouristAttraction = this.#getTouristAttraction(payload);
        const [id] = await this.touristattraction.insert(TouristAttraction);
        
        return { id, ...TouristAttraction };
    }

    async all() {
        return await this.touristattraction.select('*');
    }
    async findByName(name) {
        return await this.touristattraction
            .where('name', 'like', `%${name}%`)
            .select('*');
    }

    async findById(id) {
        return await this.touristattraction.where('id', id).select('*').first();
    }

    async update(id, payload) {
        const update = this.#getTouristAttraction(payload);
        return await this.touristattraction.where('id', id).update(update);
    }

    async delete(id) {
        return await this.touristattraction.where('id', id).del();
    }

    async allFavorite() {
        return await this.touristattraction.where('favorite', 1).select('*');
    }

    async deleteAll() {
        return await this.touristattraction.del();
    }
}
module.exports = TouristAttractionService;