const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");
const progressText = document.getElementById("progressText");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

renderHabits();

function addHabit() {
    const habitName = habitInput.value.trim();
    if (habitName === "") return;

    habits.push({ name: habitName, completed: false });
    habitInput.value = "";
    saveData();
    renderHabits();
}

function toggleHabit(index) {
    habits[index].completed = !habits[index].completed;
    saveData();
    renderHabits();
}

function renderHabits() {
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {
        const li = document.createElement("li");
        li.textContent = habit.name;
        if (habit.completed) li.classList.add("completed");

        li.addEventListener("click", () => toggleHabit(index));
        habitList.appendChild(li);
    });

    updateProgress();
}

function updateProgress() {
    if (habits.length === 0) {
        progressText.textContent = "Progress: 0%";
        return;
    }

    const completed = habits.filter(h => h.completed).length;
    const percent = Math.round((completed / habits.length) * 100);
    progressText.textContent = `Progress: ${percent}%`;
}

function resetHabits() {
    habits = [];
    saveData();
    renderHabits();
}

function saveData() {
    localStorage.setItem("habits", JSON.stringify(habits));
}
