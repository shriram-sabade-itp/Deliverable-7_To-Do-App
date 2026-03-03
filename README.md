# 📝 Planned! – A Simple & Clean To‑Do Web App

**Planned!** is a lightweight and intuitive task‑management web app built using **HTML**, **CSS**, and **Vanilla JavaScript**.  
It helps you manage tasks effortlessly with statuses, priorities, progress tracking, and a clean UI — all stored locally in your browser.

---

## 🚀 Features

### ✅ Task Management
- Add new tasks with:
  - **Title**
  - **Status** (Pending, In Progress, Completed)
  - **Priority** (Minor, Normal, Critical)
- Edit existing tasks.
- Delete tasks safely with a confirmation prompt.

### 🎯 Smart Status Logic
- Checking a task automatically marks it **completed** and moves it to the Completed section.
- Unchecking moves it back to **On Hold** and switches the status to *Pending*.

### 💾 LocalStorage Persistence
Your tasks stay saved even after refreshing or closing the browser.

### 📊 Sidebar Summary
A quick overview showing:
- Total tasks  
- Completed tasks  
- Pending tasks  
- Completion percentage (with progress bar)

### 👋 Dynamic Greeting
Displays:
- **Good Morning**
- **Good Afternoon**
- **Good Evening**  
…based on the user's current time.

### 🧼 Clean UI + Modal Form
- Simple modal popup for adding and updating tasks.
- Modern icons via **FontAwesome**.


## 🛠️ How It Works

### 📥 Loading Data
- On first load, default sample tasks are created.
- Future sessions load everything from **localStorage**.

### 🖥️ Rendering Tasks
Tasks are separated into:
- **On Hold** (pending + in-progress)
- **Completed**

The UI updates dynamically whenever tasks are added, updated, completed, or removed.

### ✏️ Adding & Editing
A modal form captures:
- Title  
- Status  
- Priority  

If you're editing a task, its data is auto‑filled in the modal.

---

## ▶️ Getting Started

### 1. Clone or Download the Project
```sh
https://github.com/shriram-sabade-itp/Deliverable-7_To-Do-App.git
```

### 2. Open the App
- Just open index.html in any browser.
- No installation. No backend. No dependencies.

## Built With

- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage API
- FontAwesome Icons
