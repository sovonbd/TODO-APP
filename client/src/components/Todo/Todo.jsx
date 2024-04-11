import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import { DragDropContext } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { format, parse } from "date-fns";
import TodoNew from "./TodoNew";
import TodoOngoing from "./TodoOngoing";
import TodoCompleted from "./TodoCompleted";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Todo = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [currentDate] = useState(new Date().toISOString().split("T")[0]);

  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();

  const { isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks/${user?.email}`);
      setTasks(res.data);
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (item) => {
      const res = await axiosPublic.post("/createTask", item);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        toast.success("Successfully created a task!");
        reset();
        refetch();
      }
    },
  });

  const onSubmit = async (data) => {
    const item = {
      taskName: data.name,
      taskDescription: data.description,
      taskDate: format(new Date(`${data.date}T00:00:00`), "MMM dd, yyyy", {
        timeZone: "America/Winnipeg",
      }),
      taskPriority: data.priority,
      userEmail: user.email,
      droppableId: "droppable-1",
    };

    mutate(item);

    setShowModal(false);
  };

  const onUpdate = (data) => {
    const updatedItem = {
      taskName: data.name,
      taskDescription: data.description,
      taskDate: format(new Date(`${data.date}T00:00:00`), "MMM dd, yyyy", {
        timeZone: "America/Winnipeg",
      }),
      taskPriority: data.priority,
    };

    axiosPublic.patch(`/tasks/${selectedTask._id}`, updatedItem).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        toast.success("Successfully updated!");
        reset();
      }
      refetch();
    });

    setShowModal(false);
  };

  const handleUpdate = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    // console.log(id);
    axiosPublic.delete(`/${id}`).then((res) => {
      // console.log(res.data);
      if (res.data.deletedCount > 0) {
        toast.error("Task Deleted!");
      }
      refetch();
    });
  };

  const handleNext = (id) => {
    axiosPublic.patch(`/update-tasks`, { id: id }).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-dots loading-lg text-[#F36527] text-xl"></span>
      </div>
    );
  }

  const onDragEnd = async (result) => {
    const { destination } = result;

    if (!destination) {
      return;
    }

    const draggedTask = tasks.find((task) => task._id === result.draggableId);

    const updatedTasks = tasks.filter(
      (task) => task._id !== result.draggableId
    );

    if (destination.droppableId === "droppable-1") {
      draggedTask.droppableId = "droppable-1";
      updatedTasks.splice(destination.index, 0, draggedTask);
    } else if (destination.droppableId === "droppable-2") {
      draggedTask.droppableId = "droppable-2";
      updatedTasks.splice(destination.index, 0, draggedTask);
    } else if (destination.droppableId === "droppable-3") {
      draggedTask.droppableId = "droppable-3";
      updatedTasks.splice(destination.index, 0, draggedTask);
    }

    try {
      await axiosPublic.patch(`/tasks/${draggedTask._id}`, {
        droppableId: draggedTask.droppableId,
      });

      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task droppableId:", error);
    }
    refetch();
  };

  return (
    <div className="my-5 space-y-5">
      <div className="text-center">
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-circle w-max bg-[#F36527] px-8 md:text-lg text-white normal-case border-[#F36527] hover:text-inherit transition duration-700 ease-in-out hover:bg-transparent hover:border-[#F36527] hover:border-2 mt-4">
          Create A Task
        </button>
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 overflow-y-auto">
            <div className="modal-backdrop fixed inset-0 bg-black opacity-50"></div>
            <div className="modal-content p-6 bg-white rounded-lg shadow-lg z-50 w-[90%] md:max-w-md h-[90vh] lg:h-auto overflow-y-auto">
              <h3 className="font-bold text-lg mb-4">
                {selectedTask ? "Update Task" : "Create a new task"}
              </h3>
              <form
                onSubmit={handleSubmit(selectedTask ? onUpdate : onSubmit)}
                className="space-y-4">
                <label className="block">
                  <span className="text-gray-700 flex">Task Name</span>
                  <input
                    name="name"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full mt-1"
                    {...register("name", { required: true })}
                    defaultValue={selectedTask ? selectedTask.taskName : ""}
                  />
                </label>

                <label className="">
                  <span className="text-gray-700 flex mt-4">Task Deadline</span>
                  <input
                    name="date"
                    type="date"
                    className="input input-bordered w-full mt-1"
                    {...register("date", { required: true })}
                    defaultValue={
                      selectedTask
                        ? format(
                            parse(
                              selectedTask.taskDate,
                              "MMM dd, yyyy",
                              new Date()
                            ),
                            "yyyy-MM-dd"
                          )
                        : ""
                    }
                    min={currentDate}
                  />
                </label>
                <label className="">
                  <span className="text-gray-700 flex mt-4">Task Priority</span>
                  <select
                    name="priority"
                    type="text"
                    className="input input-bordered w-full mt-1"
                    {...register("priority", { required: true })}
                    defaultValue={
                      selectedTask ? selectedTask.taskPriority : ""
                    }>
                    <option>Low</option>
                    <option>Moderate</option>
                    <option>High</option>
                  </select>
                </label>
                <label className="">
                  <span className="text-gray-700 flex mt-4">
                    Task Description
                  </span>
                  <textarea
                    name="description"
                    type="text"
                    placeholder="Type your description"
                    className="input input-bordered w-full mt-1"
                    style={{ height: "100px" }}
                    {...register("description", { required: true })}
                    defaultValue={
                      selectedTask ? selectedTask.taskDescription : ""
                    }
                  />
                </label>
                <button
                  type="submit"
                  className="btn bg-[#F36527] px-8 md:text-lg text-white normal-case border-[#F36527] hover:text-inherit hover:bg-transparent hover:border-[#F36527] hover:border-2 mt-4">
                  {selectedTask ? "Update" : "Create"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center h-full">
          <TodoNew
            tasks={tasks}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            handleNext={handleNext}
          />
          <TodoOngoing
            tasks={tasks}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            handleNext={handleNext}
          />
          <TodoCompleted
            tasks={tasks}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Todo;
