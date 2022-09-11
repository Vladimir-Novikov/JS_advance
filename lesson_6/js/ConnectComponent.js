Vue.component('connect', {
    template: `<div v-if="$parent.error">
                    <p>Ошибка подключения</p>
               </div>`
});