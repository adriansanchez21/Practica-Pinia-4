<script setup>
import { ref, reactive } from "vue";

import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "./stores/productStore";
import { storeToRefs } from "pinia";
import { useCartStore } from "./stores/CartStore";
const productStore = useProductStore();
const cartStore = useCartStore();

// const history = reactive([])
// history.push(JSON.stringify(cartStore.$state));
// cartStore.$subscribe((mutation, state) => {
// 	history.push(JSON.stringify(state));
// })


const { products } = storeToRefs(useProductStore());
productStore.fill();
// cartStore.$onAction(({
// 	name,
// 	store,
// 	args,
// 	after,
// 	onError
// }) => {
// 	if (name === 'addItems') {
// 		after(() => {
// 			console.log(args[0])
// 		})
// 	}

// 	// if(name==='addItems'){
// 	//  after(()=>{
// 	//    console.log(args[0])
// 	//  });
// 	//  onError((error)=>{
// 	//    console.log("Hello error:",error.message);
// 	//  });
// 	cartStore.$subscribe((mutation, state) => {


// 		console.log({ mutation })
// 		console.log({ state })
// 	})
// 	store.$patch({
// 		counter: store.counter + 1,
// 		name: "Samarreta",
// 	})

// })

// const addItems = (count, product) => {
// 	count = parseInt(count);
// 	cartStore.$patch(state => {
// 		for (let index = 0; index < count; index++) {
// 			state.items.push(product);
// 		}
// 	})
// };
// const future=reactive([])
// const doingHistory=ref(false)
// history.push(JSON.stringify(cartStore.$state));


// const undo = () => {
// 	if (history.length === 1) return
// 	doingHistory.value = true
// 	history.pop()
// 	cartStore.$state = JSON.parse(history.at(-1))
// 	doingHistory.value = false
// }
// cartStore.$subscribe((mutation, state) => {
// 	if (!doingHistory.value) {
// 		history.push(JSON.stringify(state));
// 	}
// })

// const redo=()=>{
//  const latestState=future.pop()
//  if(!latestState)return;
//  doingHistory.value=true;
//  history.push(latestState)
//  cartStore.$state=JSON.parse(latestState)
//  doingHistory.value=false;
// }

</script>

<template>
	<div class="container">
		<TheHeader />
		<div class="mb-5 flex justify-end">
			<AppButton @click="cartStore.undo">Undo</AppButton>
			<AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>

		</div>
		<ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
			<ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
				@addToCart="cartStore.addItems($event, product)" />
		</ul>
	</div>
</template>