class Planner {
    selectors = {
        panel: '[data-js-panel]',
        dateEl: '[data-js-panel-date]',
        clockEl: '[data-js-panel-clock]',
        form: '[data-js-panel-form]',
        submitBtn: '[data-js-panel-subtn]',
        formInput: '[data-js-form-input]',
        formSelect: '[data-js-form-select]',
        formDeadline: '[data-js-form-deadline]',
        titleError: '[data-js-title-error]',
        deadlineError: '[data-js-deadline-error]',
        timelineEl: '[data-js-timeline]',
        contentEl: '[data-js-content]',
        lineEL: '[data-js-timeline-line]',
        controlButtons: '[data-js-control-buttons]'
    }
    static taskCount = 0;

    days = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];

    constructor() {
        this.panel = document.querySelector(this.selectors.panel)
        this.dateEl = this.panel.querySelector(this.selectors.dateEl)
        this.clockEl = this.panel.querySelector(this.selectors.clockEl)
        this.showTime()
        setInterval(this.showTime.bind(this), 1000);
        this.form = this.panel.querySelector(this.selectors.form)
        this.contentEl = document.querySelector(this.selectors.contentEl)
        this.timelineEl = this.contentEl.querySelector(this.selectors.timelineEl);
        this.controlButtons = this.contentEl.querySelector(this.selectors.controlButtons);
        this.lineEL = this.timelineEl.querySelector(this.selectors.lineEL);
        this.bindEvents()
        this.lineEL.classList.add('visibility-hidden')
    }

    showTime() {
        this.updateClock()

        this.updateDate()
    }

    updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        this.clockEl.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateDate() {
        const now = new Date();
        this.dateEl.textContent =
            String(now.getDate()).padStart(2, '0') + '.' +
            String(now.getMonth() + 1).padStart(2, '0') + '.' +
            now.getFullYear();
    }

    appendTask(event) {
        event.preventDefault();

        const taskName = this.form.querySelector(this.selectors.formInput).value;
        const taskPriority = this.form.querySelector(this.selectors.formSelect).value;
        const taskDeadline = this.form.querySelector(this.selectors.formDeadline).value;

        if (this.checkTitle(taskName)) {
            const titleError = this.form.querySelector(this.selectors.titleError);
            titleError.textContent = 'Unesite naziv obaveze!';
            return;
        }

        if (this.checkDeadline(taskDeadline)) {
            const deadlineError = this.form.querySelector(this.selectors.deadlineError);
            deadlineError.textContent = 'Rok nije validan!';
            return;
        }

        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        this.contentEl.style.setProperty('--index', Planner.taskCount);
        taskElement.innerHTML = `
            <div class="task-content">
                <span class="time">
                    <i class='bx bx-calendar-week'></i>
                    ${taskDeadline}
                </span>
                <div class="wrapper">
                    <h3>${taskName}</h3>
                    <label class="custom-checkbox">
                        <input type="checkbox" class="task-complete">
                        <div class="checkmark"></div>
                    </label>
                </div>
                <p>Prioritet: <span class="priority">${taskPriority}</span></p>
            </div>
        `;

        this.timelineEl.appendChild(taskElement);
        Planner.taskCount++;

        if (Planner.taskCount < 1) {
            this.lineEL.classList.add('visibility-hidden');
        } else {
            this.lineEL.classList.remove('visibility-hidden');
        }
    }

    checkTitle(title) {
        return title.trim().length === 0;
    }

    checkDeadline(deadline) {
        const now = new Date();
        const taskDate = new Date(deadline);
        if (isNaN(taskDate.getTime()) || taskDate < now) {
            console.log('Invalid deadline');
            return true;
        }

    }

    completeTask(event) {
        const { target } = event;
        if (target.classList.contains('task-complete')) {
            const taskElement = target.closest('.task-content');
            taskElement.classList.toggle('completed');
        }
    }

    showCompletedTasks() {
        
        const tasks = this.timelineEl.querySelectorAll('.task-content');
        tasks.forEach(task => {
            if (task.classList.contains('completed')) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    }

    filterTasks(event) {
        const { target } = event;

        if (target.classList.contains('all')) {
            this.showAllTasks();
        }

        if (target.classList.contains('completed')) {
            this.showCompletedTasks();
        }

        if (target.classList.contains('uncompleted')) {
            this.showUncompletedTasks();
        }

        if (target.classList.contains('deleteCompleted')) {
            this.deleteCompletedTasks();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (event) => this.appendTask(event));
        this.timelineEl.addEventListener('click', (event) => this.completeTask(event));
        this.controlButtons.addEventListener('click', (event) => this.filterTasks(event));
    }



}

new Planner()
