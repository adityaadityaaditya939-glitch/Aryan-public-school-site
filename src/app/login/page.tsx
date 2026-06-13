import LoginForm from "@/components/LoginForm";
import { SCHOOL } from "@/lib/constants";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl font-bold text-aps-navy">Portal Login</h1>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to the {SCHOOL.name} student, teacher, or admin portal.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <LoginForm />
      </div>
    </div>
  );
}
