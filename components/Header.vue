<template>
    <header class="grid-container py-4 text-lg font-medium relative">
        <div class="w-full flex items-center gap-6 justify-between rounded-xl shadow-[0px_0px_20px_-13px_black] px-4 py-2 bg-white">
            <NuxtLink to="/" class="flex items-center gap-2 text-indigo-500 transition-all duration-500 hover:opacity-70">
                <Icon class="text-3xl" name="hugeicons:job-search"/>
                <span class="text-xl font-mono font-semibold">JobSearch</span>
            </NuxtLink>
            <div class="flex items-center gap-6 max-lg:absolute max-lg:w-full max-lg:flex-col max-lg:py-6 max-lg:bg-white max-lg:left-0 max-lg:border-t border-indigo-500 transition-all duration-500 z-[5]" :class="isMenuShow ? 'max-lg:top-full' : 'max-lg:top-0 max-lg:-translate-y-full'">
                <!-- <form class="relative">
                    <input type="text" class="border border-indigo-200 rounded-xl transition-all duration-500 focus:border-indigo-500 focus:outline-none py-1.5 pl-4 pr-8">
                    <button class="flex absolute top-1/2 -translate-y-1/2 right-2">
                        <Icon class="text-3xl text-indigo-500" name="ic:round-search"/>
                    </button>
                </form> -->
                <NuxtLink to="/">Главная</NuxtLink>
                <NuxtLink to="/vacancies" v-if="userStore.role === 'applicant'">Вакансии</NuxtLink>
                <NuxtLink to="/resumes" v-if="userStore.role === 'employer'">Резюме</NuxtLink>
                <NuxtLink to="/admin" v-if="userStore.role === 'admin'">Админ-панель</NuxtLink>
                <NuxtLink to="/about">О нас</NuxtLink>
                <NuxtLink to="/auth" class="flex">
                    <Icon class="text-3xl text-indigo-500" name="material-symbols:person"/>
                </NuxtLink>
            </div>
            <button @click="isMenuShow = !isMenuShow" class="lg:hidden flex cursor-pointer">
                <Icon class="text-3xl text-indigo-500" name="ic:round-menu"/>
            </button>
        </div>
        <div @click="isMenuShow = false" class="lg:hidden fixed z-[4] inset-0 bg-black/30 top-[85px]" :class="{'max-lg:hidden' : !isMenuShow}"></div>
        <button type="button" @click="messageTitle = null" class="fixed top-10 right-10 z-[11] cursor-pointer flex items-center gap-2 px-6 py-2 text-lg rounded-xl w-fit font-medium font-mono bg-white border border-[#131313]/10 shadow-[0px_0px_13px_-7px_#131313]" :class="messageType ? ' text-[#131313]/80' : 'text-red-500'" v-if="messageTitle">
            <Icon class="text-3xl" name="material-symbols:close-small-rounded"/>
            <span>{{messageTitle}}</span>
        </button>
    </header>
</template>

<script setup>
/* создание сообщений */
const { messageTitle, messageType } = storeToRefs(useMessagesStore())


/* проверка роли */
const userStore = useUserStore()


/* открытие мобильного меню */
const isMenuShow = ref(false) 


/* закрытие мобильного меню */
const nuxtApp = useNuxtApp()
nuxtApp.hook('page:start', () => {
    isMenuShow.value = false
})
</script>