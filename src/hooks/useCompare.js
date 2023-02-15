const useCompare = () => {
  const isInWork = (task) => new Date().getTime() < new Date(task?.duedate).getTime() && !task.completed;
  const isDueDate = (task) => new Date().getTime() > new Date(task?.duedate).getTime() && !task.completed;
  const isCompleted = (task) => task.completed;
  return { isInWork, isDueDate, isCompleted };
};

export default useCompare;
