<template>
    <div class="relative w-full overflow-hidden rounded-xl">
        <img src="/images/hero/main.jpg" alt="" class="w-full aspect-video object-cover object-center max-md:aspect-[7/11]">
        <div class="absolute inset-0 bg-black/30"></div>
        <div class="absolute inset-0 py-10 px-4 flex justify-center items-center text-center text-white">
            <div class="flex flex-col items-center relative gap-6 w-fit p-4 lg:p-6 max-w-2xl">
                <div class="absolute inset-0 backdrop-blur-md rounded-xl"></div>
                <p class="text-3xl font-mono font-semibold z-[1] max-w-lg">Работа, которая легко встраивается в жизнь</p>
                <p class="opacity-70 text-lg tracking-wide z-[1] max-w-xl">
                    Ищете занятие, которое не будет мешать личному времени, семье и увлечениям? 
                </p>
                <NuxtLink to="/" class="bg-indigo-500 text-white rounded-lg z-[1] py-1.5 px-4 transition-all duration-500 hover:opacity-70">Смотреть вакансии</NuxtLink>
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-6">
        <p class="mainHeading">Как начать работать</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="flex flex-col gap-6 rounded-xl bg-gray-200 p-4 items-center text-center">
                <p class="px-8 py-1.5 text-3xl font-mono bg-indigo-500 text-white rounded-lg">1</p>
                <p class="text-2xl font-mono font-semibold">Отклик</p>
                <p>Откликнитесь на вакансию</p>
            </div>
            <div class="flex flex-col gap-6 rounded-xl bg-gray-200 p-4 items-center text-center">
                <p class="px-8 py-1.5 text-3xl font-mono bg-indigo-500 text-white rounded-lg">2</p>
                <p class="text-2xl font-mono font-semibold">Отбор</p>
                <p>Пройдите интервью и/или тестовое задание</p>
            </div>
            <div class="flex flex-col gap-6 rounded-xl bg-gray-200 p-4 items-center text-center">
                <p class="px-8 py-1.5 text-3xl font-mono bg-indigo-500 text-white rounded-lg">3</p>
                <p class="text-2xl font-mono font-semibold">Оформление</p>
                <p>Подпишите договор и другие документы</p>
            </div>
            <div class="flex flex-col gap-6 rounded-xl bg-gray-200 p-4 items-center text-center">
                <p class="px-8 py-1.5 text-3xl font-mono bg-indigo-500 text-white rounded-lg">4</p>
                <p class="text-2xl font-mono font-semibold">Работа</p>
                <p>Пройдите обучение и начинайте работу</p>
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-6">
        <p class="mainHeading">Почему у нас классно</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-6 items-center text-center">
                <img src="/images/advantages/1.png" alt="" class="w-full lg:w-1/2">
                <p class="text-2xl font-mono font-semibold">Комфорт и баланс</p>
                <p class="max-w-lg">Без привязки к офису и строгому расписанию — у нас удалёнка и удобный график. У вас будет время на обучение, развитие и личные дела</p>
            </div>
            <div class="flex flex-col gap-6 items-center text-center">
                <img src="/images/advantages/2.png" alt="" class="w-full lg:w-1/2">
                <p class="text-2xl font-mono font-semibold">Гарантии и бонусы</p>
                <p class="max-w-lg">Трудоустройство официальное, с отпусками, больничными, выплатами без задержек. Скидки от партнёров и на продукты Яндекса</p>
            </div>
            <div class="flex flex-col gap-6 items-center text-center">
                <img src="/images/advantages/3.png" alt="" class="w-full lg:w-1/2">
                <p class="text-2xl font-mono font-semibold">Забота о сотрудниках</p>
                <p class="max-w-lg">Организуем чаты, внутреннюю помощь и поддержку, тематические активности — чтобы на удалёнке расстояние между людьми не ощущалось</p>
            </div>
            <div class="flex flex-col gap-6 items-center text-center">
                <img src="/images/advantages/4.png" alt="" class="w-full lg:w-1/2">
                <p class="text-2xl font-mono font-semibold">Работа со смыслом</p>
                <p class="max-w-lg">Неважно, какая у вас специальность: каждый сотрудник Яндекс Крауда помогает улучшать сервисы Яндекса</p>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>