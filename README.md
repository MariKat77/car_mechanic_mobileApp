# Car Mechanic Mobile App

Car Mechanic Mobile App is a mobile application built using the Expo framework. The app is designed to help users keep track of their car mechanic visits, manage reminders, and receive push notifications for scheduled appointments.

## Features

- **Record Visits:** Add new visits with details like date, time and description.
- **Reminders:** Set up reminders for upcoming appointments.
- **Push Notifications:** Automatically receive notifications about upcoming visits.
- **Visit History:** View a chronological list of past visits.

## Requirements

- Node.js version 14 or higher.
- Expo CLI (installed globally): `npm install -g expo-cli`
- A physical Android/iOS device or emulator.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MariKat77/car_mechanic_mobileApp.git
   cd car_mechanic_mobileApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   expo start
   ```

4. Scan the QR code in the Expo Go app on your phone to run the application.

## Technology Stack

- **Expo:** Framework for rapid mobile application development using JavaScript/TypeScript.
- **React Native:** Library for building user interfaces in mobile apps.
- **Expo Notifications:** Module for handling push notifications.
- **AsyncStorage:** Local database for storing user data.

## Usage

1. **Adding Visits:**

   - Tap the plus button on the main screen.
   - Fill in visit details (name, phone, date, car model, repair scope, etc.).
   - Save the visit.

2. **Setting Reminders:**

   - Go to the Settings screen.
   - Choose reminder day, time, and service interval.
   - Save the settings.

3. **Receiving Notifications:**

   - Ensure the app has notification permissions.
   - Notifications will appear according to the configured reminder settings.

4. **Managing Visits:**
   - Edit or delete existing visits from the list view.

## Example Screens

- **Home Screen:** List of visits with options to add, edit, or delete entries.
- **Settings Screen:** Configure reminders and service intervals.

## Development

1. Create a branch for new features:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Implement your changes and submit a pull request to the main branch.

## Contact

For questions or suggestions about the project, contact: `mario.1999.mk@gmail.com`.

---

### Project Files

- **`index.tsx`:** Main application logic for managing clients and appointments.
- **`settings.tsx`:** Configuration for reminders and service intervals.

Feel free to explore and contribute!
