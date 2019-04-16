// хранилище данных

class ServiceStore {
	constructor(){}
	getProducts(){
		var products = [];
		var productsLocalStorage = localStorage.getItem('products');
		if(productsLocalStorage !== null){
			products = JSON.parse(productsLocalStorage);
		}
		return products;
	}
	putProduct(id){
		var products = this.getProducts();

		// проверка на наличие такого товара в корзине
		var index = products.indexOf(id);
		if(index === -1){
			// добавляет товар
			products.push(id);

			// дабы кнопка меня свойство на актив
			var pushProduct = true;
		} else {
			// удаляет елемент если два раза нажать на кнопку
			products.splice(index, 1);

			var pushProduct = false;
		}
		
		localStorage.setItem('products', JSON.stringify(products));

		return {
			pushProduct: pushProduct,
			products: products

		}
	}
}

var serviceStore = new ServiceStore();