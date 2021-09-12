const dal = require("./dataaccessprod");
let dalObj = new dal();
class ApiCalls
{
    async login(req,resp){
        let authHeader = req.headers.authorization;
        if(await dalObj.validateUser(authHeader)){
            resp.status(200).send(JSON.stringify(true));   
        }
        else{
            resp.status(400).send(JSON.stringify(false));   
        }
    }
    
    async getpro(req,resp){
        let authHeader = req.headers.authorization;
        if (await dalObj.validateUser(authHeader)) {
            let products = await dalObj.getProducts();
            resp.status(200).send( JSON.stringify(products ));
        } else {
            resp.status(401).send(JSON.stringify("Credentials are invalid"));
        }
    }

    async getprobyid(req,resp){
        let authHeader = req.headers.authorization;
        if (await dalObj.validateUser(authHeader)) {
            let id = req.params.id;
            let product = await dalObj.getProductsById(id);
            if (product == null || product === undefined || !product) {
            resp.status(404).send(JSON.stringify("Record Not Found"));
            } else {
            resp.status(200).send(product );
            }
        } else {
            resp.status(401).send(JSON.stringify("Credentials are invalid"));
        }
    }

    async delpro(req,resp){
        let authHeader = req.headers.authorization;
        if (await dalObj.validateUser(authHeader)) {
            let id = req.params.id;
            if(await dalObj.deleteProduct(id)){
                resp.status(200).send(JSON.stringify("Record Deleted"));
            }
            else{
                resp.status(404).send(JSON.stringify("Record Not Found"));

            }
        } else {
            resp.status(401).send(JSON.stringify("Credentials are invalid"));
        }
    }

    async createpro(req,resp){
        let authHeader = req.headers.authorization;
        if (await dalObj.validateUser(authHeader)) {
            let product = req.body;
            console.log(product);
            let products = await dalObj.createProduct(product);
            resp.status(200).send(JSON.stringify("Record Uploaded"));
        } else {
            resp.status(401).send(JSON.stringify("Credentials are invalid"));
        }
    }

    async updpro(req,resp){
        let authHeader = req.headers.authorization;
        if (await dalObj.validateUser(authHeader)) {
            let id = req.params.id;
            let product = await dalObj.getProductsById(id);
            if (product === null || product === undefined || !product) {
                resp.status(404).send(JSON.stringify("Record Not Found"));
            } else {
                let productdata = req.body;
                if(await dalObj.updateProduct(productdata)){
                    resp.status(200).send(JSON.stringify("Product Updated"));

                }
                else{
                    resp.status(401).send(JSON.stringify("Please provide the same ID as in URL"));
                }
            }
            
        } else {
            resp.status(401).send(JSON.stringify("Credentials are invalid"));

        }
    }
}


module.exports = ApiCalls;