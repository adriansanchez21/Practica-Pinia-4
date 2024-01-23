import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";
import {useLocalStorage} from "@vueuse/core"


export const useCartStore = defineStore("CartStore", {
    historyEnabled: true,
    state: () => {
        return {
            // items: [],
            items: useLocalStorage("CartStore:items",[]),
        };
    },
    actions: {
        addItems(count,item){
            count=parseInt(count);
            for(let index=0;index<count;index++){
                this.items.push({...item});
            }
        },
        // addItems(count,item){
        //     throw new Error("example error");
        //     count=parseInt(count);
        //     for(let index=0;index<count;index++){
        //         this.items.push({...item});
        //         //this.items.push(item);
        //     }
        // },
 
        clearItem(name) {
            this.items = this.items.filter((item) => item.name != name);
        },
        setItemCount(item, count){
            this.clearItem(item.name);
            this.addItems(count, item);
        },
        checkout() {
            const authUserStore = useAuthUserStore();
      
            alert(
              `${authUserStore.username} just bought ${this.count} items at a total of ${this.totalPrice}$`
            );
          },
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,
        grouped: state => groupBy(state.items, item=>item.name),
        groupCount: (state)=>(name)=>state.grouped[name].length,
        //El getter "totalPrice" recorre todos los productos que hay en el array "items" del store y suma los precios de todos los elementos
        preuTotal: (state) => state.items.reduce((total, valorActual) => total + valorActual?.price, 0),
    }
});


if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useCartStore,import.meta.hot));
 }
 
