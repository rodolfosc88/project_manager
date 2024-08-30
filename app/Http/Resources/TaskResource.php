<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TaskResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d') ,
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d') ,
            'status' => $this->status,
            'priority' => $this->priority,
            'image_path' => $this->image_path ? Storage::url($this->image_path) : "",
            'project_id' => $this->project_id,
            'project' => new ProjectResource($this->project),
            'assigned_user_id' => $this->assigned_user_id,
            'assignedUser' => $this->assignedUser ? new TaskResource($this->assignedUser) : null,
            'createdBy' => new TaskResource($this->createdBy),
            'updatedBy' => new TaskResource($this->updatedBy),
        ];        
    }
}
