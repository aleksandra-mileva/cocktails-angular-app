# Cocktails blog

This project is a blog about cocktails. It is a place where users can find recipes for different cocktails, share their own cocktails, comment on the cocktails of other users, save their favourite cocktails.


## Cocktails REST API

**<span style="font-size: large;">The application consumes the REST API from the following repository: [Cocktails REST API](https://github.com/aleksandra-mileva/cocktails-rest-api)</span>**

**<span style="font-size: medium;">See how to run the Cocktails REST API in its Readme: [Cocktails REST API](https://github.com/aleksandra-mileva/cocktails-rest-api)</span>**

## How to run the Cocktails Angular App
- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.19.
- You need to run the Rest Api first.
- You need to have Node.js and npm installed.
- install dependencies: `npm install`.
- If you have Angular CLI installed globally and it matches the project’s Angular version, you can run: `ng serve`.
- The application will be available at: http://localhost:4200
- You can log in with the following credentials:
  - **Admin**: username: `admin`, password: `12345`
  - **User**: username: `user`, password: `12345`

---

## Built With
- **Angular** `18.2.19`
- **TypeScript**
- **RxJS**
- **Angular Material**
- **Cloudinary API**
- **Custom Pipes, Guards, and Interceptors**
- **CSS** & Angular Animations

---

## Functionality

### Public Part (accessible without authentication)
- **Home page:** `/home`
- **List all cocktails:** `/cocktails/all`
- **Search cocktails by criteria:** `/cocktails/search`
- **Filter cocktails by spirit:** `/cocktails/spirit/:spirit`
- **View single cocktail details:** `/cocktails/details/:cocktailId`
- **View posted comments for a cocktail**
- **Login:** `/users/login`
- **Register:** `/users/register`

### Private Part (available for registered users)
- **Add a new cocktail:** `/cocktails/add`
- **Edit your own cocktail:** `/cocktails/:cocktailId/edit`
- **Delete your own cocktail**
- **Add comments to cocktails**
- **Delete your own comments**
- **Mark/unmark cocktails as favourites**
- **View your profile:** `/users/profile/:userId`
- **Edit profile details**
- **List all cocktails uploaded by the logged-in user**
- **View favourite cocktails list**
- **View statistics (admin only):** `/statistics`

---

## Technical Details

### Angular Concepts Demonstrated
- TypeScript with strict typing
- Many interfaces (e.g., `CocktailViewModel`, `UserProfile`)
- Observables for asynchronous data handling
- RxJS operators
- Lifecycle hooks** (`ngOnInit` and `ngOnChanges`)
- Custom Pipe → `SafeUrlPipe` in order to embed youtube videos
- Pagination
- Animations applied to enhance UI transitions
- Confirmation modals for deleting cocktails and comments
- File upload using **Cloudinary** for image storage
- **Angular Material** used for layout and components

#### Interceptors
- `appInterceptor` → replaces `/api` with the full REST API URL
- `authInterceptor` → attaches JWT Bearer token to requests

#### Route Guards
- `AuthGuard` → restricts private pages to logged-in users
- Prevents not logged-in users to Add Cocktail or Edit Cocktail

#### Error Handling & Validation
- Frontend and Backend error handling
- Custom validators
- Global error service and error page component
- Conditional rendering based on error response
- Example: `alert('Your username has changed. Please log in again.')`

---

## Routes Overview
| Route | Component | Notes |
|-------|-----------|-------|
| `/` | — | Redirects to `/home` |
| `/home` | `HomeComponent` | — |
| `/users/login` | `LoginComponent` | — |
| `/users/register` | `RegisterComponent` | — |
| `/users/profile/:userId` | `ProfileComponent` | — |
| `/users/profile/:userId/addedCocktails` | `AddedCocktailsComponent` | — |
| `/users/profile/:userId/favoriteCocktails` | `FavouriteCocktailsComponent` | — |
| `/cocktails/all` | `CocktailListComponent` | — |
| `/cocktails/search` | `CocktailSearchComponent` | — |
| `/cocktails/details/:cocktailId` | `CocktailDetailsComponent` | — |
| `/cocktails/spirit/:spirit` | `CocktailListComponent` | — |
| `/cocktails/add` | `CocktailAddComponent` | `AuthGuard` protected |
| `/cocktails/:cocktailId/edit` | `CocktailUpdateComponent` | `AuthGuard` protected |
| `/statistics` | `StatisticsComponent` | Admin only |
| `/error` | `ErrorPageComponent` | — |
| `/**` | — | Redirects to `/error` |

---

## Screenshots
- Home Page
![Image](https://github.com/user-attachments/assets/dc94664d-709c-4c86-8880-5fe73131008b)
---
- All Cocktails
![Image](https://github.com/user-attachments/assets/c5aca0e6-2742-4182-b663-0023092cdbf3)
---
- Search Cocktails by Criteria
  ![Image](https://github.com/user-attachments/assets/c6c44369-5d33-415c-a35d-3b6af0ccc8ba)
---
- Cocktail details
![Image](https://github.com/user-attachments/assets/e87ca2b7-da1b-42e0-8367-f4efe9ba5eea)
- Cocktail details Comments
![Image](https://github.com/user-attachments/assets/aab16f8e-a4da-4876-aa0e-4ac35fe0af7f)
---
- Update Cocktail
![Image](https://github.com/user-attachments/assets/fd9e8fb0-9a6d-418c-aaf6-2418de2685a0)
---
- Delete Cocktail
![Image](https://github.com/user-attachments/assets/98efe549-a294-4285-b00c-654f52f61b5d)
---
- Delete Comment
![Image](https://github.com/user-attachments/assets/a288acf4-023a-4e0e-810e-3549744832ca)
---
- Add Cocktail
![Image](https://github.com/user-attachments/assets/e35333e0-27ca-47f4-9df1-dbd982ff51d9)
---
- User Profile
![Image](https://github.com/user-attachments/assets/9ec28dc8-4432-40fc-b156-48fca0949c0c)
- User Profile Edit
![Image](https://github.com/user-attachments/assets/6b99e75c-948a-4da2-ad3c-1e4f9b6eacee)
---
- Added Cocktails by User
![Image](https://github.com/user-attachments/assets/4b52f7d9-3de9-449f-827f-ae191e8b8fa7)
- Favourite Cocktails by User
![Image](https://github.com/user-attachments/assets/59bc48e9-e52f-45de-ab2d-12ada7ee3a2d)
---
- Login and Register
![Image](https://github.com/user-attachments/assets/38acc104-de99-42d1-8a84-4d712d8b8f97)
![Image](https://github.com/user-attachments/assets/50179f58-fd1c-487b-95dc-1b5956f9dfc5)
---
- Statistics
![Image](https://github.com/user-attachments/assets/db177d5b-31db-4742-8fde-b99f12504a39)
