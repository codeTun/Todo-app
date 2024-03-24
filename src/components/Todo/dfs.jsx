import { useEffect, useState } from "react";
import { getDataFromLocalstorage } from "../utils/Utils";
import "./todo.css";
const Todo = () => {
  const [todos, setTodos] = useState(getDataFromLocalstorage());
  const [input, setInput] = useState("");
  const [inputs, setInputs] = useState("");
  const [isedit, setIsedit] = useState(false);
  const [update, setUpdate] = useState(0);
  const [id, setId] = useState(null);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleInputs = (e) => {
    setInputs(e.target.value);
  };

  const addTodo = () => {
    setTodos([...todos, input]);
    setInput("");
  };

  const deleteTodo = (id) => {
    const filterTodo = todos.filter((todo, index) => id !== index);
    setTodos(filterTodo);
  };

  const getTodo = (id) => {
    const findTodo = todos.find((todo, index) => index === id);
    setInputs(findTodo);
    setIsedit(true);
    setUpdate(id);
    // console.log(id);
    setId(id);
  };

  const updateTodo = () => {
    todos[update] = inputs;
    // console.log(inputs);
    setInputs("");
    setIsedit(false);
    setId(null);
  };

  const handleComplete = () => {};

  // store to localsotrage

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <div className="flex justify-center items-center bg-gray-300 min-h-screen">
        <div className="h-auto md:w-1/2 px-2 w-96 bg-white rounded-lg">
          <div className="input_text relative">
            <input
              className="text-sm h-12 w-full my-4 pr-20 md:pr-28 outline-none pl-8"
              type="text"
              placeholder="Write a new task"
              value={input}
              onChange={handleInput}
            />

            <button
              onClick={addTodo} //isedit ? updateTodo :
              className="add_task text-sm transition-all hover:bg-blue-700 cursor-pointer text-white bg-blue-400 rounded-lg h-10 w-16 md:w-24 absolute right-1 top-[20px]"
            >
              Add task
            </button>
            <i className="absolute top-[27px] text-gray-600 text-xl left-2 fa fa-pencil-square"></i>
          </div>
          <ul className="all_tasks">
            {todos.map((todo, index) => (
              <li id="1" key={index}>
                <hr className="mt-2" />
                <div className="my-4 flex justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span
                      onClick={handleComplete}
                      className="h-8 cursor-pointer w-8 flex justify-center items-center border border-gray-600 rounded-full "
                    >
                      <i
                        id="checked1"
                        className="transition-all hover:text-lg text-blue-500 hover:text-blue-900 fa fa-check"
                      ></i>
                    </span>
                    {handleComplete ? (
                      <p className="md:max-w-[375px]  truncate max-w-[280px] ">
                        <strike
                          id="strike1"
                          className="text-gray-600 text-sm no-underline "
                        >
                          {isedit && id === index ? (
                            <input
                              className="edit__task"
                              onChange={handleInputs}
                              value={inputs}
                            />
                          ) : (
                            todo
                          )}
                        </strike>
                      </p>
                    ) : (
                      <p className="md:max-w-[375px] line-through truncate max-w-[280px] ">
                        <strike
                          id="strike1"
                          className="text-gray-600 text-sm no-underline "
                        >
                          {isedit && id === index ? (
                            <input
                              className="edit__task"
                              onChange={handleInputs}
                              value={inputs}
                            />
                          ) : (
                            todo
                          )}
                        </strike>
                      </p>
                    )}
                  </div>
                  <div className="todo__left--icons">
                    <span
                      onClick={isedit ? updateTodo : () => getTodo(index)}
                      className="h-8 cursor-pointer w-8 flex justify-center items-center border border-gray-600 rounded-full "
                    >
                      {isedit && id === index ? (
                        <i className="transition-all hover:text-lg text-red-600 hover:text-red-900 fa-regular fa-floppy-disk"></i>
                      ) : (
                        <i className="transition-all hover:text-lg text-red-600 hover:text-red-900 fa fa-edit"></i>
                      )}
                    </span>

                    <span
                      onClick={() => deleteTodo(index)}
                      className="h-8 cursor-pointer w-8 flex justify-center items-center border border-gray-600 rounded-full "
                    >
                      <i className="transition-all hover:text-lg text-red-600 hover:text-red-900 fa fa-trash"></i>
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
