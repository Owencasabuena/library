const modal = document.querySelector('.modal');
const openModal = document.querySelector('.add-book');
const closeModal = document.querySelector('.close-button');

openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
})

const library = [];

function Book(title, author, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, isRead) {
    const newBook = new Book(title, author, isRead);
    library.push(newBook);
}

function renderLibrary() {
    const container = document.querySelector('.grid-container');
    container.innerHTML = '';

    library.forEach(book => {
        const card = createBookCard(book);
        container.appendChild(card);
    });
}

function createBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('book');

    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.classList.add('author');
    author.textContent = book.author;

    const actions = document.createElement('div');
    actions.classList.add('book-actions');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-book');
    deleteButton.textContent = "Delete";

    const statusButton = document.createElement('button');
    statusButton.classList.add('book-status');
    if (book.isRead) {
    statusButton.classList.add('read');
    statusButton.textContent = "Mark as Unread";
    } else {
    statusButton.classList.add('unread');
    statusButton.textContent = "Mark as Read";
    }

    deleteButton.addEventListener('click', () => {
        removeBook(book.id);
    });

    statusButton.addEventListener('click', () => {
        toggleReadStatus(book.id);
    });

    actions.appendChild(deleteButton);
    actions.appendChild(statusButton);

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(actions);

    return card;
}

function toggleReadStatus(id) {
    library.forEach(book => {
        if(book.id == id) {
            book.isRead = !book.isRead;
        }
    });
    renderLibrary();
}

function removeBook(id) {
    const index = library.findIndex(book => book.id == id);
    if(index !== -1) {
        library.splice(index, 1);
        renderLibrary();
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const author = document.querySelector('#author').value.trim();
    const isRead = document.querySelector('#read').checked;

    addBookToLibrary(title, author, isRead);
    renderLibrary();
    e.target.reset();
    modal.close();
});