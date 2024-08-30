import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({auth, projects, users}){
    const {data, setData, post, errors, reset} = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        due_date: ''
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("task.store"));
    }
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Criar Nova Atividade</h2>                    
                </div>
            }
        >
            <Head title="Atividades" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                <div>
                                    <InputLabel
                                        htmlFor="task_project_id"
                                        value="Atribuir Atividade ao Projeto"
                                    />
                                    <SelectInput
                                        id="task_project_id"
                                        name="project_id"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('project_id', e.target.value)}
                                    >
                                    <option value="">Escolha um Projeto</option>
                                    {projects.data.map(project => (
                                        <option value={project.id} key={project.id}>{project.name}</option>
                                    ))}
                                    </SelectInput>
                                    <InputError message={errors.priorproject_idity} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_image_path"
                                        value="Imagem da Atividade"
                                    />
                                    <TextInput
                                        id="task_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_name"
                                        value="Nome da Atividade"
                                    />
                                    <TextInput
                                        id="task_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_description"
                                        value="Descrição da Atividade"
                                    />
                                    <TextAreaInput
                                        id="task_description"
                                        type="text"
                                        name="name"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_due_date"
                                        value="Prazo da Atividade"
                                    />
                                    <TextInput
                                        id="task_due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('due_date', e.target.value)}
                                    />
                                    <InputError message={errors.due_date} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_status"
                                        value="Status da Atividade"
                                    />
                                    <SelectInput
                                        id="task_status"
                                        name="status"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                    <option value="">Escolha um Status</option>
                                    <option value="pending">Pendente</option>
                                    <option value="in_progress">Em Andamento</option>
                                    <option value="completed">Finalizado</option>
                                    </SelectInput>
                                    <InputError message={errors.project_status} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_priority"
                                        value="Prioridade da Atividade"
                                    />
                                    <SelectInput
                                        id="task_priority"
                                        name="priority"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('priority', e.target.value)}
                                    >
                                    <option value="">Escolha uma Prioridade</option>
                                    <option value="low">Baixa</option>
                                    <option value="medium">Média</option>
                                    <option value="high">Alta</option>
                                    </SelectInput>
                                    <InputError message={errors.priority} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_assigned_user"
                                        value="Atribuir Atividade ao Usuário"
                                    />
                                    <SelectInput
                                        id="task_assigned_user"
                                        name="assigned_user"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('assigned_user_id', e.target.value)}
                                    >
                                    <option value="">Escolha um Usuário</option>
                                    {users.data.map(user => (
                                        <option value={user.id} key={user.id}>{user.name}</option>
                                    ))}
                                    </SelectInput>
                                    <InputError message={errors.assigned_user_id} className="mt-2"/>
                                </div>
                                
                                <div className="mt-4 text-right">
                                    <Link 
                                        href={route("task.index")}
                                        className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
                                        Cancelar
                                    </Link>
                                    <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                        Salvar
                                    </button>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}