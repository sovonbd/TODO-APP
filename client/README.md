# TODO App

Check out the live demo of TODO App: [TODO App Live Link](https://todo-list-af859.web.app/)

Check out the server side code of TODO App: [TODO-Server](https://github.com/sovonbd/todo-list-server)

TODO is a task management application that allows users to create, update, and delete tasks. It provides a user-friendly interface to manage tasks across three sections: todo tasks, ongoing tasks, and completed tasks. The app features a login system that enables individual users to organize and track their tasks efficiently.

## Features

### Task Management
- **Create Task:** Users can create new tasks, which are initially added to the todo task section.
- **Update Task:** Tasks can be edited and updated with new information or changes.
- **Delete Task:** Users have the option to delete tasks they no longer need.

### Task Progression
- **Task Movement:** Tasks can be dragged and dropped between the todo, ongoing, and completed task sections, allowing users to track task progress easily.

### User Authentication
- **Login System:** Individual users can sign in and manage their tasks securely.

### Task Deadline Highlighting
- **Deadline Alert:** Tasks with deadlines equal to or less than two days will have a red background, providing users with visual cues for impending deadlines.

## Technologies Used

### Frontend
- React
- Axios
- Date-fns
- Firebase
- React Beautiful DND (Drag and Drop)
- React Hook Form
- React Hot Toast
- React Icons

### Backend
- Node.js
- Cors
- Express
- Dotenv
- MongoDB

## Installation

To set up the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/todo-app.git`
2. Navigate to the project directory: `cd todo-app`
3. Install dependencies for frontend and backend:
   - Frontend: `cd frontend && npm install`
   - Backend: `cd backend && npm install`
4. Set up environment variables:
   - Create a `.env` file in the backend directory and add necessary environment variables (e.g., database connection details, API keys).
5. Start the frontend and backend servers:
   - Frontend: `cd frontend && npm start`
   - Backend: `cd backend && npm start`

## Contribution

If you wish to contribute to this project, please fork the repository and create a pull request with your proposed changes. All contributions are welcome!

## Acknowledgements

I would like to express my gratitude to the open-source community for their invaluable contributions and support that made this project possible.

---

_This README serves as a guide and overview of Edumart. For detailed instructions and additional information, please refer to the project documentation or contact the contributor._

