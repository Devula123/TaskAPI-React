import React from 'react';
import { useForm, router, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';

export default function Index({ tasks, auth }: { tasks: any[], auth: any }) {
    

    const { data, setData, post, reset, processing } = useForm({ 
        title: '' 
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tasks', { 
            onSuccess: () => reset() 
        });
    };

    return (
        <>
            <Head title="Moje Zadania" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="max-w-4xl mx-auto w-full">
                    <div className="bg-white dark:bg-neutral-900 overflow-hidden shadow-sm sm:rounded-lg p-6 border border-sidebar-border/70">
                        
                        {/* 1. Formularz dodawania */}
                        <form onSubmit={submit} className="flex mb-8 gap-4">
                            <input 
                                type="text" 
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm flex-1 text-black dark:text-white"
                                placeholder="Wpisz nowe zadanie..."
                                required
                            />
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                            >
                                Dodaj
                            </button>
                        </form>

                        {/* 2. Lista zadań */}
                        <ul className="divide-y divide-gray-200 dark:divide-neutral-700">
                            {tasks.map(task => (
                                <li key={task.id} className="py-4 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="checkbox"
                                            checked={!!task.is_completed}
                                            onChange={() => router.patch(`/tasks/${task.id}`)}
                                            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                                        />
                                        
                                        <span className={`text-lg ${task.is_completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                                            {task.title}
                                        </span>
                                    </div>

                                    <button 
                                        onClick={() => router.delete(`/tasks/${task.id}`)}
                                        className="text-red-500 hover:text-red-700 font-semibold text-sm"
                                    >
                                        Usuń
                                    </button>
                                </li>
                            ))}

                            {tasks.length === 0 && (
                                <p className="text-center text-gray-500 mt-4">Brak zadań. Dodaj coś!</p>
                            )}
                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => (
    <AppLayout 
        breadcrumbs={[
            { title: 'Dashboard', href: dashboard() },
            { title: 'Zadania', href: '/tasks' }
        ]}
    >
        {page}
    </AppLayout>
);