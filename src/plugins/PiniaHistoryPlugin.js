import {ref, reactive} from "vue";
export function piniaHistoryPlugin({pinia, app, store, options}){
    if(!options.historyEnabled)  return;
    //Els deixem aquí ja que es important per l'scope
   const history=reactive([])
   const future=reactive([])
   const doingHistory=ref(false)
   history.push(JSON.stringify(store.$state));
   store.$subscribe((mutation,state)=>{
       if(!doingHistory.value){
           history.push(JSON.stringify(state));
           future.splice(0,future.length)
           //no podem reiniciar a zero, ja que perdríem la reactivitat
       }
  
   //console.log({mutation})
   //console.log({state})
   });
   return {
       undo:()=>{
           //si la longitud és 1 només tinc l'estat inicial i, per tant, no puc fer undo
               if (history.length===1) return
               doingHistory.value=true;
               //en cas contrari estrec l'ultim estat de l'array i
               future.push(history.pop());
               //torno a l'estat anterior
               store.$state=JSON.parse(history.at(-1))
               doingHistory.value=false
           },
       redo:()=>{
           const latestState=future.pop()
           if(!latestState)return;
           doingHistory.value=true;
           history.push(latestState)
           store.$state=JSON.parse(latestState)
           doingHistory.value=false;
       }
   }


}
