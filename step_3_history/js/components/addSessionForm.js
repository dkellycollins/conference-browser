
/**
 * Custom event example
 */

class AddSessionForm extends HTMLElement {

  constructor() {
    super();

    this.connectedCallback = this.connectedCallback.bind(this);
    this.render = this.render.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const addSessionForm = this.appendChild(document.createElement('form'));
    addSessionForm.classList.add('flex-col');
    addSessionForm.addEventListener('submit', this.onSubmit);

    const formHeaderRow = addSessionForm.appendChild(document.createElement('div'));
    formHeaderRow.classList.add('flex-row');

    const sessionTitleInputContainer = formHeaderRow.appendChild(document.createElement('div'));
    sessionTitleInputContainer.classList.add('flex-row', 'flex-fit');
    const sessionTitleInputLabel = sessionTitleInputContainer.appendChild(document.createElement('label'));
    sessionTitleInputLabel.classList.add('flex-fit');
    sessionTitleInputLabel.textContent = 'Title';
    const sessionTitleInput = sessionTitleInputContainer.appendChild(document.createElement('input'));
    sessionTitleInput.classList.add('flex-fit');
    sessionTitleInput.setAttribute('type', 'text');
    sessionTitleInput.setAttribute('name', 'title');

    const sessionSpeakerContainer = formHeaderRow.appendChild(document.createElement('div'));
    sessionSpeakerContainer.classList.add('flex-row', 'flex-fit');
    const sessionSpeakerInputLabel = sessionSpeakerContainer.appendChild(document.createElement('label'));
    sessionSpeakerInputLabel.classList.add('flex-fit');
    sessionSpeakerInputLabel.textContent = 'Speaker Name';
    const sessionSpeakerInput = sessionSpeakerContainer.appendChild(document.createElement('input'));
    sessionSpeakerInput.classList.add('flex-fit');
    sessionSpeakerInput.setAttribute('type', 'text');
    sessionSpeakerInput.setAttribute('name', 'speaker');

    const sessionDescriptionContainer = addSessionForm.appendChild(document.createElement('div'));
    sessionDescriptionContainer.classList.add('flex-col');
    const sessionDescriptionInputLabel = sessionDescriptionContainer.appendChild(document.createElement('label'));
    sessionDescriptionInputLabel.textContent = 'Description';
    const sessionDescriptionInput = sessionDescriptionContainer.appendChild(document.createElement('textarea'));
    sessionDescriptionInput.setAttribute('rows', "4");
    sessionDescriptionInput.setAttribute('name', 'description');

    const sessionDateInputContainer = addSessionForm.appendChild(document.createElement('div'));
    sessionDateInputContainer.classList.add('flex-row');
    const sessionDateInputLabel = sessionDateInputContainer.appendChild(document.createElement('label'));
    sessionDateInputLabel.classList.add('flex-fit');
    sessionDateInputLabel.textContent = 'Date';
    const sessionDateInput = sessionDateInputContainer.appendChild(document.createElement('input'));
    sessionDateInput.classList.add('flex-fit');
    sessionDateInput.setAttribute('type', 'datetime-local');
    sessionDateInput.setAttribute('name', 'date');

    const formActionsContainer = addSessionForm.appendChild(document.createElement('div'));
    formActionsContainer.classList.add('flex-row');

    const submitButton = formActionsContainer.appendChild(document.createElement('button'));
    submitButton.classList.add('flex-end');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = "Submit";
  }

  onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const session = Object.fromEntries(formData.entries());

    this.dispatchEvent(new CustomEvent('addSession', { detail: session }));
  }
}

customElements.define('app-add-session-form', AddSessionForm);