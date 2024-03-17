import fs from 'fs';

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./Data/productos.json";
    }
    static id = 0

    async addProduct(product) {
        try {
            this.products = await this.getProducts();
            const { title, description, price, thumbnail, code, stock } = product

            const existingProduct = this.products.find(product => product.code === code);
            if (existingProduct) {
                throw new Error(`Ya existe un producto con el código "${code}". El código debe ser único.`);
            }
                  
            const producto = {
                id: ProductManager.id++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };
            this.products.find(producto => producto.code === code) ? console.error('El código del producto debe de ser único') : this.products.push(producto);

            await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,"\t"),);
            console.log(`El producto "${producto.title}" ha sido agregado`);

            return producto;
        } catch (error) {
            console.error('No se pudo agregar el producto', error);
        }

    }

    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    async getProductById(id) {
        try {
            this.products = await this.getProducts();
            const getproduct = this.products.find(product => product.id === id)
            return getproduct ? getproduct : console.error(`No se encontró ningún producto con el ID "${id}" especificado`, error);
        } catch (error) {
            console.error('No se pudo encontrar el producto', error);
        }
    }

    async updateProduct(id, update) {
        try {
            this.products = await this.getProducts();
            const product = await this.getProductById(id);

            if (product) {
                const updateProduct = {
                    ...product,
                    ...update,
                    id
                }

                const updateProducts = this.products.map(product => (product.id === id) ? updateProduct : product);

                await fs.promises.writeFile(this.path, JSON.stringify(updateProducts,null,"\t"));
                console.log('Producto actualizado');

                return updateProduct;
            }
            else {
                console.error(`No se encontró ningún producto con el ID "${id}"`, error);
            }
        } catch (error) {
            console.error('Error al actualizar producto', error);
        }
    }

    async deleteProduct(id) {
        try {
            const product = await this.getProductById(id);

            if (product) {
                this.products = await this.getProducts();

                const products = this.products.filter(product => product.id != id);

                await fs.promises.writeFile(this.path, JSON.stringify(products));
                console.log('Se elimino el producto');
            }
            else {
                console.error(`No se encontró ningún producto con el ID "${id}" especificado`, error);
            }

        } catch (error) {
            console.error('Error al eliminar producto', error);
        }
    }
}
export default ProductManager;