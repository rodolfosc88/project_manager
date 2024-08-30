<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index() {
        $user = auth()->user();
        $totalPendingTasks = Task::query()->where('status', 'pending')->count();
        $totalProgressTasks = Task::query()->where('status', 'in_progress')->count();
        $totalCompletedTasks = Task::query()->where('status', 'completed')->count();

        $myPendingTasks = Task::query()->where('status', 'pending')->where('assigned_user_id', $user->id)->count();
        $myProgressTasks = Task::query()->where('status', 'in_progress')->where('assigned_user_id', $user->id)->count();
        $myCompletedTasks = Task::query()->where('status', 'completed')->where('assigned_user_id', $user->id)->count();

        $activeTasks = Task::query()->whereIn('status', ['pending','in_progress'])->where('assigned_user_id', $user->id)->limit(10)->get();
        $activeTasks = TaskResource::collection($activeTasks);

        return inertia('Dashboard',
            compact(
                'totalPendingTasks',
                'totalProgressTasks',
                'totalCompletedTasks', 
                'myPendingTasks',
                'myProgressTasks', 
                'myCompletedTasks',
                'activeTasks'
            ));
    }
}
