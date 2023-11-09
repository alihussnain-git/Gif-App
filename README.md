# Picnic Recruitment Task

Please read the following instructions carefully and make sure that you fulfil
all requirements listed.

## Overview

This is a React Native programming assignment we've created specifically for our
recruitment process.
You were given a link to GitHub, which when you visited that link,
created a private fork of this repository. Only you and developers at Picnic
can see the code you push to this repository.

High-level instructions:

1. Read and follow the task specified below.
2. Make a local clone of this repository on your machine, and do your work on a
   branch other than `master`. Do not make any changes to the `master` branch.
3. Push your changes as frequently as you like to `origin/your-branch-name`,
   and create a pull request to merge your changes back into the `master`
   branch. Don't merge your pull request. Once you're finished with the
   assignment, we will do a code review of your pull request.
4. When you're finished, [create and add][github-labels] the label `done` to
   your pull request. This will notify us that your code is ready to be
   reviewed. Please do **NOT** publish your solution on a publicly available
   location (such as a public GitHub repository, your personal website, _et
   cetera_).

This process closely mimics our actual development and review cycle. We hope
you enjoy it!

## Task

We would like you to write code that will cover the functionality listed below and provide us with the source as well as the output of a React Native app that consists of two screens:

![Wireframe][wireframe-image]

### Screen 1:

Screen 1 has the following two functionalities:

1. Displaying a random GIF:
   - Upon opening the app, it should connect to the Giphy random API and display a random GIF as displayed in **Fig 1**.
   - The random GIF displayed on this screen should be animated.
   - Every 10 seconds a new random GIF should replace the previous loaded one. This should continue as long as the user has no search results displayed.
   - **Screen 1** should also display the GIF title, link and an age restriction badge.
2. Search Bar:
   - Upon clicking the search bar, we start a live search after characters have been entered. This means that once the user has typed two characters, the search API should be called and not wait until the user pressed search.
   - The returning results should be displayed as shown in **Fig 2**. The GIFs’ in the search results do not have to be animated and the list doesn’t have to include infinite scrolling.
   - Tapping one of the list items should navigate the user to **Screen 2**.
   - This screen should be able to retain its state, in case the user navigates back to it from **Screen 2**.
   - On canceling the search, the screen should go back to displaying the random GIF.

### Screen 2:

Screen 2 only has the following functionality:

1. Displaying the GIF that was tapped:
   - On **Screen 2** the tapped GIF should be displayed animated along with the title, link and age restriction badge as displayed in **Fig 3**.
   - Upon tapping the back button, the user should be taken back to **Screen 1**.

### Useful information:

- API Documentation: https://developers.giphy.com/docs/
- Use the following API Key: `BluxFAOfAHEf9xg0PdiHD1fqlEAEdlSu`

### Extras:

- It is **not** allowed to use the GIPHY SDK.
- It is allowed to use any other third party libraries you seem fit, but please attach a brief description of why you’ve selected it.
- The app should be written in either Javascript or Typescript.
- Please also provide a brief description of the overall app architecture and the reasoning behind picking it over any other possible alternative.

### Grading Criteria:

You will be assessed on the following criteria:

- Architecture and approach
- Execution
- Testability
- Code readability and style
- Usage of git

_Thanks in advance for your time and interest in Picnic!_


# Solution

## Description
The Picnic Giphy App is a mobile application built using React Native that allows users to discover and share GIFs from the Giphy API. It provides a user-friendly interface to search for GIFs and view random GIFs.


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
