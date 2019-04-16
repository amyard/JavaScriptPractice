class ServiceProduct {
	constructor(containerProducts, containerCounter, productsCatalog) {
		this.container = document.querySelector(containerProducts);
		this.containerCounter = document.querySelector(containerCounter);
		this.productsCatalog = productsCatalog;

		this.create();
	}


	create() {
		var wrapper = document.createElement('slot');

		var products = serviceStore.getProducts();
		this.containerCounter.innerText = products.length;

		for(var i=0; i<this.productsCatalog.length; i++) {

			var index = products.indexOf(this.productsCatalog[i].id);
			if(index === -1){
				var activeClass = '';
				var activeText = 'Добавить в корзину';
			} else {
				var activeClass = ' btn-active';
				var activeText = 'Удалить из корзины';
			}


			var item = serviceCreateElement.getElement({tagName: 'div', className: 'item'});
			var name = serviceCreateElement.getElement({tagName: 'div', className: 'name', innerText: this.productsCatalog[i].name});
			var img = serviceCreateElement.getElement({tagName: 'div', className: 'img', backgroundImage: `url(${this.productsCatalog[i].img})`});
			var price = serviceCreateElement.getElement({tagName: 'div', className: 'price', innerText: this.productsCatalog[i].price.toLocaleString()+' USD'});
			var btn = serviceCreateElement.getElement({tagName: 'button', className: 'btn'+activeClass, innerText: activeText, id:this.productsCatalog[i].id});
			


			btn.addEventListener('click', function(){
				var id = this.getAttribute('data-id');
				var result = serviceStore.putProduct(id);

				serviceProduct.containerCounter.innerText = result.products.length;

				if(result.pushProduct){
					this.classList.add('btn-active');
					this.innerText = 'Удалить из корзины';
				} else {
					this.classList.remove('btn-active');
					this.innerText = 'Добавить в корзину';
				}
			});


			item.appendChild(name);
			item.appendChild(img);
			item.appendChild(price);
			item.appendChild(btn);

			wrapper.appendChild(item);
		}

		this.container.appendChild(wrapper);
	}

}

var serviceProduct = new ServiceProduct('.container-products', '.container-counter', productsCatalog);


