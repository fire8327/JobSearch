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
            <div class="relative w-full md:w-2/3 lg:w-1/2 group rounded-xl overflow-hidden" v-if="userForm.logo">
                <img :src="getLogoUrl(userForm.logo)" alt="" class="object-cover object-center aspect-square w-full">
                <button @click="removeLogoFile" class="absolute inset-0 bg-black/70 flex items-center justify-center transition-all duration-500 [@media(pointer:coarse)]:opacity-100 [@media(pointer:fine)]:opacity-0 group-hover:opacity-100">
                    <Icon class="text-3xl text-red-500" name="material-symbols:delete-outline"/>
                </button>
            </div>
            <FormKit v-else @change="(e) => { logoFile = e.target.files[0] }" accept="image/*" validation="required" messages-class="text-[#E9556D] font-mono" type="file" label="Логотип" name="Логотип" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
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
        <p class="mainHeading">Настройки приватности</p>
        <FormKit :form-attrs="{ autocomplete: 'off' }" @submit="updPrivacy" type="form" :actions="false" messages-class="hidden" form-class="flex flex-col gap-6 items-center justify-center">
            <div class="flex items-center lg:items-start gap-4 max-lg:flex-col w-full md:w-2/3 lg:w-1/2">
                <FormKit v-model="privacyForm.login" validation="required" messages-class="text-[#E9556D] font-mono" type="text" placeholder="Логин" name="Логин" outer-class="w-full lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
                <FormKit v-model="privacyForm.password" validation="required" messages-class="text-[#E9556D] font-mono" type="password" placeholder="Пароль" name="Пароль" outer-class="w-full lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            </div>
            <FormKit v-model="privacyForm.email" validation="required|email" messages-class="text-[#E9556D] font-mono" type="email" placeholder="Email" name="Email" outer-class="w-full md:w-2/3 lg:w-1/2" input-class="focus:outline-none px-4 py-2 bg-white rounded-xl border border-transparent w-full transition-all duration-500 focus:border-indigo-500 shadow-md"/>
            <button :disabled="isLoading" :class="{ 'opacity-50 cursor-not-allowed': isLoading }" type="submit" class="px-4 py-2 border border-indigo-500 bg-indigo-500 text-white rounded-full w-[160px] text-center transition-all duration-500 hover:text-indigo-500 hover:bg-transparent">{{ isLoading ? 'Сохранение...' : 'Сохранить' }}</button>
        </FormKit>
    </div>
    <div v-if="profileCompleted && role !== 'admin'">
        <div class="flex flex-col gap-6" v-if="role === 'employer'">
            <p class="mainHeading">Вакансии</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" v-if="vacancies && vacancies.length > 0">
                <div class="flex flex-col gap-4 p-4 rounded-xl shadow-lg bg-white" v-for="vacancy in vacancies">
                    <button class="cursor-pointer self-end">
                        <Icon class="text-3xl text-red-500" name="material-symbols:delete-outline"/>
                    </button>
                    <p>{{ vacancy.name }}</p>
                    <p class="line-clamp-2">{{ vacancy.desc }}</p>
                    <p><span class="font-semibold font-mono">Опыт: </span>{{ vacancy.exp }}</p>
                    <p><span class="font-semibold font-mono">График: </span>{{ vacancy.schedule }}</p>
                    <p><span class="font-semibold font-mono">Статус: </span>{{ vacancy.status }}</p>
                </div>
                <NuxtLink to="/profile/add-entry" class="flex items-center justify-center gap-4 w-full py-6 bg-white rounded-xl shadow-lg transition-all duration-500 hover:opacity-60">
                    <Icon class="text-3xl" name="material-symbols:add-diamond-rounded"/>
                    <span>Добавить</span>
                </NuxtLink>
            </div>
            <div v-else class="flex flex-col w-full items-center gap-4 text-center">
                <p class="text-2xl font-semibold font-mono">Вы пока ничего не опубликовали</p>
                <NuxtLink to="/profile/add-entry" class="px-4 py-2 border border-indigo-500 bg-indigo-500 text-white rounded-full text-center transition-all duration-500 hover:text-indigo-500 hover:bg-transparent">Добавьте вакансию</NuxtLink>
                <p class="font-semibold font-mono">, чтобы получить первые отклики</p>
            </div>
        </div>
        <div class="flex flex-col gap-6" v-if="role === 'applicant'">
            <p class="mainHeading">Резюме</p>
        </div>
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


    /* получение логотипа */
    const getLogoUrl = (fileName) => {
        const { data } = supabase.storage.from('files/logos').getPublicUrl(fileName)
        return data.publicUrl
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

        if (logoFile.value) {
            const file = logoFile.value
            const extension = file.name.split('.').pop()
            const fileName = `${file.name.split('.')[0]}-${Date.now()}.${extension}`

                
            const { error: uploadError } = await supabase.storage
            .from('files/logos')
            .upload(`${fileName}`, file)

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

        const { error: removeError } = await supabase.storage
        .from('files')
        .remove([`logos/${userForm.value.logo}`])

        // обновляем запись в базе данных
        const { error: updateError } = await supabase
        .from('employers') 
        .update({ logo: null })
        .eq('user_id', userId)

        if(!updateError && !removeError) {
            userForm.value.logo = ''
            showMessage('Логотип удалён!', true)
        } else {
            showMessage('Произошла ошибка!', false)
        }
    }


    /* настройки приватности */
    const privacyForm = ref({
        login: '',
        password: '',
        email: ''
    })

    //получение данных
    const getUserData = async () => {
        const { data:users, error:usersError } = await supabase
        .from('users')
        .select('login, password, email')
        .eq('id', userId)

        if(users) privacyForm.value = { ...users[0] }
    }

    // сохранение данных
    const updPrivacy = async() => {        
        const { error } = await supabase
        .from('users')
        .update(privacyForm.value)
        .eq('id', userId)

        if(!error) {
            showMessage('Данные обновлены!', true)
        } else {
            showMessage('Произошла ошибка!', false)
        }
    }


    /* подключение к бд и получение id, который отправил форму */
    const mainId = ref() // id в зависимости от роли
    const roleTableMap = { // таблица в зависимости от роли
        employer: 'employers',
        applicant: 'applicants'
    }
    
    // функция получения данных
    const fetchProfileData = async(userRole, userId) => {
        const table = roleTableMap[userRole]

        const { data, error } = await supabase
        .from(table)
        .select()
        .eq('user_id', userId)
        .single()

        if (data) {
            mainId.value = data.id
        }
    }    


    /* вакансии */
    const vacancies = ref()
    const getVacanciesData = async () => {
        const { data, error } = await supabase
        .from('vacancies')
        .select()
        .eq('employer_id', mainId.value)
        .order('id', { ascending: true })
        
        if(data) vacancies.value = data
    }


    /* первоначальная загрузка */
    onMounted(async () => {
        loadProfileData()
        getUserData()
        await fetchProfileData(role, userId)
        await getVacanciesData()
    })
</script>