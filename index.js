const fs = require("fs");
const stringList = fs.readFileSync("./toDoList.json", { encoding: "utf8" });
const allList = JSON.parse(stringList);
const { program } = require("commander");

// ===========  write list at file =================
const writeList = (list) =>
  fs.writeFileSync("./toDoList.json", JSON.stringify(list));

// ===========  add new list  =================
const addNewList = (title) => {
  allList.push({ id: Date.now(), title, status: "to-do" });
  writeList(allList);
};

// ===========  show All-ToDolist  =================
const showList = () => console.log(allList);

// ===========  delete list  =================
const deleteList = (id) => {
  const filteredList = allList.filter((list) => list.id !== +id);
  writeList(filteredList);
};

// =========== show list by status =================
const showListByStatus = (status) => {
  const filteredList = allList.filter((list) => list.status === status);
  console.log(filteredList);
};

// ===========  change status of list  ==========
const updateList = (id, options) => {
  allList.forEach((list) => {
    if (list.id == id) {
      list.status = options.status;
    }
  });
  writeList(allList);
};

program
  .name("ToDoList")
  .description("CLI to CRUD commands on ToDoList")
  .version("1.0.0");

// =================== add list =================
program
  .command("add")
  .description("add new list")
  .option("-t, --title <string>", "list title")
  .action((options) => {
    addNewList(options.title);
  });

// =================== delete list =================
program
  .command("delete")
  .description("delete specific list")
  .argument("<number>", "id of list to delete")
  .action((id) => {
    deleteList(id);
  });

// =================== update status of specific list =================
program
  .command("update")
  .description("update status of specific list")
  .argument("<number>", "id of list to update status")
  .option("-s, --status <string>", "new status")
  .action((id, options) => {
    if (Object.keys(options).length > 0) {
      updateList(id, options);
    } else {
      console.log("Enter -s status ");
    }
  });

// =================== show all to-do-list =================
program
  .command("show")
  .description("list all toDoList")
  .option("-s, --status <string>", "show lists by status")
  .action((options) => {
    if (Object.keys(options).length > 0) {
      showListByStatus(options.status);
    } else {
      showList();
    }
  });

program.parse();
