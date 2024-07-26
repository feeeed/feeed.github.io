
<script setup lang="ts">
import {ref, onMounted, watch, computed, reactive} from "vue";
import ShopView from "./components/ShopView.vue";

// Константы
const count = ref(0)
const active = ref(false)
const fullCount = ref(false)
const tapPower = ref(1)
let timerId: any = null;
const speedIncome = ref(1)


const items = reactive([
  { title:"Sword", imageURL:"src/assets/Icon1.png",price:10000,buff:100},
  { title:"Shield", imageURL:"src/assets/Icon2.png",price:10000,buff:100},
  { title:"Axe", imageURL:"src/assets/Icon3.png",price:10000,buff:100},
  { title:"Bow", imageURL:"src/assets/Icon4.png",price:10000,buff:100},
  { title:"Spear", imageURL:"src/assets/Icon5.png",price:10000,buff:100},
  { title:"Dagger", imageURL:"src/assets/Icon6.png",price:10000,buff:100},
])


// Actions

// Авто-фарм
const autoCounter = (active:boolean) => {
  if(active){
    timerId = setInterval(() => { count.value+= speedIncome.value }, 1000)
  }
  else{
    clearInterval(timerId);
    timerId = null;
  }
}
// Механики апгрейда
const upgradeSpeedIncome = (tempCount:number) => {
  if(count.value >= 10000){
    count.value -= 10000
    speedIncome.value+=tempCount
  }
  else console.log('Не хватает токенов!')
}
const upgradeTapPower = (tempCount:number) => {
  if(count.value >= 10000){
    count.value -= 10000
    tapPower.value+=tempCount
  }
  else console.log('Не хватает токенов!')
}
// Computed

// Отображение баланса в компактном режиме
const abbreviateNumber = computed(() => {
  const SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];
  const tier = Math.floor(Math.log10(Math.abs(count.value)) / 3);

  if (tier === 0) return count.value.toString();
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = count.value / scale;
  return scaled.toFixed(3) + suffix;
})

// Lifecycle hooks

onMounted(() => {
  if(localStorage.count) count.value = JSON.parse(localStorage.count);

});
watch(count, (tempCount)=> {
  try {
    localStorage.count = JSON.stringify(tempCount)
  } catch (err){
    console.log(err);
  }
})
watch(active, (newValue)=>{
   autoCounter(newValue);
})

</script>

<template>
  <div class="container">
    <button class="btn"
    @click="count+=tapPower"
    >
      <img alt="coin" src="./assets/icons8-дешево-2-96.png" height="96" width="96"/>
    </button>
    <div class="balance">
      <div v-if="!fullCount" @click="fullCount=true"> {{abbreviateNumber}}</div>
      <div v-if="fullCount" @click="fullCount=false"> {{count}}</div>
      <div>
        <img alt="coin-static" src="./assets/icons8-дешево-2.gif" height="45" width="45" />
      </div>
    </div>
  </div>
  <div class="dev-container">
    <div class="dev-container--tile">
      <h4>Dev panel</h4>

    </div>
    <div class="dev-container--actions">
    <button class="btn"
            @click="active=true"
    >
      Start income
    </button>
      <button class="btn"
              @click="active=false"
      >
       Stop
      </button>
      <button class="btn"
              @click="upgradeSpeedIncome(10)"
      >
        Upgrade
      </button>

    </div>
    <div class="dev-container--details">
      <div>Current speed income: {{speedIncome}} tokens/second</div>

      <div>Current count: {{count}} tokens</div>
      <div>Active: {{active? 'Yes' : 'No'}}</div>
    </div>
    <div class="dev-container--details">
    <div>TapPower count: {{tapPower}} tokens/click</div>
      <button class="btn"
              @click="upgradeTapPower(10)"
      >
        Upgrade
      </button>
    </div>

    <shop-view
    :items="items"
    >

    </shop-view>
  </div>

  
</template>

<style lang="scss">
.dev-container{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  *{
    margin-bottom: 10px;
  }
  .dev-container--actions{
    display: flex;
    flex-direction: row;
    .btn{
      margin-right: 15px;
    }
  }

}
.balance{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .btn {
      border: none;
      cursor: pointer;
      appearance: none;
      background-color: inherit;
      transition: all .2s;
      &:active{
        transform: scale(1.3)


      }


    }
    
  }

</style>
