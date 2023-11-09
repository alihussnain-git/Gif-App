# Solution

## Description
The Gif App is a mobile application built using React Native that allows users to discover and share GIFs from the Giphy API. It provides a user-friendly interface to search for GIFs and view random GIFs.


## Implementation Overview
The app is crafted with React Native, leveraging the power of React Navigation for seamless navigation, React Query for efficient data fetching, and Axios for streamlined API requests. Its architecture is meticulously designed with modularity in mind, ensuring components and hooks are neatly organized to promote code reusability.

Despite the apparent simplicity of the project, a deliberate and strategic approach was taken when structuring the API calls. This decision was driven by a desire to not just meet the task's requirements but to demonstrate a commitment to best practices. The architecture was built with scalability at its core, laying a robust foundation for future enhancements without compromising code quality, maintainability, or performance.

This meticulous approach was particularly important given that the evaluation of this task focused on network communication and data mapping to components. Therefore, every effort was made to ensure the state of each component was optimized for performance.
Additionally, the maintainment of a clear and well-documented commit history showcases proficiency in Git skills.

## How to Use
1. Clone the repository to your local machine. Assuming that you have react native CLI configured mentioned here. https://reactnative.dev/docs/environment-setup, follow the next steps to run the project.
2. Install the required dependencies using `npm install` or `yarn install`.
3. Run the app using `yarn ios` or `yarn android` to run on iOS or android respectively.
Note. For ios don't forget to install pods first, using `cd ios && pod install && cd ..` in terminal of the project directory.

## Code Structure
The project is structured as follows:
- `api`: Files for interacting with the API, including data types and service methods.
- `assets`: Assets/images and their extraction in icons.ts.
- `components`: Reusable UI components.
- `local`: Strings being used across the app are in strings.ts.
- `navigation`: Navigation logic and routes.
- `react-query-hooks`: Hooks created using react query to call the APIs inside the components.
- `screens`: Screen components representing different app views.
- `theme`: Contains app core theme elements for fonts, spacings etc. and global styles to shared across the app.
- `utils`: Utility functions, such as hook, TestIDs etc.

## Design Decisions
- **React Query**: Used for data fetching and caching, improving the app's performance by reducing unnecessary API calls, providing and clean approach to connect components with APIs without writing our own custom hooks.
- **Modular Components**: Components are designed to be modular and reusable, promoting maintainability and code organization.
- **Axios**: Utilized for making API requests due to its simplicity and support for request customization.

## Known Limitations
- Limited Testing: Automated tests have not been included in this implementation.
- Minimal Styling: The focus was on functionality rather than UI aesthetics.
- Simplified Loading and Error Handling: Loading and Error handling has been kept minimal for the sake of brevity.
- Add support for language and locales, currently hard coded strings added for the sake of simplicity.
- The setup of the environment should be orchestrated through React Native Config, a valuable tool that facilitates the configuration of distinct environments to ensure robust support for varying deployment contexts. Also secrets currently kept in config.ts should never be part of repo directly and store at a secure platform e.g.1password etc.
- No extras added like pagination, sharing gifs etc. to keep the time spent minimal

[wireframe-image]: https://imgur.com/Kja1rsy.png
[github-labels]: https://help.github.com/articles/about-labels
