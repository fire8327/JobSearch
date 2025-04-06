<template>
    <header class="grid-container py-4 text-lg font-medium">
        <div class="w-full flex items-center gap-6 justify-between rounded-xl shadow-[0px_0px_20px_-13px_black] px-4 py-2 bg-white">
            <NuxtLink to="/" class="flex items-center gap-2 text-indigo-500 transition-all duration-500 hover:opacity-70">
                <Icon class="text-3xl" name="hugeicons:job-search"/>
                <span class="text-xl font-mono font-semibold">JobSearch</span>
            </NuxtLink>
            <div class="flex items-center gap-6">
                <form class="relative">
                    <input type="text" class="border border-indigo-200 rounded-xl transition-all duration-500 focus:border-indigo-500 focus:outline-none py-1.5 pl-4 pr-8">
                    <button class="flex absolute top-1/2 -translate-y-1/2 right-2">
                        <Icon class="text-3xl text-indigo-500" name="ic:round-search"/>
                    </button>
                </form>
                <NuxtLink to="/">Главная</NuxtLink>
                <NuxtLink to="/">Вакансии</NuxtLink>
                <NuxtLink to="/">Сервисы</NuxtLink>
                <NuxtLink to="/" class="flex">
                    <Icon class="text-3xl text-indigo-500" name="material-symbols:person"/>
                </NuxtLink>
            </div>
            <button class="lg:hidden flex">
                <Icon class="text-3xl text-indigo-500" name="ic:round-menu"/>
            </button>
        </div>
    </header>
</template>

<script setup>

</script>