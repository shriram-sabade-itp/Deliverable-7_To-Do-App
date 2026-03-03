/**
 * @jest-environment jsdom
 */

const {
    loadData,
    toggleTask,
    deleteTask,
    editTask,
    openModal,
    closeModal,
    updateGreeting,
    saveData,
    initEventListeners,
    resetState 
} = require("../Assets/JS/script.js");

beforeEach(() => {
    resetState();  
    document.body.innerHTML = `
        <div id="onHoldTasks"></div>
        <div id="completedTasks"></div>
        <div id="taskCount"></div>
        <div id="totalTasks"></div>
        <div id="completedCount"></div>
        <div id="pendingCount"></div>
        <div id="completionRateValue"></div>
        <div id="totalProgress"></div>
        <div id="completionProgress"></div>
        <div id="greeting"></div>

        <div id="taskModal"></div>

        <form id="taskForm">
            <input id="taskTitle" />
            <select id="taskStatus">
                <option value="pending">pending</option>
                <option value="completed">completed</option>
            </select>
            <select id="taskPriority">
                <option value="minor">minor</option>
                <option value="normal">normal</option>
            </select>
        </form>
    `;

    localStorage.clear();
    jest.clearAllMocks();
});


// ✅ loadData test
test("loadData loads default tasks if localStorage empty", () => {
    loadData();
    expect(document.getElementById("totalTasks").textContent).toBe("3");
});


// ✅ toggleTask test
test("toggleTask marks task as completed", () => {
    loadData();
    toggleTask(1);
    expect(document.getElementById("completedCount").textContent).toBe("1");
});


// ✅ deleteTask test
test("deleteTask removes a task", () => {
    loadData();

    global.confirm = jest.fn(() => true);

    deleteTask(1);
    expect(document.getElementById("totalTasks").textContent).toBe("2");
});


// ✅ openModal test
test("openModal adds active class", () => {
    openModal();
    expect(document.getElementById("taskModal").classList.contains("active")).toBe(true);
});


// ✅ closeModal test
test("closeModal removes active class", () => {
    openModal();
    closeModal();
    expect(document.getElementById("taskModal").classList.contains("active")).toBe(false);
});


// ✅ editTask test
test("editTask fills form values", () => {
    loadData();
    editTask(1);

    expect(document.getElementById("taskTitle").value).toBe("Activity 1");
});


// ✅ updateGreeting test
test("updateGreeting sets greeting text", () => {
    updateGreeting();
    expect(document.getElementById("greeting").textContent).toMatch(/Good/);
});


// ✅ saveData test
test("saveData stores data in localStorage", () => {
    loadData();
    saveData();
    expect(localStorage.getItem("Tasks")).not.toBeNull();
});

test("loadData loads from localStorage if data exists", () => {
    const mockTasks = [
        { id: 100, title: "Saved Task", status: "pending", priority: "minor", completed: false }
    ];

    localStorage.setItem("Tasks", JSON.stringify(mockTasks));

    loadData();

    expect(document.getElementById("totalTasks").textContent).toBe("1");
});

test("deleteTask does nothing if confirm is false", () => {
    loadData();
    global.confirm = jest.fn(() => false);

    deleteTask(1);

    expect(document.getElementById("totalTasks").textContent).toBe("3");
});

test("toggleTask does nothing if task not found", () => {
    loadData();
    toggleTask(999); // invalid id

    expect(document.getElementById("totalTasks").textContent).toBe("3");
});

test("renderTasks shows empty state when no tasks", () => {
    localStorage.setItem("Tasks", JSON.stringify([]));
    loadData();

    expect(document.getElementById("onHoldTasks").innerHTML)
        .toContain("No task on hold");
});

test("form submit adds new task", () => {
    loadData();
    initEventListeners();

    document.getElementById("taskTitle").value = "New Task";
    document.getElementById("taskStatus").value = "pending";
    document.getElementById("taskPriority").value = "minor";

    document.getElementById("taskForm").dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
    );

    expect(document.getElementById("totalTasks").textContent).toBe("4");
});

test("updateGreeting sets afternoon greeting", () => {
    jest.spyOn(Date.prototype, "getHours").mockReturnValue(14);

    updateGreeting();

    expect(document.getElementById("greeting").textContent)
        .toBe("Good Afternoon!");

    jest.restoreAllMocks();
});

test("updateGreeting sets evening greeting", () => {
    jest.spyOn(Date.prototype, "getHours").mockReturnValue(20);

    updateGreeting();

    expect(document.getElementById("greeting").textContent)
        .toBe("Good Evening!");

    jest.restoreAllMocks();
});

test("form submit edits existing task", () => {
    loadData();
    initEventListeners();
    editTask(1);
    document.getElementById("taskTitle").value = "Updated Task";
    document.getElementById("taskStatus").value = "completed";
    document.getElementById("taskPriority").value = "normal";
    document.getElementById("taskForm").dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
    );
    expect(document.getElementById("totalTasks").textContent).toBe("3");
    expect(document.getElementById("completedCount").textContent).toBe("1");
});