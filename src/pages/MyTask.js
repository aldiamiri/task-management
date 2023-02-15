import React from "react";
import { useSelector } from "react-redux";
import useCompare from "../hooks/useCompare";
import useGetTask from "../hooks/useGetTask";
import CardTask from "../component/CardTask";
import LoadingSkeleton from "../component/LoadingSkeleton";

const MyTask = () => {
  const auth = useSelector((state) => state.user);
  const { tasks } = useGetTask();
  const { isInWork, isCompleted, isDueDate } = useCompare();

  // Get Data MyTask
  const myTasks = tasks.filter((task) => task.users.find((user) => user.id === auth.userId));

  // Data On Progress (Task In Work)
  const taskAtWork = myTasks.filter((task) => isInWork(task));

  // Data Completed
  const taskCompleted = myTasks.filter((task) => isCompleted(task));

  // Data Duedate
  const taskDueDate = myTasks.filter((task) => isDueDate(task));

  return (
    <div className="flex gap-4">
      {/* Taks */}
      <div className="basis-4/12 ">
        <header className="uppercase border-blue-500 border-b-4 py-3 font-bold">
          Tasks In Work
          <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">{taskAtWork.length}</span>
        </header>
        <div className="pt-7 flex flex-col gap-6">
          {taskAtWork.map((task) => (
            <CardTask key={task.id} task={task} />
          ))}
          {tasks.length === 0 && <LoadingSkeleton />}
        </div>
      </div>
      {/* Completed Tasks */}
      <div className="basis-4/12 ">
        <header className="uppercase border-green-500 border-b-4 py-3 font-bold">
          Completed Tasks
          <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">{taskCompleted.length}</span>
        </header>
        <div className="pt-7 flex flex-col gap-6">
          {taskCompleted.map((task) => (
            <CardTask key={task.id} task={task} />
          ))}
          {tasks.length === 0 && <LoadingSkeleton />}
        </div>
      </div>
      {/* Due Date */}
      <div className="basis-4/12 ">
        <header className="uppercase border-red-500 border-b-4 py-3 font-bold">
          Due Date
          <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">{taskDueDate.length}</span>
        </header>
        <div className="pt-7 flex flex-col gap-6">
          {taskDueDate.map((task) => (
            <CardTask key={task.id} task={task} />
          ))}
          {tasks.length === 0 && <LoadingSkeleton />}
        </div>
      </div>
    </div>
  );
};

export default MyTask;
