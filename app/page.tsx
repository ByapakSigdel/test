// app/page.tsx (acts as the default page)
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/signin'); // Automatically redirects to the signin page
}
