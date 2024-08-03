[![Backend Integration](https://github.com/HzaRashid/Issue-Tracker/actions/workflows/ci-server.yml/badge.svg)](https://github.com/HzaRashid/Issue-Tracker/actions/workflows/ci-server.yml)
[![Backend Deployment](https://github.com/HzaRashid/Issue-Tracker/actions/workflows/cd-server.yml/badge.svg)](https://github.com/HzaRashid/Issue-Tracker/actions/workflows/cd-server.yml)
[![Dependabot Updates](https://github.com/HzaRashid/Issue-Tracker/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/HzaRashid/Issue-Tracker/actions/workflows/dependabot/dependabot-updates)


<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">ISSUE-TRACKER</h1>
</p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/HzaRashid/Issue-Tracker?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/HzaRashid/Issue-Tracker?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/HzaRashid/Issue-Tracker?style=default&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white" alt="Docker">
	<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=for-the-badge&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions">
   <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" alt="Node.js">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white" alt="Express.js">
   <img src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black" alt="React.js">
   <img src="https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
   <img src="https://img.shields.io/badge/-Mongoose-F04D35?style=for-the-badge&logo=mongoosedotws&logoColor=white" alt="Mongoose">
	<img src="https://img.shields.io/badge/Redis-DC382D.svg?style=for-the-badge&logo=Redis&logoColor=white" alt="Redis">
	<br>




</p>

<br><!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary><br>

- [ Overview](#-overview)
<!-- - [ Features](#-features) -->
- [ Repository Structure](#-repository-structure)
- [ Modules](#-modules)
- [ API Endpoints](#api-endpoints)
</details>
<hr>

##  Overview

The Issue Tracker project is a comprehensive tool designed to streamline the management of tasks and issues within a project. It features a robust REST API that is reverse-proxied through Nginx (handling SSL/TLS termination and additional security configurations), with both services containerized with Docker. This setup is replicated across multiple AWS EC2 instances, and load-balanced with proximity-based routing. The front-end utilizes React.js to provide a dynamic and responsive user interface.

---

<!-- ##  Features

|    |   Feature         | Description |
|----|-------------------|---------------------------------------------------------------|
| ⚙️ | **Architecture**  | *The project follows a modular architecture with a client-server setup. It utilizes Node.js for the server-side and React for the client-side. Docker is employed for containerization, enhancing scalability and deployment.* |
| ♾️ | **DevOps**  | *A CI/CD pipeline is implemented for the backend using Docker and GitHub Actions, while the frontend is handled by Vercel.* |
| 🔌 | **Integrations**  | *Key integrations include Vercel for the frontend CI\CD and hosting, and Github Actions for the backend CI/CD.* |
| 🧩 | **Modularity**    | *The codebase exhibits high modularity and reusability with components like contexts for state management, controllers for API logic, and models for database interactions. Each module focuses on specific functionalities, allowing easy extension and maintenance.* |
| 🛡️ | **Security**      | *Security measures include Passport for authentication, Redis for cache protection, rate limiting, and bcrypt for password hashing. OAuth strategies are implemented for secure user login. The project focuses on data protection and access control.* |
| 📦 | **Dependencies**  | *Key external libraries and dependencies include React ecosystem, Express for API handling, Mongoose for MongoDB interactions, and Docker for containerization. These libraries enhance functionality, performance, and development efficiency.* |

--- -->

##  Repository Structure

```sh
└── Issue-Tracker/
    ├── .github
    │   └── workflows
    ├── README.md
    ├── client
    │   ├── .gitignore
    │   ├── README.md
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── postcss.config.js
    │   ├── public
    │   ├── src
    │   ├── tailwind.config.js
    │   ├── tsconfig.json
    │   └── webpack.config.js
    ├── compose-server.yml
    ├── package-lock.json
    ├── scripts
    │   └── server
    ├── server
    │   ├── .DS_Store
    │   ├── .gitignore
    │   ├── Dockerfile
    │   ├── config
    │   ├── controllers
    │   ├── index.js
    │   ├── models
    │   ├── package-lock.json
    │   ├── package.json
    │   └── routes
    └── server-configs
        └── config.conf
```

---

##  Modules

<details closed><summary>.</summary>

| File                                                                                            | Summary                                                                                                                                                                                                         |
| ---                                                                                             | ---                                                                                                                                                                                                             |
| [package-lock.json](https://github.com/HzaRashid/Issue-Tracker/blob/master/package-lock.json)   | Manages dependencies for the Issue-Tracker project. Ensures project stability by locking package versions. Vital for consistent builds and reliable operation across the client and server components.           |
| [compose-server.yml](https://github.com/HzaRashid/Issue-Tracker/blob/master/compose-server.yml) | Defines Docker services for API server and reverse proxy, orchestrating containers and configurations to run the Issue Tracker application smoothly. Organizes networking and environment settings efficiently. |

</details>

<details closed><summary>server</summary>

| File                                                                                                 | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---                                                                                                  | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [Dockerfile](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/Dockerfile)               | Builds a server container using Node.js for the Issue Tracker project. Sets up environment variables, exposes port 8080, and starts the server. This Dockerfile ensures a consistent server environment for the application.                                                                                                                                                                                                                                                                                           |
| [index.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/index.js)                   | Configures an Express server with authentication, rate limiting, session management, and API routes to handle user authentication, user data, issues, sprints, projects, and comments. Handles production build to serve the app.                                                                                                                                                                                                                                                                                      |
| [package-lock.json](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/package-lock.json) | This code file in the client directory of the Issue-Tracker repository plays a crucial role in managing the frontend interface of the project. It enables seamless interaction with users by providing a visually appealing and user-friendly experience. Through this code, users can efficiently track, manage, and update various issues within the system. The implementation focuses on ensuring a smooth workflow for users interacting with the platform, enhancing overall user satisfaction and productivity. |
| [package.json](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/package.json)           | Defines server dependencies and startup script using Nodemon for auto-restarting capabilities. Facilitates efficient handling of user authentication, session management, rate limiting, and database operations via prominent libraries within the Issue-Tracker architecture.                                                                                                                                                                                                                                        |

</details>

<details closed><summary>server.config</summary>

| File                                                                                                        | Summary                                                                                                                                                                                                                                                                                             |
| ---                                                                                                         | ---                                                                                                                                                                                                                                                                                                 |
| [passportConfig.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/config/passportConfig.js) | Defines authentication strategies using Passport for local and Google OAuth, checking user credentials against the database, and handling user serialization and deserialization. Enhances security by validating user credentials and integrating Google authentication for the Issue Tracker app. |
| [db.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/config/db.js)                         | Establish MongoDB connection using Mongoose. Ensure flexible querying with strictQuery disabled. On successful connection, log a message. Otherwise, log the error and exit the process.                                                                                                            |
| [redisClient.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/config/redisClient.js)       | Implements Redis caching for key models; User, Issue, Project, and Sprint, updating cache on document changes. Monitors and stores document changes in Redis, enhancing performance by reducing database queries for these core components.                                                         |

</details>

<details closed><summary>server.models</summary>

| File                                                                                                    | Summary                                                                                                                                                                                                                                                          |
| ---                                                                                                     | ---                                                                                                                                                                                                                                                              |
| [User.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/models/User.js)                 | Defines a user model with required fields for a MongoDB database in the parent repositorys server architecture. Handles user data storage, including name, email, password, role, and project associations. Key for user management in the Issue Tracker system. |
| [Comment.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/models/Comment.js)           | Defines MongoDB schema for comments, linking to users and issues. Enforces maximum length and creation timestamp. Central to managing user comments within the Issue Tracker app architecture.                                                                   |
| [Sprint.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/models/Sprint.js)             | Defines Sprint data structure in MongoDB, including title, createdBy, project references, dates, and predefined stages. Key for tracking project progress and managing tasks within the Issue-Tracker app.                                                       |
| [Issue.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/models/Issue.js)               | Defines MongoDB schema for issues in the project. Captures issue details such as summary, type, creator, project, and timestamps. Establishes relationships between users, projects, and sprints.                                                                |
| [IssueVersion.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/models/IssueVersion.js) | Defines MongoDB schema for issue versioning with fields tracking modifications like type, summary, and assignee. Relates issueID to issues, user to users. Captures historical issue data for reference in the Issue Tracker application.                        |
| [Project.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/models/Project.js)           | Defines MongoDB schema for projects with specific title, dates, and user associations. Supports issue tracking with predefined types. Facilitates project management within the server architecture.                                                             |

</details>

<details closed><summary>server.controllers</summary>

| File                                                                                                                 | Summary                                                                                                                                                                                                                                                                         |
| ---                                                                                                                  | ---                                                                                                                                                                                                                                                                             |
| [UserCtrl.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/controllers/UserCtrl.js)                 | Retrieve, add, edit, delete users and projects. Utilizes Redis caching for user retrieval and bcrypt for secure password management. Enhances team collaboration by managing project assignments efficiently.                                                                   |
| [IssueCtrl.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/controllers/IssueCtrl.js)               | Handles issue management by providing functionalities to retrieve, add, edit, and delete issues. Implements caching with Redis for efficient issue retrieval. Supports various operations like editing issue details, assigning users, moving between stages, and bulk updates. |
| [BoardIssues.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/controllers/BoardIssues.js)           | Manages issues in a specific project stage, fetching, inserting, deleting, and returning issues using a linked list approach.loggedInUser                                                                                                                                       |
| [SprintCtrl.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/controllers/SprintCtrl.js)             | Fetching, adding, editing titles, start/end dates, types, descriptions, and stages. Ensures uniqueness and limits for stages. Supports deletion of sprints and stages, with Redis caching for improved performance.                                                             |
| [ProjectCtrl.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/controllers/ProjectCtrl.js)           | Manages project CRUD operations, caching, and error handling. Retrieves project data and updates project details such as title, team, description, start/end dates. Ensures data consistency and deletion functionality within the repositorys architecture.                    |
| [IssueVersionCtrl.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/controllers/IssueVersionCtrl.js) | Handles real-time issue version updates by sending event-stream data with Express. Implements functions to retrieve issue versions and continuously update feeds.                                                                                                               |
| [CommentCtrl.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/controllers/CommentCtrl.js)           | Handles real-time comment updates for a specified issue by sending and writing comments via EventSource. Retrieves comments periodically and writes new comments. Allows writing new comments for an issue.                                                                     |

</details>

<details closed><summary>server.routes</summary>

| File                                                                                                    | Summary                                                                                                                                                                                                                                                                                    |
| ---                                                                                                     | ---                                                                                                                                                                                                                                                                                        |
| [IssueRoute.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/routes/IssueRoute.js)     | Defines API routes for issue management and version control. Implements authentication and CRUD operations. Maintains a clear separation of concerns by delegating functionality to respective controller modules. Contributes to the server-side functionality of the repository.         |
| [ProjectRoute.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/routes/ProjectRoute.js) | Defines routes for project management actions with user authentication. Handles adding, editing, and deleting projects along with team and user management functionalities. Implements authorization checks for secure operations.                                                         |
| [UserRoute.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/routes/UserRoute.js)       | Implements user-related routing using Express, enforcing authentication and authorization. Integrates various user actions handled by controllers in the server.                                                                                                                           |
| [CommentRoute.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/routes/CommentRoute.js) | Defines routes for sending, getting, and writing comments, with authentication checks. Key features include handling comment requests and enforcing authentication mechanisms. Aligns with the parent repositorys architecture focusing on managing comment-related interactions securely. |
| [SprintRoute.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/routes/SprintRoute.js)   | Fetching, adding, editing, and deleting sprints and stages. Utilizes authentication middleware for secure access. Integrates with controllers for streamlined sprint management in the Issue Tracker system.                                                                               |

</details>

<details closed><summary>server.routes.Auth</summary>

| File                                                                                                     | Summary                                                                                                                                                                                                                                               |
| ---                                                                                                      | ---                                                                                                                                                                                                                                                   |
| [isAuth.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/routes/Auth/isAuth.js)         | Auth middleware enforces user authentication and authorization for making changes. isAuthDemo blocks demo user actions. isAuth restricts unauthorized users. Central to ensuring secure interactions within the Issue-Tracker server routing process. |
| [Auth.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/routes/Auth/Auth.js)             | Handles user login, logout, and authentication status checks. Utilizes Passport for local authentication strategy with error handling. Further authentication strategies can be added in separate route files.                                        |
| [GoogleAuth.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/server/routes/Auth/GoogleAuth.js) | Enables Google OAuth authentication for the application, allowing users to log in via Google. Upon successful authentication, users are redirected to the specified URL. Includes a route for user logout functionality.                              |

</details>

<details closed><summary>server-configs</summary>

| File                                                                                             | Summary                                                                                                                                                                                              |
| ---                                                                                              | ---                                                                                                                                                                                                  |
| [config.conf](https://github.com/HzaRashid/Issue-Tracker/blob/master/server-configs/config.conf) | Defines upstream API proxy and SSL configurations for server communication in the architecture. Handles SSL termination and reverse proxy for the API server, enhancing security and load balancing. |

</details>

<details closed><summary>scripts.server</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                       |
| ---                                                                                                          | ---                                                                                                                                                                                                           |
| [install-docker.sh](https://github.com/HzaRashid/Issue-Tracker/blob/master/scripts/server/install-docker.sh) | Facilitates Docker installation for testing and development by checking if Docker is already installed, thereby ensuring dependency setup efficiency within the Issue Tracker repositorys server environment. |
| [compose.sh](https://github.com/HzaRashid/Issue-Tracker/blob/master/scripts/server/compose.sh)               | Facilitates SSL certificate setup and Docker compose deployment for the server using stored paths and environment variables.                                                                                  |

</details>

<details closed><summary>.github.workflows</summary>

| File                                                                                                    | Summary                                                                                                                                                                                                                    |
| ---                                                                                                     | ---                                                                                                                                                                                                                        |
| [cd-server.yml](https://github.com/HzaRashid/Issue-Tracker/blob/master/.github/workflows/cd-server.yml) | Automates continuous deployment for servers in the Issue-Tracker repository. Monitors the server branch, triggers deployments on pushes, and ensures seamless updates with proper notifications and rollback capabilities. |
| [ci-server.yml](https://github.com/HzaRashid/Issue-Tracker/blob/master/.github/workflows/ci-server.yml) | Implements CI workflows for automated testing and deployment with GitHub Actions. Integrates server and client components, ensuring seamless code integration in the Issue Tracker repository.                             |

</details>

<details closed><summary>client</summary>

| File                                                                                                   | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---                                                                                                    | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [tailwind.config.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/tailwind.config.js) | Customizes Tailwind CSS configuration in JIT mode for dynamic styling based on specific project requirements. Extends theme options and plugins for seamless integration within the project architecture.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [webpack.config.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/webpack.config.js)   | Generates webpack configuration for client-side JavaScript entry point to compile and bundle code. Supports various file extensions for resolving dependencies and outputs a single JavaScript file in the dist directory. Key for building the client-side of the Issue Tracker app.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [package-lock.json](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/package-lock.json)   | Client/src/utils/api.js`The `api.js` file in the `client/src/utils` directory serves as a crucial module for handling API interactions within the Issue Tracker application. It encapsulates functions that facilitate the communication between the front-end and back-end systems. This code file plays a pivotal role in ensuring seamless data exchange and synchronization between the client-side application and the server-side components. By abstracting the intricacies of network requests and responses, it contributes to the maintainability and extensibility of the overall architecture. The functions defined in `api.js` enable the client application to efficiently retrieve, update, and persist data to the underlying database, thereby empowering users to interact with the Issue Tracker platform seamlessly. |
| [package.json](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/package.json)             | Defines client dependencies, scripts, and development tools for building a frontend React application within the Issue Tracker repository. Key features include React ecosystem libraries, testing utilities, and build commands for development and production environments.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [tsconfig.json](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/tsconfig.json)           | Enables TypeScript configuration for the client-side codebase. Ensures strict type-checking and compatibility with ES5, React JSX, and node module resolution. Facilitates seamless integration of TypeScript with React components.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [postcss.config.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/postcss.config.js)   | Enables Tailwind CSS support in the client-side build process, enhancing styling capabilities with PostCSS plugins.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

</details>

<details closed><summary>client.public</summary>

| File                                                                                                | Summary                                                                                                                                                                                                        |
| ---                                                                                                 | ---                                                                                                                                                                                                            |
| [index.html](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/public/index.html)       | Defines the primary structure and content for the public-facing webpage of the web application. Includes essential metadata, configuration for mobile devices, and placeholders for dynamic content rendering. |
| [manifest.json](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/public/manifest.json) | Defines branding for Flow Issue Tracker web app with icons and display settings. Establishes a standalone experience with custom theme and colors for users.                                                   |
| [robots.txt](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/public/robots.txt)       | Specifies robots.txt rules for web crawlers in the client-side public directory. Informs search engine bots on indexing permissions. Maintains SEO best practices and site visibility.                         |

</details>

<details closed><summary>client.src</summary>

| File                                                                                                   | Summary                                                                                                                                                                                                                                                                 |
| ---                                                                                                    | ---                                                                                                                                                                                                                                                                     |
| [declaration.d.ts](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/declaration.d.ts) | Defines CSS module declaration for client-side styling in TypeScript, supporting CSS imports in codebase. Centralizes CSS module typings for better development experience, ensuring type safety and seamless integration within the projects client-side architecture. |
| [App.css](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/App.css)                   | Defines global styles for the web application, ensuring a consistent look and feel. Sets font color, body margins, and box-sizing rules. Maintains visual coherence across components.                                                                                  |
| [index.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/index.js)                 | Defines React component hierarchy for app state management with various contexts. Orchestrates data flow using providers and optimizes for production by disabling React DevTools in the browser.                                                                       |
| [index.css](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/index.css)               | Defines global styles and fonts for the client-side web interface. Integrates Tailwind CSS utility classes and customizes autofill behavior. Maintains consistent design and typography across the application.                                                         |
| [App.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/App.js)                     | Enables routing in client-side application using React Router. Integrates AppRouter component for navigation.                                                                                                                                                           |

</details>

<details closed><summary>client.src.contexts</summary>

| File                                                                                                                | Summary                                                                                                                                                                                                                                                                            |
| ---                                                                                                                 | ---                                                                                                                                                                                                                                                                                |
| [MonoCtxProvider.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/contexts/MonoCtxProvider.js) | Combines nested components and children to render with reversed order, enhancing flexibility and customization for UI components structuring within the client-side architecture of the Issue Tracker repository.                                                                  |
| [SprintContexts.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/contexts/SprintContexts.js)   | Enables managing sprint data and related states within the client-side application, fostering organized tracking of sprint details and actions. Key features include setting and updating sprint information, controlling issue modal states, and facilitating stage manipulation. |
| [TeamContexts.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/contexts/TeamContexts.js)       | Defines React context for managing team-related state in the client app. Facilitates user management, modals, and data grid interactions. Enhances reusability and separation of concerns for components throughout the repository.                                                |
| [IssueContexts.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/contexts/IssueContexts.js)     | Establishes state management for issues, versions, modals, comments, and search filters in the React client. Exposes context provider and consumer for Issue related data across components.                                                                                       |
| [UserContext.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/contexts/UserContext.js)         | Enables global user authentication state management in the React client app. Provides functionality for setting and accessing the users authentication status throughout the application. Essential for maintaining user login status seamlessly within the user interface.        |
| [ContextProvider.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/contexts/ContextProvider.js) | Enables centralized state management for UI elements in the client-side React application. Manages navigation, screen size, project visibility, loading status, and more. Facilitates sharing state across components within the Issue-Tracker repository.                         |
| [ProjectContexts.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/contexts/ProjectContexts.js) | Manages project context state in the client React application. Provides data and functions for project management and modal controls. Facilitates seamless communication and updates between components in the Issue-Tracker repository.                                           |
| [DemoContext.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/contexts/DemoContext.js)         | Enables state management for demo data across components. Facilitates centralized data sharing and modification. Essential for maintaining consistency in rendering demo content within the client-side architecture of the repository.                                            |

</details>

<details closed><summary>client.src.App</summary>

| File                                                                                               | Summary                                                                                                                                                                                                                                                                  |
| ---                                                                                                | ---                                                                                                                                                                                                                                                                      |
| [Auth.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/App/Auth.js)           | Creates an authentication provider context for React app to manage user authentication state. It initializes user data and provides functions to update them. Crucial for handling user authentication across the client-side of the Issue Tracker web application.      |
| [AppRouter.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/App/AppRouter.js) | Defines routes and authentication logic for the React app. Fetches user data from the API and renders different components based on the users authentication status. Handles private routes using a conditional rendering approach to ensure proper user access control. |

</details>

<details closed><summary>client.src.App.Login</summary>

| File                                                                                                               | Summary                                                                                                                                                                                                                                                                                      |
| ---                                                                                                                | ---                                                                                                                                                                                                                                                                                          |
| [Login.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/App/Login/Login.js)                   | Enables conditional rendering for user authentication in the login flow. Determines the appropriate UI display based on user authentication status and current path, redirecting authenticated users to the home page. Enhances user experience and navigation within the Issue Tracker app. |
| [LoginComponent.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/App/Login/LoginComponent.js) | Defines a themed login component with OAuth integration, providing a visually appealing and user-friendly authentication interface for the application.                                                                                                                                      |
| [OAuthMethods.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/App/Login/OAuthMethods.js)     | Define OAuth authentication methods with Google, Github, and Microsoft using React icons. Links are set based on environment variables for seamless user authentication.                                                                                                                     |

</details>

<details closed><summary>client.src.App.Login.Demo</summary>

| File                                                                                                                    | Summary                                                                                                                                                                                                                                       |
| ---                                                                                                                     | ---                                                                                                                                                                                                                                           |
| [Login.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/App/Login/Demo/Login.js)                   | Handles user authentication and navigation based on the current path. Renders the appropriate login component or redirects to the home page if the user is authenticated. Relies on React Router for navigation capabilities.                 |
| [LoginComponent.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/App/Login/Demo/LoginComponent.js) | Enables user authentication via OAuth methods and local login. Aesthetic login component with interactive UI for demo purposes. Utilizes MUI components, Axios for API requests, and context for user authentication.                         |
| [OAuthMethods.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/App/Login/Demo/OAuthMethods.js)     | Define OAuth login methods with icons for Github, Microsoft, and Demo Admin, linking each to respective authorization endpoints. Allows users to authenticate via preferred platforms in the Issue-Tracker repositorys frontend architecture. |

</details>

<details closed><summary>client.src.components</summary>

| File                                                                                                                    | Summary                                                                                                                                                                                                                                                                                                                              |
| ---                                                                                                                     | ---                                                                                                                                                                                                                                                                                                                                  |
| [CustomModal.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/CustomModal.js)           | Creates a responsive modal component for displaying content on the UI based on screen width. Manages visibility and animation transitions smoothly. Adaptable for mobile and desktop screens. Essential for interactive user experience within the Issue-Tracker application.                                                        |
| [CustomTooltip.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/CustomTooltip.js)       | Enhances tooltips in client interface with customized style & behavior using MUI Tooltip component. Employs a dark theme with white text, custom fonts, and arrow color. Enhances tooltip readability and aesthetics for improved user experience in the Issue-Tracker web application.                                              |
| [CustomModalSmall.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/CustomModalSmall.js) | Implements a responsive small custom modal component in the client application. It dynamically adjusts its size based on the screen width, providing a user-friendly overlay for displaying content. Introduces smooth animations for visibility changes, enhancing the overall user experience within the Issue-Tracker repository. |
| [Popups.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Popups.js)                     | Defines various interactive popups for creating, editing, and managing projects, sprints, issues, users, and user profiles in the web application. Enables user interactions with project elements without leaving the main view, enhancing project management efficiency.                                                           |

</details>

<details closed><summary>client.src.components.IssuesPage</summary>

| File                                                                                                                       | Summary                                                                                                                                                                                                                                                   |
| ---                                                                                                                        | ---                                                                                                                                                                                                                                                       |
| [AssigneeList.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/IssuesPage/AssigneeList.js) | Displays customizable issue list for project assignments with edit capabilities and iconography based on issue type. Integrates MUI data grid for a user-friendly interface, enhancing project management efficiency within the repositorys architecture. |
| [PostedList.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/IssuesPage/PostedList.js)     | Displays a list of posted issues with editing capabilities. Utilizes context data for issues, teams, and projects. Renders issue details elegantly with icons and user avatars. Customizable grid layout with dynamic page size.                          |
| [Index.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/IssuesPage/Index.js)               | Generates Issue and Project lists based on user context. Fetches data from APIs, updates state, and filters issues for assigned and posted tasks. Renders Assignee and Posted lists in the IssuesPage component of the repositorys frontend architecture. |

</details>

<details closed><summary>client.src.components.Home</summary>

| File                                                                                                               | Summary                                                                                                                                                                                                                                           |
| ---                                                                                                                | ---                                                                                                                                                                                                                                               |
| [CurrentWork.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Home/CurrentWork.js) | Optimizes display layout based on screen size for current work items by dynamically adjusting components positioning. It leverages React states to ensure a responsive interface, enhancing user experience within the Issue Tracker application. |

</details>

<details closed><summary>client.src.components.Home.Projects</summary>

| File                                                                                                                        | Summary                                                                                                                                                                                                                                                                             |
| ---                                                                                                                         | ---                                                                                                                                                                                                                                                                                 |
| [Header.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Home/Projects/Header.js)           | Implements dynamic project search functionality and display in the header, utilizing state and context. Adapts layout based on screen size for enhanced user experience within the Issue Tracker web application.                                                                   |
| [ProjectList.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Home/Projects/ProjectList.js) | Filters and displays projects based on search criteria. Implements dynamic animations for visibility and opacity. Navigates to project details on click. Impactful for enhancing user experience in project management within the client interface of the repositorys architecture. |

</details>

<details closed><summary>client.src.components.Home.Chart</summary>

| File                                                                                                                             | Summary                                                                                                                                                                                                                                   |
| ---                                                                                                                              | ---                                                                                                                                                                                                                                       |
| [IssueUpdateData.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Home/Chart/IssueUpdateData.js) | Generates dynamic productivity chart data for Issue Tracker, incorporating random elements for visual appeal. Integrates Chart.js and React components to visualize issue updates over time, enhancing user experience and data insights. |

</details>

<details closed><summary>client.src.components.Home.Issues</summary>

| File                                                                                                                          | Summary                                                                                                                                                                                                                                                                                |
| ---                                                                                                                           | ---                                                                                                                                                                                                                                                                                    |
| [theme.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Home/Issues/theme.js)                 | Implements theme configuration for typography, palette, and components within the Issues component of the client module. Defines fonts, colors, and styling overrides for the material UI DataGrid component.                                                                          |
| [List.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Home/Issues/List.js)                   | Displays a responsive list of project issues with intuitive icons and styling, allowing users to edit, categorize, and assign tasks efficiently. Enhanced with dynamic theme customization and pagination options for a seamless user experience in the Issue Tracker web application. |
| [DatagridStyle.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Home/Issues/DatagridStyle.js) | Defines custom styles for the data grid in the Issues component, enhancing user experience by adjusting cell colors, font weights, and visibility of separators. Improves readability and usability within the Issue Tracker application.                                              |
| [CustomToolbar.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Home/Issues/CustomToolbar.js) | Enhances data grid functionality by customizing the toolbar display with issue count and title. Interactive quick filter option added for efficient issue management within the repositorys client architecture.                                                                       |

</details>

<details closed><summary>client.src.components.Navbar</summary>

| File                                                                                                           | Summary                                                                                                                                                                                                                                                                                               |
| ---                                                                                                            | ---                                                                                                                                                                                                                                                                                                   |
| [Nav.css](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Navbar/Nav.css)         | Defines styling for the sidebar and top navigation bar components in the repositorys client interface. Enhances user experience with smooth transitions, color schemes, and interactive elements. Maintains consistency with the overall design language of the application.                          |
| [NavItems.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Navbar/NavItems.js) | Defines navigation items for the Navbar, featuring icons and links to key sections of the project management application. Offers easy access to Home, Projects, Issues, Users, and Profile views.                                                                                                     |
| [Nav.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Navbar/Nav.js)           | Manages the navigation elements in the client UI, dynamically adjusting layout based on screen size and user interactions. Renders user-specific controls and facilitates seamless routing within the project management system. Utilizes tooltips and avatar features for a personalized experience. |

</details>

<details closed><summary>client.src.components.Projects</summary>

| File                                                                                                                     | Summary                                                                                                                                            |
| ---                                                                                                                      | ---                                                                                                                                                |
| [AddProjModal.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/AddProjModal.js) | Enhances UI functionality by adding a stylized tooltip for a button component, facilitating seamless project creation within the client interface. |

</details>

<details closed><summary>client.src.components.Projects.Backlog</summary>

| File                                                                                                                             | Summary                                                                                                                                                                                                                                                                       |
| ---                                                                                                                              | ---                                                                                                                                                                                                                                                                           |
| [Empty.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Backlog/Empty.js)               | Renders empty backlog section UI for projects. Displays Backlog heading and Empty message in a styled container. Maintains consistent font styles and layout with flexibility for varying screen sizes.                                                                       |
| [GetRow.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Backlog/GetRow.js)             | Creates interactive backlog rows with icons and tooltips for tasks, bugs, and features. Enables sorting functionality and displays issue details. On click, opens a modal to edit the selected issue. Integrates with IssueContexts for state management.                     |
| [BacklogTable.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Backlog/BacklogTable.js) | Displays and sorts backlog items in a dynamic table based on drag-and-drop interactions. Adjusts layout responsively using context-based styling. Utilizes React and Dnd-kit library for a smooth user experience.                                                            |
| [Container.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Backlog/Container.js)       | Defines a React component managing the backlog view with dynamic layout changes and issue creation functionality. Interacts with context providers for state management. Aids in displaying and interacting with project backlogs within the parent repositorys architecture. |

</details>

<details closed><summary>client.src.components.Projects.Sprints</summary>

| File                                                                                                                           | Summary                                                                                                                                                                                                                                                                                                               |
| ---                                                                                                                            | ---                                                                                                                                                                                                                                                                                                                   |
| [Empty.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Sprints/Empty.js)             | Displays an empty sprint project interface in the projects frontend. Emphasizes a clean design with minimal elements, providing users a clear visual cue for empty sprints. Enhances user experience by visual hierarchy.                                                                                             |
| [GetRow.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Sprints/GetRow.js)           | Generates custom sprint rows displaying issue details and allowing edits within the Issue Tracker. Implements drag-and-drop functionality for sorting, with context access for managing issues efficiently.                                                                                                           |
| [SprintList.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Sprints/SprintList.js)   | Manages the display of sprints, enabling search and creation. Dynamically expands and collapses sprints with edit options. Enhances user interactions via tooltips and responsive layouts, ensuring efficient sprint management within the project ecosystem.                                                         |
| [SprintTable.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Sprints/SprintTable.js) | Manages sprint data display and sorting within the project. Integrates drag-and-drop functionality for organizing issues. Filters data based on search queries and updates displayed content dynamically. Ensures the latest sprint information is fetched from the server for real-time updates after modifications. |
| [Container.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Sprints/Container.js)     | Enables rendering of sprint lists in the project view, with the ability to create new issues, based on context data. Facilitates dynamic layout adjustments based on screen size and user navigation, contributing to a responsive issue-tracking experience.                                                         |

</details>

<details closed><summary>client.src.components.Projects.Sprints.Edit</summary>

| File                                                                                                                                          | Summary                                                                                                                                                                                                                                         |
| ---                                                                                                                                           | ---                                                                                                                                                                                                                                             |
| [EditSprintForm.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Sprints/Edit/EditSprintForm.js)     | Enables editing of sprints within the project context. Manages sprint details, such as title and date range, using form validation. Provides a user-friendly interface for updating sprint information and communicating changes to the server. |
| [EditSprint.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Sprints/Edit/EditSprint.js)             | Enables editing sprints in the project management interface by rendering an Edit Sprint form within a modal, based on the selected sprint from the context.                                                                                     |
| [EditSprintStatus.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Sprints/Edit/EditSprintStatus.js) | Implements dynamic sprint status updates based on server response in the projects sprint management UI component. Utilizes contextual state management for efficient status handling.                                                           |

</details>

<details closed><summary>client.src.components.Projects.Sprints.Create</summary>

| File                                                                                                                                    | Summary                                                                                                                                                                                                                                                               |
| ---                                                                                                                                     | ---                                                                                                                                                                                                                                                                   |
| [SprintStatus.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Sprints/Create/SprintStatus.js) | Implements SprintStatus component displaying success or error alerts based on SprintContexts data. Handles creation status feedback for sprints in the Issue Tracker client, enhancing user interaction.                                                              |
| [CreateSprint.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Sprints/Create/CreateSprint.js) | Enables creation of new sprints within the project tracker by rendering a modal form component. Facilitates seamless sprint creation workflow via context management.                                                                                                 |
| [SprintForm.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Sprints/Create/SprintForm.js)     | Enables creation of new sprints with title, date range selection, and project assignment. Validates input and handles form submission, triggering API post request to add sprint. Updates UI and context upon successful submission or error, offering cancel option. |
| [Datepicker.scss](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Sprints/Create/Datepicker.scss) | Defines styling variables and overrides for a React datepicker component. Customizes font, colors, sizes, and layout for an enhanced user experience.                                                                                                                 |

</details>

<details closed><summary>client.src.components.Projects.Edit</summary>

| File                                                                                                                  | Summary                                                                                                                                                                                                                                  |
| ---                                                                                                                   | ---                                                                                                                                                                                                                                      |
| [ProjForm.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Edit/ProjForm.js) | Enables editing project details, managing team assignments, and progressing to a review stage. Integrates user search, avatar display, and validation for existing project titles. Supports smooth navigation and team modification.     |
| [EditProj.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Edit/EditProj.js) | Enables editing projects in the Issue Tracker web app by displaying a modal with a project form. This component leverages ProjectContexts for context management and handles showing a project review section based on user interaction. |

</details>

<details closed><summary>client.src.components.Projects.Team</summary>

| File                                                                                                          | Summary                                                                                                                                                                                                                                                     |
| ---                                                                                                           | ---                                                                                                                                                                                                                                                         |
| [List.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Team/List.js) | Creates a dynamic grid list for team members linked to the selected project, enabling user editing and email sending functionalities. Utilizes Material-UI components and context data for seamless integration within the parent repositorys architecture. |

</details>

<details closed><summary>client.src.components.Projects.Team.Edit</summary>

| File                                                                                                                                           | Summary                                                                                                                           |
| ---                                                                                                                                            | ---                                                                                                                               |
| [Form.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Team/Edit/Form.js)                             | Defines a React component for editing team projects within the Issue Tracker app.                                                 |
| [EditProjTeam.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Team/Edit/EditProjTeam.js)             | Defines EditProjTeam component for managing project teams on the client side, part of the Issue Tracker repositorys architecture. |
| [EditProjTeamStatus.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Team/Edit/EditProjTeamStatus.js) | Defines a React component to edit project team status within the clients project.                                                 |

</details>

<details closed><summary>client.src.components.Projects.SelectedProjNav</summary>

| File                                                                                                                                             | Summary                                                                                                                                                                                                                                                                                                             |
| ---                                                                                                                                              | ---                                                                                                                                                                                                                                                                                                                 |
| [SelectedProjNav.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SelectedProjNav/SelectedProjNav.js)   | Manages navigation for selected project, displaying project title with edit option. Generates dynamic navigation items and boards, toggling visibility on click. Includes Boards dropdown functionality to show/hide sprints list. Support provided for efficient project navigation within the React application.  |
| [SelectedProjNav.css](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SelectedProjNav/SelectedProjNav.css) | Improve user interface by styling the project navigation sidebar. Enhance visual appeal and user experience. Implement responsive design for project selection.                                                                                                                                                     |
| [SprintList.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SelectedProjNav/SprintList.js)             | Manages sprint list display based on project selection, enabling quick navigation to specific sprints. Adjusts visual height dynamically and links to the selected sprints board. Enhances user experience by facilitating smooth transitions and updating the selected sprint context when a new sprint is chosen. |
| [NavItems.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SelectedProjNav/NavItems.js)                 | Creates navigation items for project pages based on project context. Includes icons for Backlog, Boards, and Team sections with dynamic URLs. Supports seamless project management in the web application.                                                                                                          |

</details>

<details closed><summary>client.src.components.Projects.SprintBoard</summary>

| File                                                                                                                             | Summary                                                                                                                                                                                                                                                                                          |
| ---                                                                                                                              | ---                                                                                                                                                                                                                                                                                              |
| [Stage.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/Stage.js)           | Enables drag-and-drop functionality for project stages on the Sprint Board, facilitating easy sorting. Provides features for editing stages, setting issue limits, and deleting stages with a user-friendly interface. Supports dynamic stage management within the applications Sprint context. |
| [StageIssue.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/StageIssue.js) | Implements sortable functionality for displaying stage issues with icons and tooltips. Maintains drag-and-drop capability using @dnd-kit. Renders issue type-specific icons (Task, Bug, Feature) with corresponding colors.                                                                      |
| [Container.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/Container.js)   | Manages drag-and-drop functionality for sprint board stages, updating issue positions. Retrieves sprints and handles issue stage updates. Integrates DndKit library for smooth user experience. Enhances sprint management and issue tracking in the parent project.                             |

</details>

<details closed><summary>client.src.components.Projects.SprintBoard.EditStage.Delete</summary>

| File                                                                                                                                                        | Summary                                                                                                                                                                                                                                                                                 |
| ---                                                                                                                                                         | ---                                                                                                                                                                                                                                                                                     |
| [DeleteStage.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/EditStage/Delete/DeleteStage.js)         | Enables deletion of project stages within the Sprint Board interface by rendering a custom modal with a delete form. Retrieves the state from the Sprint Contexts to determine when the modal should be displayed.                                                                      |
| [DeleteStageForm.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/EditStage/Delete/DeleteStageForm.js) | Implements deletion functionality for a project stage, displaying related issues and enabling issue transfer. Validates form input and triggers deletion upon confirmation. Supports responsive design and dynamic UI updates. Employs context hooks to manage project and sprint data. |

</details>

<details closed><summary>client.src.components.Projects.SprintBoard.EditStage.IssueLimit</summary>

| File                                                                                                                                                        | Summary                                                                                                                                                                                                                                                                  |
| ---                                                                                                                                                         | ---                                                                                                                                                                                                                                                                      |
| [SetIssueLimit.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/EditStage/IssueLimit/SetIssueLimit.js) | Enables setting issue limits in the Sprint Board by displaying a modal triggered by the context value. Allows users to interact with and modify issue limits, enhancing project management functionality within the Issue-Tracker repositorys architecture.              |
| [Form.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/EditStage/IssueLimit/Form.js)                   | Implements a form for updating issue limits in a projects sprint board. Collaborates with context providers to fetch project data. Validates input and updates limits via API calls. Offers cancel and confirm functionalities with dynamic error handling and feedback. |

</details>

<details closed><summary>client.src.components.Projects.SprintBoard.MultipleContainers</summary>

| File                                                                                                                                                                                                      | Summary                                                                                                                                                                                                                                                                                                                                                |
| ---                                                                                                                                                                                                       | ---                                                                                                                                                                                                                                                                                                                                                    |
| [MultipleContainers.tsx](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/MultipleContainers/MultipleContainers.tsx)                                     | Enables drag-and-drop functionality across multiple containers within the Sprint Board. Facilitates dynamic column rearrangement and issue movement, with interactive UI components like Add Column feature and Trash drop zone for deleting items. Integrates sorting strategies and handles item placement efficiently for project management tasks. |
| [multipleContainersKeyboardCoordinates.ts](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/MultipleContainers/multipleContainersKeyboardCoordinates.ts) | Generates keyboard coordinates for multiple containers on the Sprint Board. Utilizes drag-and-drop Kit functions to calculate the closest collision, enabling seamless container repositioning based on keyboard inputs.                                                                                                                               |
| [index.ts](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/MultipleContainers/index.ts)                                                                 | Exports a component to manage multiple containers in the Sprint Board section, supporting agile project management in the parent repository.                                                                                                                                                                                                           |

</details>

<details closed><summary>client.src.components.Projects.SprintBoard.utilities</summary>

| File                                                                                                                                         | Summary                                                                                                                                                                                                                                    |
| ---                                                                                                                                          | ---                                                                                                                                                                                                                                        |
| [createRange.ts](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/utilities/createRange.ts) | Generates a range of values using a specified length and initializer function. This utility function supports flexible array creation for dynamic Sprint Board features within the client-side components of the Issue-Tracker repository. |
| [index.ts](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/utilities/index.ts)             | Exports the `createRange` function for generating date ranges used within the Sprint Board component in the client application.                                                                                                            |

</details>

<details closed><summary>client.src.components.Projects.SprintBoard.components</summary>

| File                                                                                                                              | Summary                                                                                                                                                |
| ---                                                                                                                               | ---                                                                                                                                                    |
| [index.ts](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/components/index.ts) | Exports components Container and Item for Sprint Board feature in the client app, enhancing project management functionality with reusable components. |

</details>

<details closed><summary>client.src.components.Projects.SprintBoard.components.Container</summary>

| File                                                                                                                                                  | Summary                                                                                                                                                                                                                                                                                                    |
| ---                                                                                                                                                   | ---                                                                                                                                                                                                                                                                                                        |
| [Container.tsx](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/components/Container/Container.tsx) | Enables interactive manipulation of project stages within the sprint board component. Integrates stage editing, issue limits, deletion, and UI responsiveness. Facilitates dynamic updates of stage titles and issue limits with backend interactions for enhanced project management on the sprint board. |
| [index.ts](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/components/Container/index.ts)           | Exports `Container` component and its props from the SprintBoard module for project management in the repositorys client architecture.                                                                                                                                                                     |

</details>

<details closed><summary>client.src.components.Projects.SprintBoard.components.AddContainer</summary>

| File                                                                                                                                                           | Summary                                                                                                                                                                                               |
| ---                                                                                                                                                            | ---                                                                                                                                                                                                   |
| [AddContainer.tsx](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/components/AddContainer/AddContainer.tsx) | Implements interactive UI for adding project stages dynamically. Utilizes context and axios for seamless data handling. Features include input validations, stage addition to server, and UI updates. |
| [index.ts](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/components/AddContainer/index.ts)                 | Enables exporting and typing for the AddContainer component within the Projects/SprintBoard directory in the client module of the Issue Tracker repository.                                           |

</details>

<details closed><summary>client.src.components.Projects.SprintBoard.components.Item</summary>

| File                                                                                                                                   | Summary                                                                                                                                                                                                                                           |
| ---                                                                                                                                    | ---                                                                                                                                                                                                                                               |
| [Item.tsx](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/components/Item/Item.tsx) | Enables custom rendering of sprint board items based on issue types and user interactions. Handles drag-and-drop functionality with dynamic styles. Facilitates seamless issue management within the sprint board UI, optimizing user experience. |
| [index.ts](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/SprintBoard/components/Item/index.ts) | Exports the Item component for the Sprint Board within Projects. Provides a modular structure for easy component reuse in the client-side of the Issue Tracker application.                                                                       |

</details>

<details closed><summary>client.src.components.Projects.Create</summary>

| File                                                                                                                        | Summary                                                                                                                                                                                                                                                                                         |
| ---                                                                                                                         | ---                                                                                                                                                                                                                                                                                             |
| [ProjTypes.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Create/ProjTypes.js)   | Defines project types as Scrum and Kanban for the Issue Tracker app. Incorporated in the Projects creation feature of the client module.                                                                                                                                                        |
| [ProjForm.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Create/ProjForm.js)     | Enables creating new projects with validation and team selection. Displays project details and team members, allowing for editing and confirmation. Facilitates smooth project setup and review process.                                                                                        |
| [CreateProj.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Create/CreateProj.js) | Enables creating projects using context state and modals in the React client. Connects to ProjectContexts for state management, displays a form with a review option within a CustomModal component. Supports a seamless project creation process in the Issue-Tracker repository architecture. |
| [Confirm.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Create/Confirm.js)       | Enables project review and confirmation with a user-friendly interface. Captures project details, team composition, and offers options to go back or confirm the project. Facilitates seamless project creation or updates within the Issue Tracker repositorys client architecture.            |
| [ProjStatus.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/Create/ProjStatus.js) | Illustrates project status feedback in React using Material-UI Snackbar alerts. Context-driven messages inform users of project creation, update success, or error states. Enhances user experience by providing real-time status notifications within the Issue-Tracker web application.       |

</details>

<details closed><summary>client.src.components.Projects.ProjectNavbar</summary>

| File                                                                                                                                                 | Summary                                                                                                                                                                                                                                                                                                  |
| ---                                                                                                                                                  | ---                                                                                                                                                                                                                                                                                                      |
| [NavBackGdDefault.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/ProjectNavbar/NavBackGdDefault.js)       | Defines dynamic navigation behavior based on project page route. Manages project sidebar visibility and width. Toggles sidebar display and aligns arrow button accordingly. Enhances project navigation experience within the Issue Tracker repositorys frontend architecture.                           |
| [SwitchBtn.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/ProjectNavbar/SwitchBtn.js)                     | Implements a dynamic project switch button in the React project navigation bar. Allows toggling between current and other projects with smooth animations. Enhances user experience and navigation flexibility within the Issue Tracker application.                                                     |
| [NavBackGd.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/ProjectNavbar/NavBackGd.js)                     | Manages dynamic project navigation layout, enabling easy switching between project views. Adjusts sidebar width based on toggles, and controls visibility and transitions for a seamless user experience. Contains logic to toggle project panels with smooth animations.                                |
| [ProjectNav.css](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/ProjectNavbar/ProjectNav.css)                 | Styles ProjectNav with CSS rules for the Project Sidebar elements, search bar, project rows, and hover effects. Enhances user experience and visual appeal of the Issue Trackers project navigation interface.                                                                                           |
| [SwapProjNavVertical.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/ProjectNavbar/SwapProjNavVertical.js) | Enables vertical navigation swapping within the project interface. Integrates project selection toggles with visual feedback using custom tooltips and icons. Enhances user experience by quickly switching between projects.                                                                            |
| [ProjectNavbar.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/ProjectNavbar/ProjectNavbar.js)             | Manages project navigation, search, and creation. Fetches projects when needed, filters, and displays them. Handles project selection and editing functionalities with smooth user interactions. Enhances project management within the client interface.                                                |
| [NavBack.css](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/ProjectNavbar/NavBack.css)                       | Defines styles for project navigation sidebar components, enhancing user experience. Maintains consistency and visual appeal with fixed and absolute positioning, smooth scrolling, and subtle box shadows. Complements repositorys frontend architecture for improved project management functionality. |
| [SwapProjNav.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Projects/ProjectNavbar/SwapProjNav.js)                 | Implements interactive project navigation toggle in client UI using React icons, custom tooltips, and switch elements. Enables easy switching between current and other projects within the Issue-Tracker repositorys architecture.                                                                      |

</details>

<details closed><summary>client.src.components.utils</summary>

| File                                                                                                                    | Summary                                                                                                                                                                                                                         |
| ---                                                                                                                     | ---                                                                                                                                                                                                                             |
| [isEmptyObject.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/utils/isEmptyObject.js) | Verifies empty objects for conditional logic across client components, enhancing data handling.                                                                                                                                 |
| [PageMargin2.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/utils/PageMargin2.js)     | Defines dynamic page margins based on navigation and project status for enhanced UI/UX in React app. Utilizes context to adjust margin sizes, optimizing layout.                                                                |
| [PageMargin.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/utils/PageMargin.js)       | Defines dynamic page margins based on navigation state, enhancing UI responsiveness. Utilizes Reacts context for state management. Promotes consistent layout across different navigation scenarios, improving user experience. |
| [TitleCase.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/utils/TitleCase.js)         | Transforms input strings into title case format by capitalizing the first letter of each word. Located in the client repository under utils, this function enhances text readability within the applications user interface.    |
| [isMobile.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/utils/isMobile.js)           | Monitors and updates screen width in the React application, adjusting dynamically to browser resizing. This module ensures responsive design by tracking and managing the viewport width changes for optimal user experience.   |

</details>

<details closed><summary>client.src.components.utils.UserAvatar</summary>

| File                                                                                                                             | Summary                                                                                            |
| ---                                                                                                                              | ---                                                                                                |
| [StringAvatar.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/utils/UserAvatar/StringAvatar.js) | Generates color and initials for user avatars based on input string, enhancing UI personalization. |

</details>

<details closed><summary>client.src.components.Team</summary>

| File                                                                                                                     | Summary                                                                                                                                                                                                                                                                                 |
| ---                                                                                                                      | ---                                                                                                                                                                                                                                                                                     |
| [RoleEditStatus.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Team/RoleEditStatus.js) | Enables dynamic display of role change status in a user-friendly way. React component for handling notifications based on API response. Supports success and error alerts with auto-hide functionality for seamless user experience.                                                    |
| [TeamTable.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Team/TeamTable.js)           | Manages a responsive table for teams, enabling user actions like editing and sending emails. Dynamically loads user data from an API and supports customizable themes. Intuitive toolbar functionalities, including quick filtering and density selection, enhance the user experience. |

</details>

<details closed><summary>client.src.components.Team.AddUser</summary>

| File                                                                                                                           | Summary                                                                                                                                                                                                                              |
| ---                                                                                                                            | ---                                                                                                                                                                                                                                  |
| [AddUserForm.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Team/AddUser/AddUserForm.js)     | Enables user creation with form validation and role selection. Integrates with the parent repositorys React app through context usage. Implements password visibility toggles and submission handling via Axios.                     |
| [AddUserStatus.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Team/AddUser/AddUserStatus.js) | Implements user status alerts based on server responses. Uses React and MUI components to display success, error, or warning messages for user creation. Syncs status with TeamContexts.                                             |
| [AddUser.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Team/AddUser/AddUser.js)             | Enables adding a user to a team using a modal form. Integrates TeamContexts for state management and CustomModal for UI consistency. Promotes reusability and enhances the user experience within the Issue Tracker web application. |

</details>

<details closed><summary>client.src.components.Team.AssignToProject</summary>

| File                                                                                                                                         | Summary                                                                                                                                                                                                    |
| ---                                                                                                                                          | ---                                                                                                                                                                                                        |
| [AssignToProj.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Team/AssignToProject/AssignToProj.js)         | Enables assigning team members to projects via a modal form, leveraging the TeamContext to manage state. Renders AssignToProjForm within a CustomModal component based on the AssignProjModal state.       |
| [AssignToProjForm.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Team/AssignToProject/AssignToProjForm.js) | Enables assigning users to projects, showcasing project selection, user search functionalities, and submission controls. Facilitates seamless user and project management within the Issue Tracker system. |

</details>

<details closed><summary>client.src.components.Team.EditUser</summary>

| File                                                                                                                              | Summary                                                                                                                                                                                                                                                                                                                                 |
| ---                                                                                                                               | ---                                                                                                                                                                                                                                                                                                                                     |
| [EditUserForm.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Team/EditUser/EditUserForm.js)     | Enables editing user details, including name, email, role, and password, with validation. Handles password changes and user deletion confirmation. Implements form submission functionality and updates user information via a PUT request. Offers a seamless user experience within the Issue-Tracker projects front-end architecture. |
| [EditUserStatus.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Team/EditUser/EditUserStatus.js) | Implements user status notifications based on edit actions in the Team context. Renders success or error alerts using MUI components. Enhances user experience by providing visual feedback within the app.                                                                                                                             |
| [EditUser.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Team/EditUser/EditUser.js)             | Enables editing user details via a modal within the team context. Uses React, CustomModal component, and EditUserForm component. Facilitates seamless user updates in the Issue Tracker web application.                                                                                                                                |

</details>

<details closed><summary>client.src.components.TopBar</summary>

| File                                                                                                           | Summary                                                                                                                                                                                        |
| ---                                                                                                            | ---                                                                                                                                                                                            |
| [UserInfo.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/TopBar/UserInfo.js) | Enables dynamic display of user information on the top bar interface by fetching and rendering user data, ensuring seamless user authentication and profile management within the application. |

</details>

<details closed><summary>client.src.components.Issues.Comments</summary>

| File                                                                                                                    | Summary                                                                                                                                                                                                                                                                                      |
| ---                                                                                                                     | ---                                                                                                                                                                                                                                                                                          |
| [Create.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Issues/Comments/Create.js)     | Facilitates creating comments for an issue. Manages comment creation UI with dynamic styling based on user interactions. Executes comment posting logic via API call with user authentication. Intuitive interface for users to enhance collaboration on issues in the Issue Tracker system. |
| [List.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Issues/Comments/List.js)         | Generates dynamic comment list for a selected issue including user avatars and timestamps. Displays comments sorted by creation date with user names and content. Handles real-time updates via EventSource.                                                                                 |
| [Comments.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Issues/Comments/Comments.js) | Defines rendering logic for displaying and managing comments within the Issue Tracker frontend. Integrates creation and listing components to interact with comments, enhancing user experience and functionality.                                                                           |

</details>

<details closed><summary>client.src.components.Issues.Delete</summary>

| File                                                                                                              | Summary                                                                                                                                                                                                                                             |
| ---                                                                                                               | ---                                                                                                                                                                                                                                                 |
| [Delete.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Issues/Delete/Delete.js) | Implements issue deletion functionality in the repositorys front-end. Interacts with the IssueContexts for state management and utilizes Axios for API calls. Provides user prompts for confirmation and cancellation, updating the UI accordingly. |

</details>

<details closed><summary>client.src.components.Issues.Edit</summary>

| File                                                                                                                      | Summary                                                                                                                                                                                                                                                                                                   |
| ---                                                                                                                       | ---                                                                                                                                                                                                                                                                                                       |
| [EditIssue.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Issues/Edit/EditIssue.js)     | Manages edit functionality within the Issue Tracker by displaying different sections based on user interaction. Integrates with IssueContexts for state management and handles viewing issue history, comments, and deletion operations within a modal interface.                                         |
| [FormWrapper.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Issues/Edit/FormWrapper.js) | Manages form interactions for editing issues, incorporating user, sprint, and stage functionalities. Allows modifying issue details like summary, assignee, type, and stage. Handles user and sprint search functionality. Supports issue updates and stage transitions within the application interface. |

</details>

<details closed><summary>client.src.components.Issues.History</summary>

| File                                                                                                                 | Summary                                                                                                                                                                                                                                                                                                                  |
| ---                                                                                                                  | ---                                                                                                                                                                                                                                                                                                                      |
| [History.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Issues/History/History.js) | Displays issue update history with user and field changes, date stamps, and avatar rendering. Utilizes context data for issue, team, and sprint details. Manages real-time event streaming of issue changes via Server-Sent Events. Enhances user experience in tracking issue progress within the Issue Tracker system. |

</details>

<details closed><summary>client.src.components.Issues.Create</summary>

| File                                                                                                                        | Summary                                                                                                                                                                                                                                                                                                              |
| ---                                                                                                                         | ---                                                                                                                                                                                                                                                                                                                  |
| [IssueStatus.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Issues/Create/IssueStatus.js) | Illustrates issue status notifications based on context, enhancing user feedback in the UI. Integrates with `IssueContexts` to display success, error, or warning messages for different status codes. Promotes a responsive and informative user experience within the parent repositorys architecture.             |
| [Types.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Issues/Create/Types.js)             | Defines issue types with corresponding icons for the Issue Tracker client interface to visually represent different categories of tasks, bugs, and features.                                                                                                                                                         |
| [CreateIssue.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Issues/Create/CreateIssue.js) | Enables creating new issues by rendering a form within a modal component based on the Issue Context. Complements the Issue Trackers frontend architecture for seamless issue management.                                                                                                                             |
| [IssueForm.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/Issues/Create/IssueForm.js)     | Enables creating new issues within the project, including issue type selection, assignment to user, and summary description. Manages issue states for backlog and sprint, facilitating issue creation and submission with validation. Additionally, offers cancel and submit functionalities with feedback handling. |

</details>

<details closed><summary>client.src.components.LoggedInUser.Edit</summary>

| File                                                                                                                                          | Summary                                                                                                                                                                                                                                                                                                                           |
| ---                                                                                                                                           | ---                                                                                                                                                                                                                                                                                                                               |
| [EditThisUserForm.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/LoggedInUser/Edit/EditThisUserForm.js)     | Enables editing user details, including password change and role swap, with validation. Handles user deletion confirmation. Implements form fields with dynamic display. Handles submission, role toggling, and user data updates via API requests. Streamlines the user experience by providing clear feedback and interactions. |
| [EditThisUserStatus.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/LoggedInUser/Edit/EditThisUserStatus.js) | Implements user status editing feedback with MUI alerts. Integrates with TeamContexts for state management. Supports success and error messages based on HTTP response codes.                                                                                                                                                     |
| [EditThisUser.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/components/LoggedInUser/Edit/EditThisUser.js)             | Enables editing of user profile with modal using context state from TeamContexts, rendering EditThisUserForm within CustomModal in the client-side architecture of the Issue Tracker repository.                                                                                                                                  |

</details>

<details closed><summary>client.src.pages</summary>

| File                                                                                           | Summary                                                                                                                                                                                                                                                        |
| ---                                                                                            | ---                                                                                                                                                                                                                                                            |
| [Team.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/pages/Team.js)     | Displays team navigation interface with conditionally rendered styles based on user context. Utilizes React Router for location tracking and integrates TeamTable component for team data presentation. Enhances user experience in Issue Tracker app.         |
| [Issues.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/pages/Issues.js) | Coordinates rendering and data fetching for project issues display in the web app. Adapts UI based on user navigation choices. Retrieves team members details from the API and renders the issue index within the app.                                         |
| [Home.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/pages/Home.js)     | Enables fetching and displaying essential data for the Home page. Initializes state contexts, retrieves data via API calls, and renders dynamic content based on user navigation. Facilitates a seamless user experience within the Issue-Tracker application. |

</details>

<details closed><summary>client.src.pages.Projects</summary>

| File                                                                                                                | Summary                                                                                                                                                                                                                                                                                      |
| ---                                                                                                                 | ---                                                                                                                                                                                                                                                                                          |
| [Team.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/pages/Projects/Team.js)                 | Fetches project, user, and sprint data, and displays the team list with relevant project details. Utilizes context and parameters for dynamic rendering and effective team coordination within the Issue-Tracker ecosystem.                                                                  |
| [Backlog.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/pages/Projects/Backlog.js)           | Manages drag-and-drop functionality for project backlog items with seamless transitions. Displays active project and task lists with sprint options. Handles issue movement between backlog and sprint with user authentication. Effortlessly moves tasks in a visually intuitive interface. |
| [SprintBoard.tsx](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/pages/Projects/SprintBoard.tsx) | Enables dynamic rendering of sprint-related data for project management within the web application. Facilitates real-time updates and interactions for sprint boards, issues, and team details based on user selections and API calls.                                                       |
| [Projects.js](https://github.com/HzaRashid/Issue-Tracker/blob/master/client/src/pages/Projects/Projects.js)         | Enables dynamic rendering of project-related components based on user navigation and location, enhancing the interactive project management feature set of the repositorys frontend architecture.                                                                                            |

</details>

---

## API Endpoints

<details closed>
<summary>Click to expand API Endpoints</summary>

### User Routes (Located in `UserRoute.js`)

| Method | Endpoint | Description | Function |
| --- | --- | --- | --- |
| GET | /users/ | Get all users | `getUsers` |
| POST | /users/add | Add a new user | `addUser` |
| PUT | /users/project | Add a user to a project | `addProjectUser` |
| PUT | /users/project-team | Add or delete a user from a project team | `addProjectUserNext`, `deleteProjectUser` |
| PUT | /users/edit-role/ | Edit a user's role | `editUserRole` |
| PUT | /users/edit | Edit user details | `editUser` |
| DELETE | /users/:id | Delete a user | `deleteUser` |

### Issue Routes (Located in `IssueRoute.js`)

| Method | Endpoint | Description | Function |
| --- | --- | --- | --- |
| GET | /issues/ | Get all issues | `getIssues` |
| GET | /issues/table | Get issues table | `getIssuesTable` |
| GET | /issues/versions/sse/:id | Send issue versions using SSE | `sendIssueVersions` |
| GET | /issues/versions/:id | Get issue versions | `getIssueVersions` |
| POST | /issues/add-issue | Add a new issue | `addIssue` |
| PUT | /issues/summary | Edit issue summary | `editIssueSummary` |
| PUT | /issues/type | Edit issue type | `editIssueType` |
| PUT | /issues/sprint | Edit issue sprint | `editIssueSprint` |
| PUT | /issues/assignee | Edit issue assignee | `editIssueAssignee` |
| PUT | /issues/stage | Edit issue stage | `editIssueStage` |
| PUT | /issues/board-stage | Edit issue board stage | `editIssueStage` |
| PUT | /issues/many-issues-stage | Transfer many issues to another stage and delete sprint stage | `transferManyIssuesStage`, `deleteSprintStage` |
| DELETE | /issues/delete | Delete an issue | `deleteIssue` |
| PUT | /issues/reorder | Reorder issues | `reOrderIssues` |

### Sprint Routes (Located in `SprintRoute.js`)

| Method | Endpoint | Description | Function |
| --- | --- | --- | --- |
| GET | /sprints/get | Get all sprints | `getSprints` |
| POST | /sprints/ | Add a new sprint and edit issue sprint | `addSprint`, `editIssueSprint` |
| PUT | /sprints/title | Edit sprint title | `editSprintTitle` |
| PUT | /sprints/startDate | Edit sprint start date | `editSprintStartDate` |
| PUT | /sprints/endDate | Edit sprint end date | `editSprintEndDate` |
| PUT | /sprints/edit | General edit for sprint | `GeneralEdit` |
| PUT | /sprints/update-stage-title | Update sprint stage title and edit many issues stage | `editSprintStageTitle`, `editManyIssuesStage` |
| PUT | /sprints/update-stage-issue-limit | Update sprint stage issue limit | `editSprintStageIssueLimit` |
| PUT | /sprints/add-stage | Add a new sprint stage | `addSprintStage` |
| DELETE | /sprints/delete | Delete a sprint | `deleteSprint` |

### Project Routes (Located in `ProjectRoute.js`)

| Method | Endpoint | Description | Function |
| --- | --- | --- | --- |
| GET | /projects/ | Get all projects | `getProjects` |
| POST | /projects/ | Add a new project | `addProject` |
| PUT | /projects/title | Edit project title | `editProjectTitle` |
| PUT | /projects/edit-all | Edit project details and manage users | `editProjectTitleNext`, `addProjectUserNext`, `deleteProjectUser` |
| PUT | /projects/add-team | Add a team to a project | `addProjectUser` |
| PUT | /projects/team | Edit project team | `editProjectTeam` |
| PUT | /projects/key | Edit project key | `editProjectTitle` |
| PUT | /projects/startDate | Edit project start date | `editProjectStartDate` |
| PUT | /projects/endDate | Edit project end date | `editProjectEndDate` |
| PUT | /projects/description | Edit project description | `editProjectDesc` |
| DELETE | /projects/delete | Delete a project | `deleteProject` |

### Comment Routes (Located in `CommentRoute.js`)

| Method | Endpoint | Description | Function |
| --- | --- | --- | --- |
| GET | /comments/SSE/:id | Send comments using Server-Sent Events (SSE) | `sendComments` |
| POST | /comments/ | Write a comment | `writeComment` |

</details>
