import { faker } from '@faker-js/faker';

export class ProductMocker {

    constructor(amount) {
        this.amount = amount;
    }
    
    generateRandomProducts() {
        const randomProducts = [];
        
        for (let i = 0; i < this.amount; i++) {
            const randomProduct = {
                id: faker.datatype.uuid(),
                timestamp: faker.datatype.datetime(),
                nombre: faker.vehicle.vehicle(),
                precio: faker.datatype.number({min: 1000, max: 10000}),
                url: faker.image.imageUrl(400,600,'vehicle', true),
            }
            randomProducts.push(randomProduct);        
        }
    
        return randomProducts;
    }
}
