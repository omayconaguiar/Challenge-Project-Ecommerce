# Frontend React (User Story: Robust Frontend Integration)

- This is an example of a React 18 + TypeScript frontend illustrating:
- Integration with a backend (using axios and interceptors).
- Optimized data flow (custom hooks, authentication context).
- Comprehensive error handling (ErrorBoundary, interceptors, error states).
- Basic form validation.
- Routing, login, and logout.

## Scripts

- `npm install`  
 Installs dependencies.

- `npm run dev`  
  Starts the development server (via Vite) at http://localhost:5173

- `npm run build`  
  Generates a production build in the /dist folder

- `npm run preview`  
  Builds and then launches a local server for preview

## Structure

- **src/api**: axios configuration (baseURL, interceptors).
- **src/context**: Global state management (e.g., AuthContext).
- **src/hooks**: Custom hooks for API calls (e.g., useUsers).
- **src/components**: Reusable components (ErrorBoundary, forms, etc.).
- **src/pages**: Main pages (routes like /users, /login, etc.).
- **src/services**: Services for specific calls (e.g., auth).

## Backend Integration
Make sure to adjust the `.env` (or `import.meta.env`) variable `VITE_API_BASE_URL` to point to your backend’s endpoint (e.g., `http://localhost:3000/api`).

## Notes

- For more advanced authentication (JWT), ensure your backend returns tokens and refresh endpoints.
- For more robust form validations, consider libraries like react-hook-form or Formik.
- For data caching and automatic revalidation, libraries such as SWR or React Query can be helpful.
- ErrorBoundary only catches rendering errors, not asynchronous errors (these are handled via .catch or try/catch in interceptors).
