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
        deadlineError: '[data-js-deadline-error]',
        timelineEl: '[data-js-timeline]',
        contentEl: '[data-js-content]',
        lineEL: '[data-js-timeline-line]',
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
        this.lineEL = this.timelineEl.querySelector(this.selectors.lineEL);
        this.bindEvents()
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

        if (this.checkDeadline(taskDeadline)) {
            const deadlineError = this.form.querySelector(this.selectors.deadlineError);
            deadlineError.textContent = 'Rok nije validan!';
            return;
        }

        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        this.contentEl.style.setProperty('--index', this.taskCount);
        taskElement.innerHTML = `
            <div class="task-content">
                <span class="time">
                    <i class='bx bx-calendar-week'></i>
                    ${taskDeadline}
                </span>
                <h3>${taskName}</h3>
                <p>Prioritet: <span class="priority">${taskPriority}</span></p>
            </div>
        `;

        this.timelineEl.appendChild(taskElement);
        Planner.taskCount++;
        console.log(Planner.taskCount);
    }

    checkDeadline(deadline) {
        const now = new Date();
        const taskDate = new Date(deadline);
        return taskDate < now;
    }

    bindEvents() {

        this.form.addEventListener('submit', (event) => this.appendTask(event));
    }

}

new Planner()
