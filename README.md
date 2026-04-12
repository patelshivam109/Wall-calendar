# Wall Calendar Component

An interactive and responsive wall calendar component inspired by a physical wall calendar design. Built with a focus on clean UI, intuitive interactions, and maintainable architecture.


##  Features

-  Monthly calendar view
-  Month navigation (previous / next)
-  Date range selection (start → end)
-  Handles reverse selection (end before start)
-  Hover preview for range selection
-  Notes linked to selected date range
-  LocalStorage persistence
-  Fully responsive (desktop + mobile layout)

---

##  Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- date-fns

---

##  Key Decisions

- **Separation of concerns:**  
  Calendar logic and date range handling are abstracted into reusable hooks to keep UI components clean and maintainable.

- **Single source of truth for date state:**  
  The selected month (`currentDate`) is centralized to ensure consistency between the calendar grid and hero section.

- **Client-side persistence:**  
  Notes are stored using `localStorage`, as the task focuses strictly on frontend implementation.

- **Responsive-first approach:**  
  Layout adapts from a split desktop view to a stacked mobile view while maintaining usability.

---

##  How to Run Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev
