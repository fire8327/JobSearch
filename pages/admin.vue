<template>
    <div v-if="role !== 'admin'" class="grow flex items-center justify-center text-center">
        <p class="text-2xl font-mono font-semibold">Доступ запрещён. Эта страница только для администраторов.</p>
    </div>
    <div v-if="role === 'admin'" class="flex flex-col gap-6">
        <p class="mainHeading">Вакансии</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" v-if="vacancies && vacancies.length > 0">
            <div class="flex flex-col gap-4 p-4 rounded-xl bg-[#141414]/95 text-white shadow-lg" v-for="vacancy in vacancies" :key="vacancy.id">
                <div class="flex items-center gap-2 self-end" v-if="vacancy.status === 'На проверке'">
                    <button type="button" @click="updateVacancyStatus(vacancy.id, 'Одобрена')" :disabled="vacancyUpdating[vacancy.id]" class="cursor-pointer">
                        <Icon class="text-3xl text-green-500" name="material-symbols:check-rounded"/>
                    </button>
                    <button type="button" @click="updateVacancyStatus(vacancy.id, 'Отклонена')" :disabled="vacancyUpdating[vacancy.id]" class="cursor-pointer">
                        <Icon class="text-3xl text-red-500" name="material-symbols:close-small-outline-rounded"/>
                    </button>
                </div>
                <p><span class="font-semibold font-mono">{{ vacancy.name }}</span></p>
                <p><span class="font-semibold font-mono">Компания:</span>{{ vacancy?.employer?.companyName }}</p>
                <p><span class="font-semibold font-mono">Статус:</span>{{ vacancy.status }}</p>
            </div>
        </div>
        <p v-else class="text-2xl font-mono font-semibold text-center">Вакансий пока нет</p>
    </div>
    <div v-if="role === 'admin'" class="flex flex-col gap-6">
        <p class="mainHeading">Резюме</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" v-if="resumes && resumes.length > 0">
            <div class="flex flex-col gap-4 p-4 rounded-xl bg-[#141414]/95 text-white shadow-lg" v-for="resume in resumes" :key="resume.id">
                <div class="flex items-center gap-2 self-end" v-if="resume.status === 'На проверке'">
                    <button type="button" @click="updateResumeStatus(resume.id, 'Одобрено')" :disabled="resumeUpdating[resume.id]" class="cursor-pointer">
                        <Icon class="text-3xl text-green-500" name="material-symbols:check-rounded"/>
                    </button>
                    <button type="button" @click="updateResumeStatus(resume.id, 'Отклонено')" :disabled="resumeUpdating[resume.id]" class="cursor-pointer">
                        <Icon class="text-3xl text-red-500" name="material-symbols:close-small-outline-rounded"/>
                    </button>
                </div>
                <p><span class="font-semibold font-mono">{{ resume.name }}</span></p>
                <p><span class="font-semibold font-mono">Соискатель:</span>{{ resume?.applicant?.surname }} {{ resume?.applicant?.name }}</p>
                <p><span class="font-semibold font-mono">Статус:</span>{{ resume.status }}</p>
            </div>
        </div>
        <p v-else class="text-2xl font-mono font-semibold text-center">Резюме пока нет</p>
    </div>
    <div v-if="role === 'admin'" class="flex flex-col gap-6">
        <p class="mainHeading">Пользователи</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" v-if="users && users.length > 0">
            <template v-for="user in users">
                <div class="flex flex-col gap-4 p-4 rounded-xl bg-[#141414]/95 text-white shadow-lg" v-if="user.role !== 'admin'" :key="user.id">
                    <button type="button" @click="deleteUser(user.id)" :disabled="userDeleting[user.id]" class="cursor-pointer self-end">
                        <Icon class="text-3xl text-red-500" name="material-symbols:delete-outline"/>
                    </button>
                    <p v-if="user.role === 'applicant'"><span class="font-semibold font-mono">Имя:</span> {{ user.applicant[0].surname }} {{ user.applicant[0].name }}</p>
                    <p v-if="user.role === 'employer'"><span class="font-semibold font-mono">Компания:</span> {{ user.employer[0].companyName }}</p>
                    <p><span class="font-semibold font-mono">Почта:</span> {{ user.email }}</p>
                    <p><span class="font-semibold font-mono">Роль:</span> {{ user.role }}</p>
                </div>
            </template>
        </div>
        <p v-else class="text-2xl font-mono font-semibold text-center">Пользователей пока нет</p>
    </div>
</template>

<script setup>
/* название и язык страницы */
useSeoMeta({
    title: 'Админ-панель',
    lang: 'ru'
})


/* подключение сообщений */
const { showMessage } = useMessagesStore()


/* подключение бд и хранилищ */
const supabase = useSupabaseClient()
const userStore = useUserStore()
const { id: userId, role } = userStore


/* управление данными */
const vacancies = ref([])
const resumes = ref([])
const users = ref([])
const vacancyUpdating = ref({})
const resumeUpdating = ref({})
const userDeleting = ref({})

// функции загрузки
const fetchVacancies = async () => {
  try {
    const { data, error } = await supabase
      .from('vacancies')
      .select('*, employer:employers(companyName)')
      .order('id', { ascending: true })
    if (error) throw error
    vacancies.value = data || []
  } catch (error) {
    console.error('Ошибка загрузки вакансий:', error.message)
  }
}

const fetchResumes = async () => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('*, applicant:applicants(name, surname)')
      .order('id', { ascending: true })
    if (error) throw error
    resumes.value = data || []
  } catch (error) {
    console.error('Ошибка загрузки резюме:', error.message)
  }
}

const fetchUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*, applicant:applicants(name, surname), employer:employers(companyName)')
      .order('id', { ascending: true })
    if (error) throw error
    users.value = data || []
  } catch (error) {
    console.error('Ошибка загрузки пользователей:', error.message)
  }
}


/* обновление статуса */
const updateVacancyStatus = async (id, status) => {
  try {
    vacancyUpdating.value[id] = true;
    const { error } = await supabase
      .from('vacancies')
      .update({ status })
      .eq('id', id)
    if (error) throw error
    showMessage('Статус обновлён!', true)
    await fetchVacancies()
  } catch (error) {
    console.error('Ошибка обновления статуса вакансии:', error.message)
  } finally {
    vacancyUpdating.value[id] = false
  }
}

const updateResumeStatus = async (id, status) => {
  try {
    resumeUpdating.value[id] = true;
    const { error } = await supabase
      .from('resumes')
      .update({ status })
      .eq('id', id)
    if (error) throw error
    showMessage('Статус обновлён!', true)
    await fetchResumes()
  } catch (error) {
    console.error('Ошибка обновления статуса резюме:', error.message)
  } finally {
    resumeUpdating.value[id] = false
  }
}


/* удаление пользователя */
const deleteUser = async (id) => {
  try {
    userDeleting.value[id] = true
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw error
    showMessage('Пользователь удалён!', true)
    await fetchUsers()
    await fetchVacancies()
    await fetchResumes()
  } catch (error) {
    console.error('Ошибка удаления пользователя:', error.message)
  } finally {
    userDeleting.value[id] = false
  }
}


/* первоначальная загрузка */
onMounted(async () => {
  await fetchVacancies()
  await fetchResumes()
  await fetchUsers()
})
</script>
