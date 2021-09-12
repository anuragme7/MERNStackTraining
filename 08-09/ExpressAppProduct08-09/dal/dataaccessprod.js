class DataAccess {
    #products = [];
    #users=[];
    constructor() {
      this.#products = [
        { 
          ProductId: "Prd-001",
          ProductName: "Laptop",
          CategoryName: "Electronics",
          Manufacturer: "IBM",
          Description: "Gaming",
          Price: 123000,
        },
        {
          ProductId: "Prd-002",
          ProductName: "Iron",
          CategoryName: "Electrical",
          Manufacturer: "Bajaj",
          Description: "Power Press",
          Price: 3000,
        },
      ];
  
      this.#users = [
        {
            UserName:'anurag',
            Password:'mehta'
        },
        {
          UserName:'mahesh',
          Password:'sabnis'
        },
        {
          UserName:'arun',
          Password:'parmar'
        },
        {
          UserName:'harsh',
          Password:'patni'
        },
        {
          UserName:'admin',
          Password:'admin'
        }
      ];
    }
    validateUser(authHeader){
        let credentials = authHeader.split(" ")[1];
        let userName = credentials.split(":")[0]; 
        let password = credentials.split(":")[1];
        for(let i=0;i<this.#users.length;i++){
            if(userName===this.#users[i].UserName){
                if(password===this.#users[i].Password){
                    return true;
                }
            }
        }
        return false;
    }
    validateProduct(product){
        let check1=true;
        this.#products.forEach((prod,i)=>{
            if(prod.ProductId===product.ProductId){
              check1=false;
              return;
            }
        });
        if(check1){
            return true;
        }
        else{
            return false;
        }

    }
    createProduct(product) {
        if(this.validateProduct(product)){
          this.#products.push(product);
          return this.#products;
        }
        return "Product Id already available";
      }
    getProducts() {
        if(this.#products.length===0){return "No products available"}
        return this.#products;
    }
    getProductsById(id) {
      let product = this.#products.find(p=>p.ProductId === id);  
      return product;
    }
    
    deleteProduct(product){
      let check=false;
      this.#products.forEach((prod,i)=>{
        if(prod.ProductId===product){
          this.#products.splice(i,1);
          check=true;
          return;
        }
      });
      return check;
    }
  
    updateProduct(product){
      let check=false;
      this.#products.forEach((prod,i)=>{
        if(prod.ProductId===product.ProductId){
          prod.ProductName=product.ProductName;
          prod.CategoryName=product.CategoryName;
          prod.Manufacturer=product.Manufacturer;
          prod.Description=product.Description;
          prod.Price=product.Price;
          check=true;
          return;
        }
      });
      return check;
    }

    
}
  
module.exports = DataAccess;
  