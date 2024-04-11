import { Draggable, Droppable } from "react-beautiful-dnd";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiSend } from "react-icons/fi";

const TodoOngoing = ({ tasks, handleUpdate, handleDelete, handleNext }) => {
  return (
    <div className="flex flex-col gap-8 border-x-2 h-[50vh] lg:h-full px-2">
      <h3 className="text-center font-semibold text-xl border-b-2 border-orange-500 w-max mx-auto pt-2">
        Ongoing Task
      </h3>
      <div className="overflow-x-auto px-2 flex-1">
        <Droppable droppableId="droppable-2">
          {(provided) => (
            <div
              className="  rounded-none  w-full h-full"
              {...provided.droppableProps}
              ref={provided.innerRef}>
              <div className=" space-y-4">
                {tasks
                  ?.filter((task) => task.droppableId === "droppable-2")
                  .map((task, idx) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={idx}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`text-left px-5 py-2 hover:bg-gray-300  rounded-l-lg flex justify-between ${
                            Date.parse(task.taskDate) <
                            Date.now() + 2 * 24 * 60 * 60 * 1000
                              ? "bg-gradient-to-br from-[#FF0000] to-[#c07878] text-white"
                              : ""
                          } ${
                            task.taskPriority === "Low"
                              ? "border-l-[10px] border-l-light-blue-400 border-[1px] border-light-blue-400"
                              : task.taskPriority === "Moderate"
                              ? "border-l-[10px] border-l-yellow-600 border-[1px] border-yellow-600"
                              : task.taskPriority === "High"
                              ? "border-l-[10px] border-l-red-400 border-[1px] border-red-400"
                              : ""
                          }`}>
                          {/* Render task details */}
                          <div className="flex flex-col w-full">
                            <div className="flex flex-row justify-between ">
                              <div className="text-lg font-bold lg:pb-2">
                                <span>Task: </span>
                                {task.taskName}
                              </div>
                              <div>
                                <div className=" space-x-3 flex flex-row items-center justify-center">
                                  <button
                                    data-tip="Update"
                                    onClick={() => handleUpdate(task)}
                                    className="tooltip tooltip-left">
                                    <RxUpdate
                                      className={`text-green-500 text-xl lg:hover:scale-150 duration-300 transition ${
                                        Date.parse(task.taskDate) <
                                        Date.now() + 2 * 24 * 60 * 60 * 1000
                                          ? " text-white "
                                          : ""
                                      }`}
                                    />
                                  </button>
                                  <button
                                    className="tooltip tooltip-left"
                                    data-tip="Delete"
                                    onClick={() => handleDelete(task._id)}>
                                    <RiDeleteBin6Line
                                      className={`text-red-500 text-xl lg:hover:scale-150 duration-300 transition ${
                                        Date.parse(task.taskDate) <
                                        Date.now() + 2 * 24 * 60 * 60 * 1000
                                          ? " text-white "
                                          : ""
                                      }`}
                                    />
                                  </button>
                                  <button
                                    className="tooltip tooltip-left"
                                    data-tip="Move to Ongoing"
                                    onClick={() => handleNext(task._id)}>
                                    <FiSend
                                      className={`text-blue-400 text-xl lg:hover:scale-150 duration-300 transition ${
                                        Date.parse(task.taskDate) <
                                        Date.now() + 2 * 24 * 60 * 60 * 1000
                                          ? " text-white "
                                          : ""
                                      }`}
                                    />
                                  </button>
                                </div>
                              </div>
                              {/* Action button */}
                            </div>
                            <div className="hidden lg:flex flex-col">
                              <div>
                                <span className="font-bold">Deadline: </span>
                                {task.taskDate}
                              </div>
                              <div>
                                <span className="font-bold">Priority: </span>
                                {task.taskPriority}
                              </div>
                              <div className="w-full h-full flex-wrap">
                                <span className="font-bold text-justify">
                                  Decription:{" "}
                                </span>
                                {task.taskDescription}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TodoOngoing;
