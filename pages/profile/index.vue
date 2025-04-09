<template>
    <div class="flex flex-col gap-6">
        <p class="mainHeading">Данные профиля</p>
        <p v-if="!profileCompleted" class="opacity-50 text-base">* закончите заполнения вашего профиля ниже</p>
        <FormKit @submit="saveProfile" v-if="role === 'applicant'" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-6 items-center justify-center">
            <div class="flex items-center lg:items-start gap-4 max-lg:flex-col w-full md:w-2/3 lg:w-1/2">
                <FormKit v-model="userForm.surname" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Фамилия" name="Фамилия" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
                <FormKit v-model="userForm.name" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Имя" name="Имя" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
                <FormKit v-model="userForm.patronymic" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Отчество" name="Отчество" outer-class="w-full lg:w-1/3" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            </div>
            <FormKit v-model="userForm.phone" validation="required|number" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Телефон" name="Телефон" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            <button :disabled="isLoading" :class="{ 'opacity-50 cursor-not-allowed': isLoading }" type="submit" class="px-4 py-2 border border-indigo-500 bg-indigo-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-indigo-500 hover:bg-transparent">{{ isLoading ? 'Сохранение...' : 'Сохранить' }}</button>
        </FormKit>
        <FormKit @submit="saveProfile" v-if="role === 'employer'" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-6 items-center justify-center">
            <div class="flex items-center lg:items-start gap-4 max-lg:flex-col w-full md:w-2/3 lg:w-1/2">
                <FormKit v-model="userForm.companyName" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Наименование" name="Наименование" outer-class="w-full lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
                <FormKit v-model="userForm.inn" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="ИНН" name="ИНН" outer-class="w-full lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            </div>
            {{ userForm.logo }}
            <FormKit v-if="!userForm.logo" v-model="logoFile" accept="image/*" validation="required" messages-class="text-[#E9556D] font-mono" type="file" label="Логотип" name="Логотип" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            <div class="relative w-full md:w-2/3 lg:w-1/2" v-else>
                <img :src="`https://unhdwdwoeepepaliejow.supabase.co/storage/v1/object/public/files/logos/${userForm.logo}`" alt="">
            </div>
            <FormKit v-model="userForm.address" validation="required" messages-class="text-[#E9556D] font-mono" type="textarea" placeholder="Адрес компании" name="Адрес компании" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            <FormKit v-model="userForm.desc" validation="required" messages-class="text-[#E9556D] font-mono" type="textarea" placeholder="Описание компании" name="Описание компании" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            <button :disabled="isLoading" :class="{ 'opacity-50 cursor-not-allowed': isLoading }" type="submit" class="px-4 py-2 border border-indigo-500 bg-indigo-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-indigo-500 hover:bg-transparent">{{ isLoading ? 'Сохранение...' : 'Сохранить' }}</button>
        </FormKit>
        <FormKit @submit="saveProfile" v-if="role === 'admin'" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-6 items-center justify-center">
            <FormKit v-model="userForm.name" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Имя адинистратора" name="Имя адинистратора" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            <button :disabled="isLoading" :class="{ 'opacity-50 cursor-not-allowed': isLoading }" type="submit" class="px-4 py-2 border border-indigo-500 bg-indigo-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-indigo-500 hover:bg-transparent">{{ isLoading ? 'Сохранение...' : 'Сохранить' }}</button>
        </FormKit>
    </div>
    <div class="flex flex-col gap-6">
        <p class="mainHeading">Выход</p>
        <button @click="logout" class="px-4 py-2 border border-indigo-500 bg-indigo-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-indigo-500 hover:bg-transparent">Выйти</button>
    </div>
</template>

<script setup>
    /* проверка роли и создание сообщений */
    const { id:userId, role, profileCompleted, updateProfileCompleted, logout } = useUserStore()
    const { showMessage } = useMessagesStore()


    /* подключение БД и роутера */
    const supabase = useSupabaseClient()
    const router = useRouter()


    /* загрузка и логотип */
    const isLoading = ref(false)
    const logoFile = ref(null)


    /* форма пользователя в зависимости от роли */
    const userForm = ref({
        // Общие поля
        name: '',
        // Поля для applicant
        surname: '',
        patronymic: '',
        phone: '',
        // Поля для employer
        companyName: '',
        inn: '',
        address: '',
        desc: '',
        logo: ''
    })


    /* данные профиля и их загрузка */
    const loadProfileData = async () => {
        if (role === 'applicant') {
            const { data, error } = await supabase
            .from('applicants')
            .select()
            .eq('user_id', userId)
            .single()

            if (error) throw error

            if (data) userForm.value = { ...data }
        } else if (role === 'employer') {
            const { data, error } = await supabase
            .from('employers')
            .select()
            .eq('user_id', userId)
            .single()

            if (error) throw error

            if (data) userForm.value = { ...data }
        } else if (role === 'admin') {
            const { data, error } = await supabase
            .from('admins')
            .select()
            .eq('user_id', userId)
            .single()

            if (error) throw error

            if (data) userForm.value = { ...data }
        }
    }



    /* сохранение профиля */
    const saveProfile = async () => {
        isLoading.value = true

        try {
            if (role === 'applicant') {
                await saveApplicantProfile()
            } else if (role === 'employer') {
                await saveEmployerProfile()
            } else if (role === 'admin') {
                await saveAdminProfile()
            }
            await updateProfileCompleted()
            showMessage(profileCompleted ? 'Профиль обновлён!' : 'Профиль создан!', true)
        } catch (error) {
            showMessage('Ошибка при сохранении: ' + error.message, false)
        } finally {
            isLoading.value = false
        }
    }

    // соискатель 
    const saveApplicantProfile = async () => {
        if (!profileCompleted) {
            const { error } = await supabase.from('applicants').insert({
                user_id: userId,
                surname: userForm.value.surname,
                name: userForm.value.name,
                patronymic: userForm.value.patronymic,
                phone: userForm.value.phone,
            })
            if (error) throw error
        } else {
            const { error } = await supabase
                .from('applicants')
                .update({
                    surname: userForm.value.surname,
                    name: userForm.value.name,
                    patronymic: userForm.value.patronymic,
                    phone: userForm.value.phone,
                })
                .eq('user_id', userId)
            if (error) throw error
        }
    }

    //работодатель
    const saveEmployerProfile = async () => {
        let logoFileName = userForm.value.logo

        if (logoFile.value && logoFile.value.length > 0) {
           /*  if(userForm.value.logo) {
                await removeLogoFile()
            } */

            const file = logoFile.value[0]
            const fileName = `${userId}/${Date.now()}-${file.name}`
            const { error: uploadError } = await supabase.storage
                .from('files/logos')
                .upload(fileName, file)
            if (uploadError) throw uploadError
            logoFileName = fileName
            userForm.value.logo = fileName
        }

        if (!profileCompleted) {
            const { error } = await supabase.from('employers').insert({
                user_id: userId,
                companyName: userForm.value.companyName,
                inn: userForm.value.inn,
                address: userForm.value.address,
                desc: userForm.value.desc,
                logo: logoFileName,
            })
            if (error) throw error
        } else {
            const { error } = await supabase
                .from('employers')
                .update({
                    companyName: userForm.value.companyName,
                    inn: userForm.value.inn,
                    address: userForm.value.address,
                    desc: userForm.value.desc,
                    logo: logoFileName,
                })
                .eq('user_id', userId)
            if (error) throw error
        }
        logoFile.value = null
    }

    // администратор
    const saveAdminProfile = async () => {
        if (!profileCompleted) {
            const { error } = await supabase.from('admins').insert({
                user_id: userId,
                name: userForm.value.name,
            })
            if (error) throw error
        } else {
            const { error } = await supabase
                .from('admins')
                .update({
                    name: userForm.value.name,
                })
                .eq('user_id', userId)
            if (error) throw error
        }
    }


    /* удаление логотипа */
    const removeLogoFile = async () => {
        if (!userForm.value.logo) return
        try {
            const { error } = await supabase.storage
                .from('files/logos')
                .remove([userForm.value.logo])
            if (error) throw error
            userForm.value.logo = ''
            await supabase
                .from('employers')
                .update({ logo: null })
                .eq('user_id', userId)
            showMessage('Логотип удалён!', true)
        } catch (error) {
            showMessage('Ошибка при удалении логотипа: ' + error.message, false)
        }
    }

    onMounted(loadProfileData)
</script>