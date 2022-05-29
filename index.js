const inputAddTask = document.querySelector('.to-do-list__input_type_add-task');
const buttonSubmitAddTask = document.querySelector('.to-do-list__button_type_submit-add-task');
const formTaskList = document.querySelector('.to-do-list__form-task-list');
const listTaskItems = document.querySelectorAll('.to-do-list__task-item');
const taskList = document.querySelector('.to-do-list__task-list');
const taskItemTemplate = document.querySelector('#task-item-template');
let taskItemTemplateContent;
if (taskItemTemplate instanceof HTMLTemplateElement) {
    taskItemTemplateContent = taskItemTemplate.content;
}
let tasks = [
    { id: 1, text: ' Полить цветы' },
    { id: 2, text: 'Сходить в магазин' },
    { id: 3, text: 'Выбрать монитор на Яндекс Маркете' },
];
let valueInputAddTask = '';
const handleSettingTaskItem = ({ text, id }) => {
    const taskItem = taskItemTemplateContent.querySelector('.to-do-list__task-item').cloneNode(true);
    const taskItemInput = taskItem.querySelector('.to-do-list__input_type_task-item');
    const taskItemNumber = taskItem.querySelector('.to-do-list__task-item-number');
    const taskItemEditButton = taskItem.querySelector('.to-do-list__task-item-button_type_edit');
    const taskItemDeleteButton = taskItem.querySelector('.to-do-list__task-item-button_type_delete');
    taskItemDeleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        taskItem.remove();
        tasks = tasks.filter((item) => Number(taskItemNumber.textContent) !== item.id);
        tasks.forEach((item, index) => { item.id = index + 1; });
        const currentListTaskItems = document.querySelectorAll('.to-do-list__task-item');
        currentListTaskItems.forEach((item, index) => {
            item.querySelector('.to-do-list__task-item-number').textContent = index + 1 + '';
        });
    });
    taskItemEditButton.addEventListener('click', (e) => {
        e.preventDefault();
        taskItemEditButton.classList.add('active');
        taskItemInput.removeAttribute('disabled');
        taskItemInput.focus();
        taskItemInput.addEventListener('blur', (e) => {
            taskItemInput.setAttribute('disabled', true + '');
            taskItemEditButton.classList.remove('active');
        }, true);
        taskItemInput.addEventListener('keydown', (e) => {
            if (e.code === 'Enter' || e.code === 'Escape') {
                taskItemEditButton.classList.remove('active');
                taskItemInput.setAttribute('disabled', true + '');
            }
        });
    });
    taskItemInput.value = text;
    taskItemNumber.textContent = id + '';
    return taskItem;
};
tasks.forEach(({ text, id }) => {
    const newTaskItem = handleSettingTaskItem({ text, id });
    taskList.append(newTaskItem);
});
inputAddTask.addEventListener('input', (event) => {
    const target = event.target;
    valueInputAddTask = target.value;
});
buttonSubmitAddTask.addEventListener('click', (event) => {
    event.preventDefault();
    const inputAddTask = event.target;
    if (!valueInputAddTask) {
        console.log('Поле пустое');
    }
    else {
        inputAddTask.value = '';
        let id = tasks.length + 1;
        tasks.push({ text: valueInputAddTask, id });
        const newTaskItem = handleSettingTaskItem({ text: valueInputAddTask, id: tasks.length });
        valueInputAddTask = '';
        taskList.append(newTaskItem);
    }
});
