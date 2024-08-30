import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";


export default function Index({auth, projects, queryParams = null, success}) {
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value){
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('project.index', queryParams))
    }

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route('project.index', queryParams))
    }

    const deleteProject = (project) => {
        if (!window.confirm('Você tem certeza que deseja excluir este Projeto?')){
            return;
        }
        router.delete(route('project.destroy', project.id))
    }
    
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projetos</h2>
                    <Link href={route('project.create')} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                        Adicionar Novo
                    </Link>
                </div>
            }
        >
            <Head title="Projetos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">                            
                            <div className="overflow-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <TableHeading 
                                            name="id"
                                            sort_field={queryParams.sort_field} 
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                        ID
                                        </TableHeading>
                                        <th className="px-3 py-3">Imagem</th>
                                        <TableHeading 
                                            name="name"
                                            sort_field={queryParams.sort_field} 
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                        Projeto 
                                        </TableHeading>
                                        <TableHeading 
                                            name="status"
                                            sort_field={queryParams.sort_field} 
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                        Status
                                        </TableHeading>
                                        <TableHeading 
                                            name="created_at"
                                            sort_field={queryParams.sort_field} 
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                        Data Criação
                                        </TableHeading>
                                        <TableHeading 
                                            name="due_date"
                                            sort_field={queryParams.sort_field} 
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                        Data Final
                                        </TableHeading>
                                        <th className="px-3 py-3">Criado por</th>
                                        <th className="px-3 py-3 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput 
                                                className="w-full" 
                                                defaultValue={queryParams.name}
                                                placeholder="Nome do Projeto"
                                                onBlur={(e) => searchFieldChanged('name', e.target.value)}    
                                                onKeyPress={(e) => onKeyPress('name', e)}
                                            />
                                        </th>
                                        <th className="px-3 py-3">
                                            <SelectInput 
                                                className="w-full" 
                                                defaultValue={queryParams.status}
                                                onChange={(e) => 
                                                    searchFieldChanged('status', e.target.value)
                                                }
                                            >
                                                <option value="">Escolha um Status</option>
                                                <option value="pending">Pendente</option>
                                                <option value="in_progress">Em Andamento</option>
                                                <option value="completed">Finalizado</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                                            <td className="px-3 py-2">{project.id}</td>
                                            <td className="px-3 py-2">
                                                <img src={project.image_path} style={{width: 60}}/>
                                            </td>
                                            <td className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                                                <Link href={route("project.show", project.id)}>
                                                {project.name}
                                                </Link>
                                            </td>
                                            <th className="px-3 py-2 text-nowrap">
                                                <span className={
                                                    "px-2 py-1 rounded text-white" +
                                                    PROJECT_STATUS_CLASS_MAP[project.status]
                                                }
                                                >
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                </span>                                                
                                            </th>
                                            <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                                            <td className="px-3 py-2">{project.createdBy.name}</td>
                                            <td className="px-3 py-2 flex text-nowrap">
                                                <Link href={route('project.edit', project.id)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </Link>
                                                <button 
                                                    onClick={(e) => deleteProject(project)}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}                                    
                                </tbody>
                            </table>
                            </div>
                            <Pagination links={projects.meta.links}></Pagination>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}