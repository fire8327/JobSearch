<template>
    <div class="flex flex-col gap-6">
        <p class="mainHeading">Данные профиля</p>
        <p v-if="!profileCompleted" class="opacity-50 text-base">* закончите заполнения вашего профиля ниже</p>
        <FormKit v-if="role === 'applicant'" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-6 items-center justify-center">
            <div class="flex items-center lg:items-start gap-4 max-lg:flex-col w-full md:w-2/3 lg:w-1/2">
                <FormKit v-model="userForm.surname" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Фамилия" name="Фамилия" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
                <FormKit v-model="userForm.name" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Имя" name="Имя" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
                <FormKit v-model="userForm.patronymic" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Отчество" name="Отчество" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            </div>
            <FormKit v-model="userForm.phone" validation="required|number" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Телефон" name="Телефон" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            <button :disabled="isLoading" :class="{ 'opacity-50 cursor-not-allowed': isLoading }" type="submit" class="px-4 py-2 border border-indigo-500 bg-indigo-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-indigo-500 hover:bg-transparent">{{ isLoading ? 'Сохранение...' : 'Сохранить' }}</button>
        </FormKit>
        <FormKit v-if="role === 'employer'" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-6 items-center justify-center">
            <div class="flex items-center lg:items-start gap-4 max-lg:flex-col w-full md:w-2/3 lg:w-1/2">
                <FormKit v-model="userForm.companyName" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Наименование" name="Наименование" outer-class="w-full lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
                <FormKit v-model="userForm.inn" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="ИНН" name="ИНН" outer-class="w-full lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            </div>
            <FormKit v-model="userForm.logo" validation="required" messages-class="text-[#E9556D] font-mono" type="file" label="Логотип" name="Логотип" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            <FormKit v-model="userForm.address" validation="required" messages-class="text-[#E9556D] font-mono" type="textarea" placeholder="Адрес компании" name="Адрес компании" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            <FormKit v-model="userForm.desc" validation="required" messages-class="text-[#E9556D] font-mono" type="textarea" placeholder="Описание компании" name="Описание компании" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            <button :disabled="isLoading" :class="{ 'opacity-50 cursor-not-allowed': isLoading }" type="submit" class="px-4 py-2 border border-indigo-500 bg-indigo-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-indigo-500 hover:bg-transparent">{{ isLoading ? 'Сохранение...' : 'Сохранить' }}</button>
        </FormKit>
        <FormKit v-if="role === 'admin'" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-6 items-center justify-center">
            <FormKit v-model="userForm.name" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Имя адинистратора" name="Имя адинистратора" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            <button :disabled="isLoading" :class="{ 'opacity-50 cursor-not-allowed': isLoading }" type="submit" class="px-4 py-2 border border-indigo-500 bg-indigo-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-indigo-500 hover:bg-transparent">{{ isLoading ? 'Сохранение...' : 'Сохранить' }}</button>
        </FormKit>
    </div>
</template>

<script setup>
    /* проверка роли и создание сообщений */
    const { role, profileCompleted } = useUserStore()
    const { showMessage } = useMessagesStore()


    /* данные профиля */
    const isLoading = ref(false) //сохранение данных


    /* редактирование данных */
    const isEditing = ref(false) 

    // начало редактирования
    const startEditing = () => {
        isEditing.value = true
    }


    // отмена редактирования
    const cancelEditing = () => {
        isEditing.value = false
        if (role.value === 'applicant' && applicantData.value) userForm.value = { ...applicantData.value }
        else if (role.value === 'employer' && employerData.value) userForm.value = { ...employerData.value }
        else if (role.value === 'admin' && adminData.value) userForm.value = { ...adminData.value }
        logoFile.value = null
    }

    
    /* форма пользователя в зависимости от роли */
    const userForm = ref(
        role.value === 'applicant'
        ? { surname: '', name: '', patronymic: '', phone: '' }
        : role.value === 'employer'
        ? { companyName: '', inn: '', address: '', desc: '', logo: '' }
        : { name: '' }
    )

    // отдельные поля для работодателя
    const employerData = ref(null)
    const logoFile = ref(null)


    // отдельные поля для соискателя
    const applicantData = ref(null)

    // отдельны поля для администратора
    const adminData = ref(null)
</script>